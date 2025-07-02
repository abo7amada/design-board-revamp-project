
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";
import { format } from "date-fns";

// Import our component modules
import { platformSizes } from "./platformSizes";
import PlatformSelector from "./PlatformSelector";
import SizeSelector from "./SizeSelector";
import PlatformSizeInfo from "./PlatformSizeInfo";
import PublishModalHeader from "./PublishModalHeader";
import PublishModalFooter from "./PublishModalFooter";
import PublishTabsNav from "./PublishTabsNav";
import PlatformsTabContent from "./PlatformsTabContent";
import ContentTabContent from "./ContentTabContent";
import ScheduleTabContent from "./ScheduleTabContent";
import AITabContent from "./AITabContent";

// Import the custom hooks
import { usePlatformSelection } from "@/hooks/usePlatformSelection";
import { useAISuggestions } from "@/hooks/useAISuggestions";
import { useSocialMedia } from "@/hooks/useSocialMedia";
import { ConnectedPlatformsSelector } from "./ConnectedPlatformsSelector";
import { supabase } from "@/integrations/supabase/client";

interface Design {
  id: number;
  title: string;
  category: string;
  image: string;
  date: string;
  author: string;
  likes: number;
  comments: number;
}

interface PublishDesignModalProps {
  isOpen: boolean;
  onClose: () => void;
  design: Design;
}

const PublishDesignModal = ({ isOpen, onClose, design }: PublishDesignModalProps) => {
  // Use our custom hooks
  const {
    selectedPlatform,
    platforms,
    selectedSize,
    autoResizeEnabled,
    platformSpecificStep,
    setSelectedPlatform,
    setPlatforms,
    setSelectedSize,
    setAutoResizeEnabled,
    setPlatformSpecificStep,
    handleSelectPlatform,
    getSelectedPlatformsCount
  } = usePlatformSelection(isOpen);

  const {
    trends,
    handleSelectAISuggestion
  } = useAISuggestions(isOpen, design.title, design.author);
  
  const { socialAccounts, publishPost, loading: publishLoading } = useSocialMedia();
  
  const [caption, setCaption] = useState("");
  const [publishDate, setPublishDate] = useState<Date | undefined>(new Date());
  const [publishTime, setPublishTime] = useState("12:00");
  const [isScheduled, setIsScheduled] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [activeTab, setActiveTab] = useState("platforms");
  
  // Reset state when modal reopens
  useEffect(() => {
    if (isOpen) {
      setActiveTab("platforms");
      setCaption("");
      setLinkUrl("");
    }
  }, [isOpen]);
  
  const handlePublish = async () => {
    if (!selectedPlatform && platformSpecificStep === 1) {
      toast.error("يرجى اختيار منصة واحدة على الأقل");
      return;
    }
    
    if (!caption.trim()) {
      toast.error("يرجى إضافة نص للمنشور");
      return;
    }
    
    try {
      const selectedPlatformsList = Object.entries(platforms).filter(([_, value]) => value).map(([key]) => key);
      
      if (selectedPlatformsList.length === 0) {
        toast.error("يرجى اختيار منصة واحدة على الأقل");
        return;
      }

      // Create post in database first
      const { data: postData, error: postError } = await supabase
        .from('posts')
        .insert({
          title: design.title,
          content: caption,
          design_id: design.id,
          status: isScheduled ? 'scheduled' : 'published',
          platforms: selectedPlatformsList,
          scheduled_at: isScheduled && publishDate ? 
            new Date(`${publishDate.toISOString().split('T')[0]}T${publishTime}:00`).toISOString() : null,
          published_at: !isScheduled ? new Date().toISOString() : null
        })
        .select()
        .single();

      if (postError) throw postError;

      // Get connected social accounts for selected platforms
      const connectedAccounts = socialAccounts.filter(account => 
        selectedPlatformsList.includes(account.platform)
      );

      if (connectedAccounts.length === 0) {
        toast.error("لا توجد حسابات متصلة للمنصات المختارة");
        return;
      }

      if (isScheduled) {
        // For scheduled posts, create publishing history records as pending
        const historyRecords = connectedAccounts.map(account => ({
          post_id: postData.id,
          social_account_id: account.id,
          platform: account.platform,
          status: 'pending' as const
        }));

        await supabase
          .from('publishing_history')
          .insert(historyRecords);

        toast.success("تم جدولة النشر بنجاح");
      } else {
        // For immediate publishing, call publishPost
        const accountIds = connectedAccounts.map(acc => acc.id);
        await publishPost(postData.id, accountIds, caption, design.image);
        toast.success("تم نشر المحتوى بنجاح");
      }
      
      onClose();
    } catch (error) {
      toast.error("فشل في إنشاء المنشور");
      console.error("Publish error:", error);
    }
  };

  // Handle AI suggestion selection
  const handleSuggestionSelect = (suggestion: { text: string, platform: string }) => {
    setCaption(suggestion.text);
    setActiveTab("content");
    toast.success("تم اختيار الاقتراح بنجاح");
  };

  const renderPlatformSpecificContent = () => {
    if (platformSpecificStep === 1) {
      return (
        <PlatformSelector 
          selectedPlatform={selectedPlatform}
          onSelectPlatform={handleSelectPlatform}
          onContinue={() => setPlatformSpecificStep(3)}
          platformSpecificStep={platformSpecificStep}
          onBack={() => setPlatformSpecificStep(1)}
        />
      );
    } else if (platformSpecificStep === 2) {
      return (
        <div className="space-y-6">
          <PlatformSelector 
            selectedPlatform={selectedPlatform}
            onSelectPlatform={handleSelectPlatform}
            onContinue={() => {
              setPlatformSpecificStep(3);
              setActiveTab("content");
            }}
            platformSpecificStep={platformSpecificStep}
            onBack={() => setPlatformSpecificStep(1)}
          />
          
          <SizeSelector 
            platformSizes={platformSizes}
            selectedPlatform={selectedPlatform}
            selectedSize={selectedSize}
            autoResizeEnabled={autoResizeEnabled}
            onSizeSelect={setSelectedSize}
            onAutoResizeToggle={setAutoResizeEnabled}
          />
          
          <PlatformSizeInfo 
            selectedPlatform={selectedPlatform}
            targetAudience={targetAudience}
            setTargetAudience={setTargetAudience}
          />
        </div>
      );
    }
    
    return null;
  };

  // State for target audience
  const [targetAudience, setTargetAudience] = useState("");

  const isPublishButtonDisabled = platformSpecificStep === 1 
    ? !selectedPlatform 
    : (selectedPlatform ? false : getSelectedPlatformsCount() === 0);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="md:max-w-xl" dir="rtl">
        <PublishModalHeader designTitle={design.title} />
        
        <PublishTabsNav activeTab={activeTab} onTabChange={setActiveTab}>
          <PlatformsTabContent>
            <div className="space-y-4">
              {renderPlatformSpecificContent()}
              <ConnectedPlatformsSelector 
                selectedPlatforms={Object.entries(platforms).filter(([_, value]) => value).map(([key]) => key)}
                onPlatformToggle={(platform, enabled) => setPlatforms({...platforms, [platform]: enabled})}
              />
            </div>
          </PlatformsTabContent>
          
          <ContentTabContent
            caption={caption}
            setCaption={setCaption}
            linkUrl={linkUrl}
            setLinkUrl={setLinkUrl}
            selectedPlatform={selectedPlatform}
            designTitle={design.title}
            designImage={design.image}
            getSelectedPlatformsCount={getSelectedPlatformsCount}
            onBack={() => setActiveTab("platforms")}
            onContinue={() => setActiveTab("ai")}
          />
          
          <ScheduleTabContent
            isScheduled={isScheduled}
            setIsScheduled={setIsScheduled}
            publishDate={publishDate}
            setPublishDate={setPublishDate}
            publishTime={publishTime}
            setPublishTime={setPublishTime}
            onBack={() => setActiveTab("content")}
            onPublish={handlePublish}
          />
          
          <AITabContent
            selectedPlatform={selectedPlatform}
            targetAudience={targetAudience}
            onSelectSuggestion={handleSuggestionSelect}
            onBack={() => setActiveTab("content")}
            trends={trends}
            designTitle={design.title}
            designAuthor={design.author}
          />
        </PublishTabsNav>
        
        <PublishModalFooter
          onClose={onClose}
          onPublish={handlePublish}
          isScheduled={isScheduled}
          isDisabled={isPublishButtonDisabled || publishLoading}
          isLoading={publishLoading}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PublishDesignModal;

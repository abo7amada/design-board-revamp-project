
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import our component modules
import { platformSizes } from "./publish/platformSizes";
import PlatformSelector from "./publish/PlatformSelector";
import SizeSelector from "./publish/SizeSelector";
import ContentEditor from "./publish/ContentEditor";
import AISuggestions from "./publish/AISuggestions";
import ScheduleSection from "./publish/ScheduleSection";
import PlatformSizeInfo from "./publish/PlatformSizeInfo";

// Import custom hooks
import { usePlatformSelection } from "@/hooks/usePlatformSelection";
import { useAISuggestions } from "@/hooks/useAISuggestions";

interface Design {
  id: string;
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
  
  const handlePublish = () => {
    if (!selectedPlatform && platformSpecificStep === 1) {
      toast.error("يرجى اختيار منصة واحدة على الأقل");
      return;
    }
    
    // Gather publishing data
    const publishData = {
      designId: design.id,
      designTitle: design.title,
      platforms: Object.entries(platforms).filter(([_, value]) => value).map(([key]) => key),
      caption,
      scheduled: isScheduled,
      date: publishDate ? format(publishDate, 'yyyy-MM-dd') : null,
      time: publishTime,
      linkUrl: linkUrl || undefined,
      size: selectedSize,
      autoResize: autoResizeEnabled
    };
    
    console.log("بيانات النشر:", publishData);
    
    // Show success message
    toast.success(isScheduled ? "تم جدولة النشر بنجاح" : "تم النشر بنجاح");
    
    // Close modal
    onClose();
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
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="md:max-w-xl" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl">نشر التصميم</DialogTitle>
          <DialogDescription>
            اختر المنصات وأضف التفاصيل لنشر التصميم "{design.title}"
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="platforms" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full">
            <TabsTrigger value="platforms">المنصات</TabsTrigger>
            <TabsTrigger value="content">المحتوى</TabsTrigger>
            <TabsTrigger value="schedule">الجدولة</TabsTrigger>
            <TabsTrigger value="ai">مساعد الذكاء</TabsTrigger>
          </TabsList>
          
          <TabsContent value="platforms" className="space-y-4 pt-4">
            {renderPlatformSpecificContent()}
          </TabsContent>
          
          <TabsContent value="content" className="space-y-4 pt-4">
            <ContentEditor 
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
          </TabsContent>
          
          <TabsContent value="schedule" className="space-y-4 pt-4">
            <ScheduleSection 
              isScheduled={isScheduled}
              setIsScheduled={setIsScheduled}
              publishDate={publishDate}
              setPublishDate={setPublishDate}
              publishTime={publishTime}
              setPublishTime={setPublishTime}
              onBack={() => setActiveTab("content")}
              onPublish={handlePublish}
            />
          </TabsContent>
          
          <TabsContent value="ai" className="space-y-4 pt-4">
            <AISuggestions 
              selectedPlatform={selectedPlatform}
              targetAudience={targetAudience}
              onSelectSuggestion={handleSuggestionSelect}
              onBack={() => setActiveTab("content")}
              trends={trends}
              designTitle={design.title}
              designAuthor={design.author}
            />
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>
          <Button 
            className="bg-green-600 hover:bg-green-700" 
            onClick={handlePublish}
            disabled={platformSpecificStep === 1 ? !selectedPlatform : (selectedPlatform ? false : getSelectedPlatformsCount() === 0)}
          >
            {isScheduled ? "جدولة النشر" : "نشر الآن"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PublishDesignModal;

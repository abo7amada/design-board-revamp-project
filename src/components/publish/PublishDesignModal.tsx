
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";

// Import our new component modules
import { platformSizes } from "./platformSizes";
import PlatformSelector from "./PlatformSelector";
import SizeSelector from "./SizeSelector";
import ContentEditor from "./ContentEditor";
import AISuggestions from "./AISuggestions";
import ScheduleSection from "./ScheduleSection";
import PlatformSizeInfo from "./PlatformSizeInfo";

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
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [platforms, setPlatforms] = useState({
    facebook: false,
    instagram: false,
    twitter: false,
    linkedin: false,
    website: false,
    tiktok: false,
    pinterest: false,
  });
  
  const [caption, setCaption] = useState("");
  const [publishDate, setPublishDate] = useState<Date | undefined>(new Date());
  const [publishTime, setPublishTime] = useState("12:00");
  const [isScheduled, setIsScheduled] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [activeTab, setActiveTab] = useState("platforms");
  const [aiSuggestions, setAiSuggestions] = useState<{ text: string, platform: string }[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>("default");
  const [autoResizeEnabled, setAutoResizeEnabled] = useState(true);
  const [platformSpecificStep, setPlatformSpecificStep] = useState(1);
  const [targetAudience, setTargetAudience] = useState("");
  const [trends, setTrends] = useState<string[]>([]);
  
  // إعادة ضبط الحالة عند فتح النافذة
  useEffect(() => {
    if (isOpen) {
      setActiveTab("platforms");
      setPlatformSpecificStep(1);
      setSelectedPlatform(null);
    }
  }, [isOpen]);

  // تحميل الترندات الحالية (محاكاة)
  useEffect(() => {
    if (isOpen) {
      setTrends([
        "#تصميم_الجرافيك",
        "#التسويق_الرقمي",
        "#تصميم_المواقع",
        "#محتوى_إبداعي",
        "#تصميم_هوية_بصرية",
        "#ريادة_أعمال"
      ]);
    }
  }, [isOpen]);
  
  const handlePublish = () => {
    if (!selectedPlatform && platformSpecificStep === 1) {
      toast.error("يرجى اختيار منصة واحدة على الأقل");
      return;
    }
    
    // تجميع بيانات النشر
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
    
    // إظهار رسالة نجاح النشر
    toast.success(isScheduled ? "تم جدولة النشر بنجاح" : "تم النشر بنجاح");
    
    // إغلاق النافذة
    onClose();
  };
  
  const getSelectedPlatformsCount = () => {
    return Object.values(platforms).filter(Boolean).length;
  };

  const handleSelectPlatform = (platform: string) => {
    setSelectedPlatform(platform);
    // Fix the TypeScript error by explicitly specifying the type with all required properties
    setPlatforms(prev => {
      const newPlatforms = {
        facebook: false,
        instagram: false,
        twitter: false,
        linkedin: false,
        website: false,
        tiktok: false,
        pinterest: false,
      };
      newPlatforms[platform as keyof typeof newPlatforms] = true;
      return newPlatforms;
    });
    setPlatformSpecificStep(2);
    
    // اختيار الحجم الافتراضي للمنصة
    switch (platform) {
      case "instagram":
        setSelectedSize("instagram.feed");
        break;
      case "facebook":
        setSelectedSize("facebook.post");
        break;
      case "twitter":
        setSelectedSize("twitter.post");
        break;
      case "linkedin":
        setSelectedSize("linkedin.post");
        break;
      case "tiktok":
        setSelectedSize("tiktok.video");
        break;
      case "pinterest":
        setSelectedSize("pinterest.pin");
        break;
      default:
        setSelectedSize("default");
    }
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
              onSelectSuggestion={handleSelectAISuggestion}
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


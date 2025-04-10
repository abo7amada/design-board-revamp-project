import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Facebook, Instagram, Twitter, Globe, MessageSquare, Linkedin, CheckCircle, ExternalLink, AlertTriangle, Crop, ArrowRight } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

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

// مقاسات المنصات
const platformSizes = {
  instagram: {
    feed: { width: 1080, height: 1080, label: "منشور مربع" },
    story: { width: 1080, height: 1920, label: "ستوري" },
    portrait: { width: 1080, height: 1350, label: "صورة عمودية" },
    landscape: { width: 1080, height: 566, label: "صورة أفقية" }
  },
  facebook: {
    post: { width: 1200, height: 630, label: "منشور فيسبوك" },
    cover: { width: 820, height: 312, label: "صورة غلاف" },
    profile: { width: 170, height: 170, label: "صورة شخصية" }
  },
  twitter: {
    post: { width: 1200, height: 675, label: "تغريدة" },
    header: { width: 1500, height: 500, label: "رأس الصفحة" }
  },
  linkedin: {
    post: { width: 1200, height: 627, label: "منشور لينكد إن" }
  },
  tiktok: {
    video: { width: 1080, height: 1920, label: "فيديو تيك توك" }
  },
  pinterest: {
    pin: { width: 1000, height: 1500, label: "بين" }
  }
};

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
  const [isAiGenerating, setIsAiGenerating] = useState(false);
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

  const handleGenerateAISuggestions = () => {
    setIsAiGenerating(true);
    
    // محاكاة استجابة من خدمة الذكاء الاصطناعي
    setTimeout(() => {
      const suggestions = [
        {
          text: `استعدوا لتجربة لا مثيل لها مع ${design.title}! تصميم فريد يعكس رؤيتنا المبتكرة ويلبي احتياجاتكم بأسلوب عصري. اكتشفوا الفرق الآن! #تصميم_ابداعي #حلول_مبتكرة ${trends[0]} ${trends[1]}`,
          platform: "all"
        },
        {
          text: `نفخر بتقديم ${design.title} - نتاج شغف وإبداع فريقنا المتميز. صُمم خصيصاً لكم بعناية فائقة للتفاصيل. شاركونا آراءكم وانطباعاتكم! #تصميم_احترافي #خبرة_عالية`,
          platform: "all"
        },
        {
          text: `أطلقنا اليوم ${design.title} بمزايا جديدة ومبتكرة. تصميم عصري يجمع بين الأناقة والعملية. تابعونا للمزيد من التفاصيل المثيرة! #إطلاق_جديد #تصميم_مبتكر`,
          platform: "all"
        },
        {
          text: `✨ شاهدوا أحدث تصاميمنا: ${design.title}. من #تصميم: ${design.author}. أخبرونا برأيكم في التعليقات 👇 ${trends[2]} ${trends[3]}`,
          platform: "instagram"
        },
        {
          text: `مع ${design.title} نقدم لكم تجربة مميزة تجمع بين الابتكار والإبداع. اضغط على الرابط في البايو للمزيد من المعلومات! 🎨✨ ${trends[0]}`,
          platform: "instagram"
        },
        {
          text: `أطلقنا للتو ${design.title}! تصميم يجمع بين الوظائف العملية والمظهر الجذاب ليناسب احتياجاتكم. شاركوا المنشور مع من يهتم! ${trends[2]}`,
          platform: "facebook"
        },
        {
          text: `تصميم جديد يضاف لسلسلة أعمالنا المميزة: ${design.title}. صمم خصيصاً ليلبي احتياجات عملائنا ويتجاوز توقعاتهم. ماذا تعتقدون؟ ${trends[4]}`,
          platform: "facebook"
        },
        {
          text: `تصميم ${design.title} متاح الآن! 🚀 إبداع وابتكار في تصميم واحد. للاستفسار والطلب: اضغط على الرابط أدناه. ${trends[0]} ${trends[5]}`,
          platform: "twitter"
        },
        {
          text: `نقدم لكم: ${design.title} - أحدث إضافة لمجموعة تصاميمنا الاحترافية. نسعد بمشاركتكم ملاحظاتكم وآرائكم! ${trends[1]}`,
          platform: "linkedin"
        }
      ];
      
      setAiSuggestions(suggestions);
      setIsAiGenerating(false);
    }, 2000);
  };

  const handleSelectAISuggestion = (suggestion: { text: string, platform: string }) => {
    setCaption(suggestion.text);
    setActiveTab("content");
    toast.success("تم اختيار الاقتراح بنجاح");
  };

  const handleGenerateAutoSchedule = () => {
    setIsScheduled(true);
    const optimalTime = new Date();
    optimalTime.setHours(optimalTime.getHours() + 26); // تحديد وقت مثالي بعد 26 ساعة
    setPublishDate(optimalTime);
    setPublishTime(`${String(optimalTime.getHours()).padStart(2, '0')}:${String(optimalTime.getMinutes()).padStart(2, '0')}`);
    
    toast.success("تم تحديد أفضل وقت للنشر بناءً على تحليل الجمهور");
  };

  const handleSelectPlatform = (platform: string) => {
    setSelectedPlatform(platform);
    // Fix the TypeScript error by explicitly specifying all required properties
    setPlatforms({
      facebook: platform === "facebook",
      instagram: platform === "instagram",
      twitter: platform === "twitter",
      linkedin: platform === "linkedin",
      website: platform === "website",
      tiktok: platform === "tiktok",
      pinterest: platform === "pinterest"
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Button 
            variant="outline" 
            className={`flex flex-col items-center p-6 h-auto ${selectedPlatform === "facebook" ? "border-blue-500 bg-blue-50" : ""}`}
            onClick={() => handleSelectPlatform("facebook")}
          >
            <Facebook className="h-8 w-8 text-blue-600 mb-2" />
            <span>فيسبوك</span>
          </Button>
          
          <Button 
            variant="outline" 
            className={`flex flex-col items-center p-6 h-auto ${selectedPlatform === "instagram" ? "border-pink-500 bg-pink-50" : ""}`}
            onClick={() => handleSelectPlatform("instagram")}
          >
            <Instagram className="h-8 w-8 text-pink-600 mb-2" />
            <span>انستغرام</span>
          </Button>
          
          <Button 
            variant="outline" 
            className={`flex flex-col items-center p-6 h-auto ${selectedPlatform === "twitter" ? "border-blue-400 bg-blue-50" : ""}`}
            onClick={() => handleSelectPlatform("twitter")}
          >
            <Twitter className="h-8 w-8 text-blue-400 mb-2" />
            <span>تويتر</span>
          </Button>
          
          <Button 
            variant="outline" 
            className={`flex flex-col items-center p-6 h-auto ${selectedPlatform === "linkedin" ? "border-blue-700 bg-blue-50" : ""}`}
            onClick={() => handleSelectPlatform("linkedin")}
          >
            <Linkedin className="h-8 w-8 text-blue-700 mb-2" />
            <span>لينكد إن</span>
          </Button>
          
          <Button 
            variant="outline" 
            className={`flex flex-col items-center p-6 h-auto ${selectedPlatform === "website" ? "border-green-600 bg-green-50" : ""}`}
            onClick={() => handleSelectPlatform("website")}
          >
            <Globe className="h-8 w-8 text-green-600 mb-2" />
            <span>الموقع الإلكتروني</span>
          </Button>
          
          <Button 
            variant="outline" 
            className={`flex flex-col items-center p-6 h-auto ${selectedPlatform === "tiktok" ? "border-black bg-gray-50" : ""}`}
            onClick={() => handleSelectPlatform("tiktok")}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 mb-2" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/>
              <path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
              <path d="M15 8v8a4 4 0 0 1-4 4"/>
              <line x1="9" x2="9" y1="12" y2="20"/>
              <path d="M12 16h8a4 4 0 0 0 4-4V4"/>
            </svg>
            <span>تيك توك</span>
          </Button>
        </div>
      );
    } else if (platformSpecificStep === 2) {
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Button variant="outline" size="sm" onClick={() => setPlatformSpecificStep(1)}>
              رجوع للمنصات
            </Button>
            <h3 className="font-medium">
              {selectedPlatform === "facebook" && "إعدادات النشر على فيسبوك"}
              {selectedPlatform === "instagram" && "إعدادات النشر على انستغرام"}
              {selectedPlatform === "twitter" && "إعدادات النشر على تويتر"}
              {selectedPlatform === "linkedin" && "إعدادات النشر على لينكد إن"}
              {selectedPlatform === "website" && "إعدادات النشر على الموقع"}
              {selectedPlatform === "tiktok" && "إعدادات النشر على تيك توك"}
            </h3>
            <Button size="sm" onClick={() => {
              setPlatformSpecificStep(3);
              setActiveTab("content");
            }}>
              متابعة
              <ArrowRight className="mr-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Switch 
                id="auto-resize" 
                checked={autoResizeEnabled}
                onCheckedChange={setAutoResizeEnabled}
              />
              <Label htmlFor="auto-resize">ضبط حجم التصميم تلقائياً للمنصة</Label>
            </div>
            <div className="flex items-center">
              <Crop className="h-4 w-4 ml-2 text-gray-500" />
              <span className="text-sm text-gray-500">ضبط حجم التصميم</span>
            </div>
          </div>
          
          {selectedPlatform && selectedPlatform !== "website" && (
            <div className="border rounded-md p-4">
              <h4 className="font-medium mb-4 text-right">اختر حجم المنشور:</h4>
              <div className="grid grid-cols-2 gap-3">
                {selectedPlatform === "instagram" && (
                  <>
                    <Button 
                      variant="outline" 
                      className={`p-3 h-auto flex-col items-center justify-center ${selectedSize === "instagram.feed" ? "bg-pink-50 border-pink-500" : ""}`}
                      onClick={() => setSelectedSize("instagram.feed")}
                    >
                      <div className="w-16 h-16 bg-pink-100 rounded-md mb-2 flex items-center justify-center">
                        <div className="w-12 h-12 bg-pink-200 rounded-sm"></div>
                      </div>
                      <span className="text-xs">مربع 1:1</span>
                      <span className="text-xs text-gray-500">{platformSizes.instagram.feed.width}x{platformSizes.instagram.feed.height}</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className={`p-3 h-auto flex-col items-center justify-center ${selectedSize === "instagram.portrait" ? "bg-pink-50 border-pink-500" : ""}`}
                      onClick={() => setSelectedSize("instagram.portrait")}
                    >
                      <div className="w-12 h-16 bg-pink-100 rounded-md mb-2 flex items-center justify-center">
                        <div className="w-8 h-10 bg-pink-200 rounded-sm"></div>
                      </div>
                      <span className="text-xs">عمودي 4:5</span>
                      <span className="text-xs text-gray-500">{platformSizes.instagram.portrait.width}x{platformSizes.instagram.portrait.height}</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className={`p-3 h-auto flex-col items-center justify-center ${selectedSize === "instagram.landscape" ? "bg-pink-50 border-pink-500" : ""}`}
                      onClick={() => setSelectedSize("instagram.landscape")}
                    >
                      <div className="w-16 h-10 bg-pink-100 rounded-md mb-2 flex items-center justify-center">
                        <div className="w-12 h-6 bg-pink-200 rounded-sm"></div>
                      </div>
                      <span className="text-xs">أفقي 1.91:1</span>
                      <span className="text-xs text-gray-500">{platformSizes.instagram.landscape.width}x{platformSizes.instagram.landscape.height}</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className={`p-3 h-auto flex-col items-center justify-center ${selectedSize === "instagram.story" ? "bg-pink-50 border-pink-500" : ""}`}
                      onClick={() => setSelectedSize("instagram.story")}
                    >
                      <div className="w-10 h-16 bg-pink-100 rounded-md mb-2 flex items-center justify-center">
                        <div className="w-6 h-10 bg-pink-200 rounded-sm"></div>
                      </div>
                      <span className="text-xs">ستوري 9:16</span>
                      <span className="text-xs text-gray-500">{platformSizes.instagram.story.width}x{platformSizes.instagram.story.height}</span>
                    </Button>
                  </>
                )}
                
                {selectedPlatform === "facebook" && (
                  <>
                    <Button 
                      variant="outline" 
                      className={`p-3 h-auto flex-col items-center justify-center ${selectedSize === "facebook.post" ? "bg-blue-50 border-blue-500" : ""}`}
                      onClick={() => setSelectedSize("facebook.post")}
                    >
                      <div className="w-16 h-10 bg-blue-100 rounded-md mb-2 flex items-center justify-center">
                        <div className="w-12 h-6 bg-blue-200 rounded-sm"></div>
                      </div>
                      <span className="text-xs">منشور 1.91:1</span>
                      <span className="text-xs text-gray-500">{platformSizes.facebook.post.width}x{platformSizes.facebook.post.height}</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className={`p-3 h-auto flex-col items-center justify-center ${selectedSize === "facebook.cover" ? "bg-blue-50 border-blue-500" : ""}`}
                      onClick={() => setSelectedSize("facebook.cover")}
                    >
                      <div className="w-16 h-8 bg-blue-100 rounded-md mb-2 flex items-center justify-center">
                        <div className="w-12 h-5 bg-blue-200 rounded-sm"></div>
                      </div>
                      <span className="text-xs">صورة الغلاف</span>
                      <span className="text-xs text-gray-500">{platformSizes.facebook.cover.width}x{platformSizes.facebook.cover.height}</span>
                    </Button>
                  </>
                )}
                
                {selectedPlatform === "twitter" && (
                  <>
                    <Button 
                      variant="outline" 
                      className={`p-3 h-auto flex-col items-center justify-center ${selectedSize === "twitter.post" ? "bg-blue-50 border-blue-400" : ""}`}
                      onClick={() => setSelectedSize("twitter.post")}
                    >
                      <div className="w-16 h-10 bg-blue-100 rounded-md mb-2 flex items-center justify-center">
                        <div className="w-12 h-7 bg-blue-200 rounded-sm"></div>
                      </div>
                      <span className="text-xs">تغريدة 16:9</span>
                      <span className="text-xs text-gray-500">{platformSizes.twitter.post.width}x{platformSizes.twitter.post.height}</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className={`p-3 h-auto flex-col items-center justify-center ${selectedSize === "twitter.header" ? "bg-blue-50 border-blue-400" : ""}`}
                      onClick={() => setSelectedSize("twitter.header")}
                    >
                      <div className="w-16 h-6 bg-blue-100 rounded-md mb-2 flex items-center justify-center">
                        <div className="w-12 h-4 bg-blue-200 rounded-sm"></div>
                      </div>
                      <span className="text-xs">رأس الصفحة</span>
                      <span className="text-xs text-gray-500">{platformSizes.twitter.header.width}x{platformSizes.twitter.header.height}</span>
                    </Button>
                  </>
                )}
                
                {(selectedPlatform === "linkedin" || selectedPlatform === "tiktok" || selectedPlatform === "pinterest") && (
                  <Button 
                    variant="outline" 
                    className={`p-3 h-auto flex-col items-center justify-center ${selectedSize.startsWith(selectedPlatform) ? "bg-gray-100 border-gray-400" : ""}`}
                    onClick={() => setSelectedSize(`${selectedPlatform}.post`)}
                  >
                    <div className="w-16 h-12 bg-gray-100 rounded-md mb-2 flex items-center justify-center">
                      <div className="w-12 h-8 bg-gray-200 rounded-sm"></div>
                    </div>
                    <span className="text-xs">
                      {selectedPlatform === "linkedin" && "منشور لينكد إن"}
                      {selectedPlatform === "tiktok" && "فيديو تيك توك"}
                      {selectedPlatform === "pinterest" && "بين"}
                    </span>
                    <span className="text-xs text-gray-500">
                      {selectedPlatform === "linkedin" && `${platformSizes.linkedin.post.width}x${platformSizes.linkedin.post.height}`}
                      {selectedPlatform === "tiktok" && `${platformSizes.tiktok.video.width}x${platformSizes.tiktok.video.height}`}
                      {selectedPlatform === "pinterest" && `${platformSizes.pinterest.pin.width}x${platformSizes.pinterest.pin.height}`}
                    </span>
                  </Button>
                )}
              </div>
              
              {!autoResizeEnabled && (
                <div className="mt-4 p-3 bg-yellow-50 rounded-md flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 ml-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-yellow-700">
                      عند تعطيل ضبط الحجم التلقائي، سيتم نشر التصميم بحجمه الأصلي دون معالجة، وقد يؤدي ذلك إلى اقتصاص أجزاء من التصميم على بعض المنصات.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <div className="mb-4">
            <Label htmlFor="targetAudience" className="mb-2 block">الجمهور المستهدف (يساعد في اقتراحات المحتوى)</Label>
            <Input 
              id="targetAudience" 
              placeholder="مثال: مصممين، رواد أعمال، مسوقين..." 
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
            />
          </div>
          
          <div className="rounded-md bg-gray-50 p-4">
            <h4 className="font-medium mb-2">معلومات المنصة المختارة</h4>
            {selectedPlatform === "instagram" && (
              <p className="text-sm text-gray-600">
                منصة انستغرام مثالية للمحتوى البصري. يُفضل استخدام الصور عالية الجودة والتصاميم الجذابة مع هاشتاغات مناسبة للوصول لجمهور أكبر.
              </p>
            )}
            {selectedPlatform === "facebook" && (
              <p className="text-sm text-gray-600">
                يتيح فيسبوك مشاركة تصاميم متنوعة. يُفضل إضافة نص تفصيلي للمنشور واستخدام روابط لتوجيه المستخدمين نحو المزيد من المعلومات.
              </p>
            )}
            {selectedPlatform === "twitter" && (
              <p className="text-sm text-gray-600">
                تويتر يناسب المحتوى القصير والمباشر. استخدم جمل مختصرة وهاشتاغات رائجة لزيادة انتشار تغريداتك.
              </p>
            )}
            {selectedPlatform === "linkedin" && (
              <p className="text-sm text-gray-600">
                لينكد إن منصة مهنية تناسب المحتوى الاحترافي. ركز على القيمة المهنية التي يقدمها التصميم واستخدم لغة رسمية.
              </p>
            )}
            {selectedPlatform === "website" && (
              <p className="text-sm text-gray-600">
                نشر التصميم على موقعك الإلكتروني يتيح لك حرية أكبر في العرض والتنسيق. يمكنك إضافة تفاصيل أكثر ومعلومات إضافية.
              </p>
            )}
            {selectedPlatform === "tiktok" && (
              <p className="text-sm text-gray-600">
                تيك توك منصة مخصصة للفيديو القصير. يمكنك استخدام التصميم كمقدمة أو خلفية لفيديو قصير جذاب.
              </p>
            )}
          </div>
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
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">{caption.length}/2200 حرف</span>
                <Label htmlFor="caption" className="font-medium flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  التعليق
                </Label>
              </div>
              <Textarea 
                id="caption" 
                placeholder="أضف تعليقًا للمنشور..." 
                className="resize-none text-right" 
                rows={4}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                maxLength={2200}
              />
            </div>
            
            <div>
              <Label htmlFor="link" className="flex items-center justify-end gap-2 mb-2">
                <ExternalLink className="h-4 w-4" />
                رابط خارجي (اختياري)
              </Label>
              <Input 
                id="link" 
                placeholder="أدخل الرابط الذي تريد مشاركته..." 
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="text-right"
              />
              <p className="text-xs text-muted-foreground mt-1 text-right">
                سيتم تقصير الرابط تلقائيًا وتتبع النقرات عليه
              </p>
            </div>
            
            <div className="rounded-md bg-gray-50 p-3 flex justify-between items-center">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setActiveTab("ai")}
              >
                اقتراحات الذكاء الاصطناعي
              </Button>
              <div className="flex items-center gap-2">
                <img src={design.image} alt={design.title} className="h-10 w-10 rounded-md object-cover" />
                <div className="text-right">
                  <p className="text-sm font-medium">{design.title}</p>
                  <p className="text-xs text-gray-500">
                    {selectedPlatform ? (
                      selectedPlatform === "facebook" ? "فيسبوك" :
                      selectedPlatform === "instagram" ? "انستغرام" :
                      selectedPlatform === "twitter" ? "تويتر" :
                      selectedPlatform === "linkedin" ? "لينكد إن" :
                      selectedPlatform === "website" ? "الموقع" : "تيك توك"
                    ) : (
                      `${getSelectedPlatformsCount()} منصات محددة`
                    )}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setActiveTab("platforms");
                }}
              >
                الرجوع للمنصات
              </Button>
              <Button 
                size="sm"
                onClick={() => {
                  setActiveTab("schedule");
                }}
              >
                متابعة للجدولة
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="schedule" className="space-y-4 pt-4">
            <div>
              <div className="flex items-center space-x-2 space-x-reverse mb-4">
                <Checkbox 
                  id="schedule" 
                  checked={isScheduled}
                  onCheckedChange={(checked) => 
                    setIsScheduled(checked as boolean)
                  }
                />
                <Label htmlFor="schedule" className="cursor-pointer">
                  جدولة النشر
                </Label>
              </div>
              
              {isScheduled && (
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Label htmlFor="date" className="flex items-center justify-end gap-2 mb-2">
                      <Calendar className="h-4 w-4" />
                      التاريخ
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between"
                        >
                          {publishDate ? format(publish

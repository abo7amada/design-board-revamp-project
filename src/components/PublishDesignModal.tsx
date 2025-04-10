
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Facebook, Instagram, Twitter, Globe, MessageSquare, Linkedin, CheckCircle, ExternalLink } from "lucide-react";
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
  const [platforms, setPlatforms] = useState({
    facebook: true,
    instagram: true,
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
  const [activeTab, setActiveTab] = useState("content");
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  
  const handlePublish = () => {
    // تجميع بيانات النشر
    const publishData = {
      designId: design.id,
      designTitle: design.title,
      platforms,
      caption,
      scheduled: isScheduled,
      date: publishDate ? format(publishDate, 'yyyy-MM-dd') : null,
      time: publishTime,
      linkUrl: linkUrl || undefined
    };
    
    console.log("بيانات النشر:", publishData);
    
    // إظهار رسالة نجاح النشر
    toast.success("تم جدولة النشر بنجاح");
    
    // إغلاق النافذة
    onClose();
  };
  
  const getSelectedPlatformsCount = () => {
    return Object.values(platforms).filter(Boolean).length;
  };

  const handleGenerateAISuggestions = () => {
    setIsAiGenerating(true);
    
    // محاكاة استجابة من خدمة الذكاء الاصطناعي بعد ثانيتين
    setTimeout(() => {
      setAiSuggestions([
        `استعدوا لتجربة لا مثيل لها مع ${design.title}! تصميم فريد يعكس رؤيتنا المبتكرة ويلبي احتياجاتكم بأسلوب عصري. اكتشفوا الفرق الآن! #تصميم_ابداعي #حلول_مبتكرة`,
        `نفخر بتقديم ${design.title} - نتاج شغف وإبداع فريقنا المتميز. صُمم خصيصاً لكم بعناية فائقة للتفاصيل. شاركونا آراءكم وانطباعاتكم! #تصميم_احترافي #خبرة_عالية`,
        `أطلقنا اليوم ${design.title} بمزايا جديدة ومبتكرة. تصميم عصري يجمع بين الأناقة والعملية. تابعونا للمزيد من التفاصيل المثيرة! #إطلاق_جديد #تصميم_مبتكر`
      ]);
      setIsAiGenerating(false);
    }, 2000);
  };

  const handleSelectAISuggestion = (suggestion: string) => {
    setCaption(suggestion);
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
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="md:max-w-xl" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl">نشر التصميم</DialogTitle>
          <DialogDescription>
            اختر المنصات وأضف التفاصيل لنشر التصميم "{design.title}"
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full">
            <TabsTrigger value="content">المحتوى</TabsTrigger>
            <TabsTrigger value="platforms">المنصات</TabsTrigger>
            <TabsTrigger value="schedule">الجدولة</TabsTrigger>
            <TabsTrigger value="ai">مساعد الذكاء</TabsTrigger>
          </TabsList>
          
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
                  <p className="text-xs text-gray-500">{getSelectedPlatformsCount()} منصات محددة</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="platforms" className="pt-4">
            <div>
              <h3 className="font-medium mb-3 text-right">المنصات</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 space-x-reverse border rounded-md p-3">
                  <Checkbox 
                    id="facebook" 
                    checked={platforms.facebook}
                    onCheckedChange={(checked) => 
                      setPlatforms({...platforms, facebook: checked as boolean})
                    }
                  />
                  <Label htmlFor="facebook" className="flex items-center gap-2 cursor-pointer">
                    <Facebook className="h-4 w-4 text-blue-600" />
                    فيسبوك
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse border rounded-md p-3">
                  <Checkbox 
                    id="instagram" 
                    checked={platforms.instagram}
                    onCheckedChange={(checked) => 
                      setPlatforms({...platforms, instagram: checked as boolean})
                    }
                  />
                  <Label htmlFor="instagram" className="flex items-center gap-2 cursor-pointer">
                    <Instagram className="h-4 w-4 text-pink-600" />
                    انستغرام
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse border rounded-md p-3">
                  <Checkbox 
                    id="twitter" 
                    checked={platforms.twitter}
                    onCheckedChange={(checked) => 
                      setPlatforms({...platforms, twitter: checked as boolean})
                    }
                  />
                  <Label htmlFor="twitter" className="flex items-center gap-2 cursor-pointer">
                    <Twitter className="h-4 w-4 text-blue-400" />
                    تويتر
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse border rounded-md p-3">
                  <Checkbox 
                    id="linkedin" 
                    checked={platforms.linkedin}
                    onCheckedChange={(checked) => 
                      setPlatforms({...platforms, linkedin: checked as boolean})
                    }
                  />
                  <Label htmlFor="linkedin" className="flex items-center gap-2 cursor-pointer">
                    <Linkedin className="h-4 w-4 text-blue-700" />
                    لينكد إن
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse border rounded-md p-3">
                  <Checkbox 
                    id="website" 
                    checked={platforms.website}
                    onCheckedChange={(checked) => 
                      setPlatforms({...platforms, website: checked as boolean})
                    }
                  />
                  <Label htmlFor="website" className="flex items-center gap-2 cursor-pointer">
                    <Globe className="h-4 w-4 text-green-600" />
                    الموقع الإلكتروني
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse border rounded-md p-3">
                  <Checkbox 
                    id="tiktok" 
                    checked={platforms.tiktok}
                    onCheckedChange={(checked) => 
                      setPlatforms({...platforms, tiktok: checked as boolean})
                    }
                  />
                  <Label htmlFor="tiktok" className="flex items-center gap-2 cursor-pointer">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4" 
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
                    تيك توك
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse border rounded-md p-3">
                  <Checkbox 
                    id="pinterest" 
                    checked={platforms.pinterest}
                    onCheckedChange={(checked) => 
                      setPlatforms({...platforms, pinterest: checked as boolean})
                    }
                  />
                  <Label htmlFor="pinterest" className="flex items-center gap-2 cursor-pointer">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 text-red-600" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <line x1="12" x2="12" y1="8" y2="16"/>
                      <line x1="8" x2="16" y1="12" y2="12"/>
                      <circle cx="12" cy="12" r="10"/>
                    </svg>
                    بينتريست
                  </Label>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setPlatforms({
                      facebook: true,
                      instagram: true,
                      twitter: true,
                      linkedin: true,
                      website: true,
                      tiktok: true,
                      pinterest: true,
                    });
                    toast.success("تم تحديد جميع المنصات");
                  }}
                >
                  تحديد الكل
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mr-2"
                  onClick={() => {
                    setPlatforms({
                      facebook: false,
                      instagram: false,
                      twitter: false,
                      linkedin: false,
                      website: false,
                      tiktok: false,
                      pinterest: false,
                    });
                    toast.info("تم إلغاء تحديد جميع المنصات");
                  }}
                >
                  إلغاء تحديد الكل
                </Button>
              </div>
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
                          {publishDate ? format(publishDate, 'yyyy/MM/dd', { locale: ar }) : <span>اختر التاريخ</span>}
                          <Calendar className="h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={publishDate}
                          onSelect={setPublishDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="flex-1">
                    <Label htmlFor="time" className="flex items-center justify-end gap-2 mb-2">
                      <Clock className="h-4 w-4" />
                      الوقت
                    </Label>
                    <Input 
                      id="time" 
                      type="time" 
                      value={publishTime}
                      onChange={(e) => setPublishTime(e.target.value)}
                      className="text-right"
                    />
                  </div>
                </div>
              )}
              
              <div className="mt-6">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleGenerateAutoSchedule}
                >
                  <Clock className="h-4 w-4 ml-2" />
                  تحديد أفضل وقت للنشر تلقائيًا
                </Button>
                <p className="text-xs text-muted-foreground mt-1 text-center">
                  سيتم تحليل بيانات جمهورك وتحديد أفضل وقت للنشر تلقائيًا
                </p>
              </div>
              
              <div className="mt-6 border rounded-md p-4">
                <h4 className="font-medium mb-2 text-right">اقتراحات أوقات النشر المثالية</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="border rounded-md p-2 text-center cursor-pointer hover:bg-gray-50" onClick={() => {
                    setPublishTime("08:30");
                    toast.info("تم تحديد الوقت");
                  }}>
                    <div className="font-bold">08:30 صباحًا</div>
                    <div className="text-xs text-gray-500">نشاط مرتفع على فيسبوك</div>
                  </div>
                  <div className="border rounded-md p-2 text-center cursor-pointer hover:bg-gray-50" onClick={() => {
                    setPublishTime("12:00");
                    toast.info("تم تحديد الوقت");
                  }}>
                    <div className="font-bold">12:00 ظهرًا</div>
                    <div className="text-xs text-gray-500">نشاط مرتفع على انستغرام</div>
                  </div>
                  <div className="border rounded-md p-2 text-center cursor-pointer hover:bg-gray-50" onClick={() => {
                    setPublishTime("17:30");
                    toast.info("تم تحديد الوقت");
                  }}>
                    <div className="font-bold">05:30 مساءً</div>
                    <div className="text-xs text-gray-500">نشاط مرتفع على تويتر</div>
                  </div>
                  <div className="border rounded-md p-2 text-center cursor-pointer hover:bg-gray-50" onClick={() => {
                    setPublishTime("20:00");
                    toast.info("تم تحديد الوقت");
                  }}>
                    <div className="font-bold">08:00 مساءً</div>
                    <div className="text-xs text-gray-500">نشاط عام مرتفع</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="ai" className="space-y-4 pt-4">
            <div>
              <div className="flex justify-between items-center mb-3">
                <Button 
                  onClick={handleGenerateAISuggestions}
                  disabled={isAiGenerating}
                >
                  {isAiGenerating ? "جاري التوليد..." : "توليد اقتراحات ذكية"}
                </Button>
                <h3 className="font-medium">مساعد الذكاء الاصطناعي</h3>
              </div>
              
              <p className="text-sm text-gray-500 mb-4 text-right">
                يمكن للذكاء الاصطناعي اقتراح محتوى مناسب لمنشورك بناءً على نوع التصميم والجمهور المستهدف
              </p>
              
              {isAiGenerating ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-green-600"></div>
                </div>
              ) : (
                <div className="space-y-3">
                  {aiSuggestions.length > 0 ? (
                    aiSuggestions.map((suggestion, index) => (
                      <div key={index} className="border rounded-md p-3 hover:bg-gray-50 cursor-pointer" onClick={() => handleSelectAISuggestion(suggestion)}>
                        <p className="text-sm text-right">{suggestion}</p>
                        <div className="flex justify-between items-center mt-2">
                          <Button variant="ghost" size="sm" onClick={(e) => {
                            e.stopPropagation();
                            handleSelectAISuggestion(suggestion);
                          }}>
                            <CheckCircle className="h-4 w-4 ml-1" />
                            استخدام
                          </Button>
                          <div className="text-xs text-gray-500">اقتراح {index + 1}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="border rounded-md p-4 text-center">
                      <p className="text-gray-500">
                        انقر على "توليد اقتراحات ذكية" لعرض اقتراحات لمحتوى منشورك
                      </p>
                    </div>
                  )}
                  
                  {aiSuggestions.length > 0 && (
                    <div className="pt-2">
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={handleGenerateAISuggestions}
                      >
                        توليد المزيد من الاقتراحات
                      </Button>
                    </div>
                  )}
                </div>
              )}
              
              <div className="mt-6 rounded-md bg-blue-50 p-3">
                <h4 className="font-medium text-right mb-2">نصائح لتحسين المحتوى</h4>
                <ul className="text-sm text-gray-600 space-y-1 list-disc pr-5 text-right">
                  <li>استخدم هاشتاغات مناسبة لزيادة الوصول</li>
                  <li>أضف دعوة واضحة للتفاعل مع المنشور</li>
                  <li>اجعل النص قصيرًا ومباشرًا وجذابًا</li>
                  <li>وجه سؤالًا للجمهور لتشجيع التفاعل</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>
          <Button 
            className="bg-green-600 hover:bg-green-700" 
            onClick={handlePublish}
            disabled={getSelectedPlatformsCount() === 0}
          >
            {isScheduled ? "جدولة النشر" : "نشر الآن"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PublishDesignModal;

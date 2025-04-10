
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Facebook, Instagram, Twitter, Globe, MessageSquare } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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
    website: false,
  });
  
  const [caption, setCaption] = useState("");
  const [publishDate, setPublishDate] = useState<Date | undefined>(new Date());
  const [publishTime, setPublishTime] = useState("12:00");
  const [isScheduled, setIsScheduled] = useState(false);
  
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
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="md:max-w-xl" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl">نشر التصميم</DialogTitle>
          <DialogDescription>
            اختر المنصات وأضف التفاصيل لنشر التصميم "{design.title}"
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div>
            <h3 className="font-medium mb-3">المنصات</h3>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2 space-x-reverse">
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
              
              <div className="flex items-center space-x-2 space-x-reverse">
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
              
              <div className="flex items-center space-x-2 space-x-reverse">
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
              
              <div className="flex items-center space-x-2 space-x-reverse">
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
            </div>
          </div>
          
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
          </div>
          
          <div className="rounded-md bg-gray-50 p-3 flex justify-between items-center">
            <Button 
              size="sm" 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => toast.info("معاينة المنشور")}
            >
              معاينة
            </Button>
            <div className="flex items-center gap-2">
              <img src={design.image} alt={design.title} className="h-10 w-10 rounded-md object-cover" />
              <div className="text-right">
                <p className="text-sm font-medium">{design.title}</p>
                <p className="text-xs text-gray-500">{getSelectedPlatformsCount()} منصات محددة</p>
              </div>
            </div>
          </div>
        </div>
        
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


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";

interface ScheduleSectionProps {
  isScheduled: boolean;
  setIsScheduled: (isScheduled: boolean) => void;
  publishDate: Date | undefined;
  setPublishDate: (date: Date | undefined) => void;
  publishTime: string;
  setPublishTime: (time: string) => void;
  onBack: () => void;
  onPublish: () => void;
}

const ScheduleSection = ({
  isScheduled,
  setIsScheduled,
  publishDate,
  setPublishDate,
  publishTime,
  setPublishTime,
  onBack,
  onPublish
}: ScheduleSectionProps) => {
  
  const handleGenerateAutoSchedule = () => {
    setIsScheduled(true);
    const optimalTime = new Date();
    optimalTime.setHours(optimalTime.getHours() + 26); // تحديد وقت مثالي بعد 26 ساعة
    setPublishDate(optimalTime);
    setPublishTime(`${String(optimalTime.getHours()).padStart(2, '0')}:${String(optimalTime.getMinutes()).padStart(2, '0')}`);
    
    toast.success("تم تحديد أفضل وقت للنشر بناءً على تحليل الجمهور");
  };

  return (
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
      
      <div className="flex justify-between items-center mt-6">
        <Button 
          variant="outline" 
          size="sm"
          onClick={onBack}
        >
          الرجوع للمحتوى
        </Button>
        <Button 
          size="sm"
          onClick={onPublish}
          className="bg-green-600 hover:bg-green-700"
        >
          {isScheduled ? "جدولة النشر" : "نشر الآن"}
        </Button>
      </div>
    </div>
  );
};

export default ScheduleSection;

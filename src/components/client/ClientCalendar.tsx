
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface Event {
  id: number;
  title: string;
  date: Date;
  type: "design" | "post";
  status: string;
}

interface ClientCalendarProps {
  clientId: number;
  postsData: any[];
  designsData: any[];
}

export const ClientCalendar = ({ clientId, postsData, designsData }: ClientCalendarProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  // تحويل بيانات المنشورات والتصاميم إلى أحداث
  const events: Event[] = [
    ...postsData.filter(post => post.clientId === clientId).map(post => ({
      id: post.id,
      title: post.title,
      date: new Date(post.scheduledDate.replace(/\//g, "-")),
      type: "post" as const,
      status: post.status
    })),
    ...designsData.filter(design => design.clientId === clientId).map(design => ({
      id: design.id,
      title: design.title,
      date: new Date(design.date.replace(/\//g, "-")),
      type: "design" as const,
      status: design.category
    }))
  ];

  // الحصول على الأحداث في يوم معين
  const getEventsOnDay = (day: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day.getDate() &&
        eventDate.getMonth() === day.getMonth() &&
        eventDate.getFullYear() === day.getFullYear()
      );
    });
  };

  // تحديد ما إذا كان هناك منشورات أو تصاميم في يوم معين
  const hasEvents = (day: Date) => {
    return getEventsOnDay(day).length > 0;
  };

  // تخصيص محتوى اليوم في التقويم
  const renderDay = (day: Date) => {
    const dayEvents = getEventsOnDay(day);
    const postCount = dayEvents.filter(e => e.type === "post").length;
    const designCount = dayEvents.filter(e => e.type === "design").length;
    
    return (
      <div className="relative flex flex-col items-center justify-center h-full">
        <div>{day.getDate()}</div>
        {(postCount > 0 || designCount > 0) && (
          <div className="flex gap-1 mt-1">
            {postCount > 0 && (
              <div className="w-2 h-2 rounded-full bg-blue-600" />
            )}
            {designCount > 0 && (
              <div className="w-2 h-2 rounded-full bg-purple-600" />
            )}
          </div>
        )}
      </div>
    );
  };

  // عرض تفاصيل الأحداث في اليوم المحدد
  const renderSelectedDayEvents = () => {
    if (!date) return null;
    
    const dayEvents = getEventsOnDay(date);
    
    if (dayEvents.length === 0) {
      return (
        <div className="text-center py-6 text-gray-500">
          لا توجد أحداث في هذا اليوم
        </div>
      );
    }
    
    return (
      <div className="space-y-4 mt-4">
        <h3 className="font-medium">أحداث {format(date, "yyyy/MM/dd")}</h3>
        {dayEvents.map(event => (
          <div 
            key={`${event.type}-${event.id}`} 
            className={cn(
              "p-3 rounded-md", 
              event.type === "post" ? "bg-blue-50" : "bg-purple-50"
            )}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{event.title}</h4>
                <p className="text-sm text-gray-500">
                  {event.type === "post" ? "منشور" : "تصميم"}
                </p>
              </div>
              <Badge className={cn(
                event.type === "post" 
                  ? (event.status === "منشور" ? "bg-green-600" : event.status === "مجدول" ? "bg-blue-600" : "bg-gray-600") 
                  : (event.status === "معتمد" ? "bg-green-600" : event.status === "قيد المراجعة" ? "bg-yellow-600" : "bg-gray-600")
              )}>
                {event.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>التقويم</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <TooltipProvider>
              <Calendar 
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                className="rounded-md border p-3"
                components={{
                  DayContent: (props) => {
                    const { date } = props;
                    return (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => setDate(date)}
                            onMouseEnter={() => setHoveredDate(date)}
                            onMouseLeave={() => setHoveredDate(null)}
                            className="w-full h-full"
                          >
                            {renderDay(date)}
                          </button>
                        </TooltipTrigger>
                        {hasEvents(date) && (
                          <TooltipContent align="center" className="p-2 bg-white">
                            <div className="text-sm font-medium">
                              {format(date, "yyyy/MM/dd")}
                            </div>
                            <div className="text-xs text-gray-500">
                              {getEventsOnDay(date).length} حدث
                            </div>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    );
                  }
                }}
              />
            </TooltipProvider>
            <div className="mt-4 flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-600" />
                <span className="text-sm">منشورات</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-600" />
                <span className="text-sm">تصاميم</span>
              </div>
            </div>
          </div>
          
          <div>
            {renderSelectedDayEvents()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

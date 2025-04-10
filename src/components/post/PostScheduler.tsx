
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarClock, BarChart, ListChecks, Share2 } from "lucide-react";
import { toast } from "sonner";

interface ScheduledPost {
  id: number;
  title: string;
  content: string;
  dateTime: Date;
  platforms: string[];
  status: "مجدول" | "منشور" | "فشل";
}

const dummyScheduledPosts: ScheduledPost[] = [
  {
    id: 1,
    title: "إطلاق منتج جديد",
    content: "يسعدنا الإعلان عن إطلاق منتجنا الجديد...",
    dateTime: new Date(Date.now() + 3600000 * 24 * 2),
    platforms: ["facebook", "instagram"],
    status: "مجدول"
  },
  {
    id: 2,
    title: "نصائح تسويقية",
    content: "إليكم أهم 5 نصائح تسويقية لتعزيز مبيعاتكم...",
    dateTime: new Date(Date.now() + 3600000 * 8),
    platforms: ["twitter", "linkedin"],
    status: "مجدول"
  },
  {
    id: 3,
    title: "عرض خاص لنهاية الأسبوع",
    content: "استفيدوا من عرضنا الخاص لنهاية الأسبوع...",
    dateTime: new Date(Date.now() - 3600000 * 12),
    platforms: ["facebook", "instagram", "twitter"],
    status: "منشور"
  }
];

export const PostScheduler = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [platform, setPlatform] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("upcoming");

  const filteredPosts = dummyScheduledPosts.filter(post => {
    if (activeTab === "upcoming" && post.status === "منشور") return false;
    if (activeTab === "published" && post.status !== "منشور") return false;
    
    if (platform !== "all" && !post.platforms.includes(platform)) {
      return false;
    }
    
    if (date) {
      const postDate = new Date(post.dateTime);
      if (postDate.toDateString() !== date.toDateString()) {
        return false;
      }
    }
    
    return true;
  });

  const handleReschedule = (postId: number) => {
    toast.success("تم تحديث موعد النشر");
  };

  const handleShare = (postId: number) => {
    toast.success("تم النشر على المنصات المحددة");
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarClock className="h-5 w-5 text-green-600" />
          <span>جدولة المنشورات</span>
        </CardTitle>
        <CardDescription>جدولة ونشر المحتوى على مختلف المنصات</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="space-y-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="border rounded-md p-3"
              />
              
              <div className="space-y-2">
                <label className="text-sm font-medium">المنصة</label>
                <Select defaultValue="all" onValueChange={(value) => setPlatform(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="جميع المنصات" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع المنصات</SelectItem>
                    <SelectItem value="facebook">فيسبوك</SelectItem>
                    <SelectItem value="instagram">إنستجرام</SelectItem>
                    <SelectItem value="twitter">تويتر</SelectItem>
                    <SelectItem value="linkedin">لينكد إن</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => toast.info("سيتم فتح صفحة إنشاء منشور جديد")}
              >
                إنشاء منشور جديد
              </Button>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <Tabs defaultValue="upcoming" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="upcoming" className="flex items-center gap-2">
                  <ListChecks className="h-4 w-4" />
                  <span>قادمة</span>
                </TabsTrigger>
                <TabsTrigger value="published" className="flex items-center gap-2">
                  <BarChart className="h-4 w-4" />
                  <span>منشورة</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming" className="space-y-4">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <Card key={post.id} className="mb-3 overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{post.title}</h3>
                            <p className="text-sm text-gray-500 line-clamp-1">{post.content}</p>
                            <div className="flex items-center gap-1 mt-2">
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                {new Date(post.dateTime).toLocaleString('ar-SA')}
                              </span>
                              {post.platforms.map((p) => (
                                <span key={p} className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                                  {p}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleReschedule(post.id)}
                            >
                              إعادة جدولة
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => handleShare(post.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Share2 className="h-4 w-4 ml-2" />
                              نشر الآن
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 border rounded-md bg-gray-50">
                    <p className="text-gray-500">لا توجد منشورات مجدولة في هذا اليوم</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="published" className="space-y-4">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <Card key={post.id} className="mb-3 overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{post.title}</h3>
                            <p className="text-sm text-gray-500 line-clamp-1">{post.content}</p>
                            <div className="flex items-center gap-1 mt-2">
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                {new Date(post.dateTime).toLocaleString('ar-SA')}
                              </span>
                              {post.platforms.map((p) => (
                                <span key={p} className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                                  {p}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => toast.success("تم فتح تحليلات المنشور")}
                            >
                              <BarChart className="h-4 w-4 ml-2" />
                              التحليلات
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 border rounded-md bg-gray-50">
                    <p className="text-gray-500">لا توجد منشورات منشورة في هذا اليوم</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

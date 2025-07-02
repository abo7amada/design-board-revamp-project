import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { 
  Bell, Calendar as CalendarIcon, LayoutGrid, PencilRuler, 
  Search, Settings, BarChart, Users, Home, ArrowLeft,
  Plus, Filter, ChevronDown, Instagram, Facebook, Twitter, Linkedin, Monitor, MoreHorizontal,
  Heart, MessageCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import PostCard from "@/components/PostCard";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PublishDesignModal from "@/components/PublishDesignModal";
import { usePosts } from "@/hooks/usePosts";
import { AppSidebar } from "@/components/shared/AppSidebar";

// Helper function to get platform icon
const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case "facebook":
      return <Facebook className="h-4 w-4 text-blue-600" />;
    case "instagram":
      return <Instagram className="h-4 w-4 text-pink-600" />;
    case "twitter":
      return <Twitter className="h-4 w-4 text-blue-400" />;
    case "linkedin":
      return <Linkedin className="h-4 w-4 text-blue-700" />;
    case "website":
      return <Monitor className="h-4 w-4 text-green-600" />;
    default:
      return null;
  }
};

const CalendarPage = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"month" | "week">("month");
  const [platformFilter, setPlatformFilter] = useState<string | null>(null);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState<any | null>(null);
  
  const { posts, loading } = usePosts();
  
  // تصفية المنشورات بناءً على التاريخ المحدد
  const filteredByDatePosts = selectedDate 
    ? posts.filter(post => {
        const postDate = new Date(post.scheduled_at || post.created_at);
        const selectedDateStr = selectedDate.toDateString();
        const postDateStr = postDate.toDateString();
        return postDateStr === selectedDateStr;
      })
    : [];
  
  // تصفية إضافية بناءً على البحث
  const searchFilteredPosts = searchQuery 
    ? filteredByDatePosts.filter(post => 
        post.title.includes(searchQuery) || 
        post.clients?.name?.includes(searchQuery) ||
        post.status?.includes(searchQuery)
      )
    : filteredByDatePosts;
  
  // تصفية حسب المنصات
  const finalFilteredPosts = platformFilter 
    ? searchFilteredPosts.filter(post => post.platforms?.includes(platformFilter))
    : searchFilteredPosts;
  
  // الحصول على كل التواريخ التي يوجد بها منشورات مجدولة
  const datesWithPosts = posts
    .filter(post => post.scheduled_at)
    .map(post => new Date(post.scheduled_at!));
  
  const handleBackToHome = () => {
    navigate('/');
  };
  
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleAddScheduledPost = () => {
    navigate('/add-post');
  };
  
  return (
    <div className="min-h-screen flex w-full" dir="rtl">
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        
        {/* Main content */}
        <main className="flex-1 bg-white">
          {/* Header */}
          <header className="bg-white border-b py-2 px-4 flex justify-between items-center">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full"
                onClick={() => toast.info("لديك إشعاران جديدان")}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">2</span>
              </Button>
            </div>
            
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-green-700 mr-2">تقويم النشر الاجتماعي</h1>
              <Button 
                variant="ghost" 
                size="icon" 
                className="ml-2"
                onClick={handleBackToHome}
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">العودة</span>
              </Button>
            </div>
          </header>
          
          {/* Content */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                {/* Fix: Wrapping TabsList inside Tabs component */}
                <Tabs defaultValue="month">
                  <TabsList>
                    <TabsTrigger value="month" onClick={() => setViewMode("month")} className={viewMode === "month" ? "bg-primary text-white" : ""}>شهري</TabsTrigger>
                    <TabsTrigger value="week" onClick={() => setViewMode("week")} className={viewMode === "week" ? "bg-primary text-white" : ""}>أسبوعي</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <Select value={platformFilter || "all"} onValueChange={(value) => setPlatformFilter(value === "all" ? null : value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="جميع المنصات" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع المنصات</SelectItem>
                    <SelectItem value="facebook">فيسبوك</SelectItem>
                    <SelectItem value="instagram">انستغرام</SelectItem>
                    <SelectItem value="twitter">تويتر</SelectItem>
                    <SelectItem value="linkedin">لينكد إن</SelectItem>
                    <SelectItem value="tiktok">تيك توك</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={handleAddScheduledPost} className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 ml-2" />
                جدولة منشور جديد
              </Button>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-6">
              {/* التقويم */}
              <div className="lg:w-1/2">
                <Card className="shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">تقويم النشر</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      className="rounded-md border shadow mx-auto rtl"
                    />
                    
                    <div className="mt-4 flex justify-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                        <span className="text-sm text-gray-600">فيسبوك</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-pink-600"></div>
                        <span className="text-sm text-gray-600">انستغرام</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-blue-400"></div>
                        <span className="text-sm text-gray-600">تويتر</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-blue-800"></div>
                        <span className="text-sm text-gray-600">لينكد إن</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Analytics Card */}
                <Card className="shadow-md mt-6">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">إحصائيات النشر</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div className="font-bold text-3xl text-blue-600">
                            {posts.filter(p => p.scheduled_at).length}
                          </div>
                          <Facebook className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="text-sm text-gray-600 mt-1">منشورات مجدولة</div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div className="font-bold text-3xl text-pink-600">
                            {posts.filter(p => p.status === 'published').length}
                          </div>
                          <Instagram className="h-6 w-6 text-pink-600" />
                        </div>
                        <div className="text-sm text-gray-600 mt-1">منشورات منشورة</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Posts for selected date */}
              <div className="lg:w-1/2">
                <Card className="shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">
                      منشورات يوم {selectedDate && selectedDate.toLocaleDateString('ar-SA')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500">جاري تحميل المنشورات...</p>
                      </div>
                    ) : finalFilteredPosts.length > 0 ? (
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {finalFilteredPosts.map(post => (
                          <PostCard key={post.id} post={post} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">
                          {selectedDate 
                            ? "لا توجد منشورات مجدولة في هذا التاريخ" 
                            : "اختر تاريخًا لعرض المنشورات المجدولة"
                          }
                        </p>
                        <Button 
                          variant="outline" 
                          onClick={handleAddScheduledPost}
                          className="gap-2"
                        >
                          <Plus className="h-4 w-4" />
                          جدولة منشور جديد
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Schedule analysis */}
                <Card className="shadow-md mt-6">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">تحليل الجدولة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div className="font-bold text-2xl text-green-600">
                            {posts.filter(p => p.scheduled_at).length}
                          </div>
                          <CalendarIcon className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="text-sm text-gray-600 mt-1">منشورات مجدولة</div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div className="font-bold text-2xl text-blue-600">
                            {posts.filter(p => p.status === 'published').length}
                          </div>
                          <BarChart className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="text-sm text-gray-600 mt-1">منشورات منشورة</div>
                      </div>
                    </div>
                    
                    <div className="mt-6 border rounded-lg p-4">
                      <h4 className="font-medium mb-3">أفضل أوقات النشر</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>فيسبوك</span>
                          <span className="text-green-600">9:00 ص - 3:00 م</span>
                        </div>
                        <div className="flex justify-between">
                          <span>إنستجرام</span>
                          <span className="text-green-600">6:00 م - 9:00 م</span>
                        </div>
                        <div className="flex justify-between">
                          <span>تويتر</span>
                          <span className="text-green-600">12:00 م - 3:00 م</span>
                        </div>
                        <div className="flex justify-between">
                          <span>لينكد إن</span>
                          <span className="text-green-600">8:00 ص - 10:00 ص</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
        
        {selectedDesign && (
          <PublishDesignModal 
            design={selectedDesign}
            isOpen={isPublishModalOpen} 
            onClose={() => setIsPublishModalOpen(false)} 
          />
        )}
      </SidebarProvider>
    </div>
  );
};

export default CalendarPage;

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { 
  Bell, Calendar as CalendarIcon, LayoutGrid, PencilRuler, 
  Search, Settings, BarChart, Users, Home, ArrowLeft,
  Plus, Filter, ChevronDown, Instagram, Facebook, Twitter, Linkedin, Monitor, MoreHorizontal
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
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PublishDesignModal from "@/components/PublishDesignModal";

// Enhanced data with social media platforms and status
const posts = [
  {
    id: 1,
    title: "إطلاق منتج جديد",
    category: "منشور",
    image: "/placeholder.svg",
    date: "2023/05/15",
    author: "شركة الأفق الأخضر",
    status: "معتمد",
    hasDesign: true,
    platforms: ["facebook", "instagram", "twitter", "linkedin"],
    stats: {
      likes: 120,
      comments: 45,
      shares: 23,
      clicks: 89
    }
  },
  {
    id: 2,
    title: "ورشة عمل تقنية",
    category: "مجدول",
    image: "/placeholder.svg",
    date: "2023/06/20",
    author: "شركة الأفق الأخضر",
    status: "قيد المراجعة",
    hasDesign: true,
    platforms: ["facebook", "instagram"],
    stats: {
      likes: 0,
      comments: 0,
      shares: 0,
      clicks: 0
    }
  },
  {
    id: 3,
    title: "عرض موسم الصيف",
    category: "مسودة",
    image: "/placeholder.svg",
    date: "2023/07/01",
    author: "مؤسسة نجمة الشمال",
    status: "مسودة",
    hasDesign: false,
    platforms: ["instagram", "twitter"],
    stats: {
      likes: 0,
      comments: 0,
      shares: 0,
      clicks: 0
    }
  },
  {
    id: 4,
    title: "مقابلة مع المدير التنفيذي",
    category: "مسودة",
    image: "/placeholder.svg",
    date: "2023/08/05",
    author: "شركة الأفق الأخضر",
    status: "مسودة",
    hasDesign: false,
    platforms: ["linkedin", "facebook"],
    stats: {
      likes: 0,
      comments: 0,
      shares: 0,
      clicks: 0
    }
  },
  {
    id: 5,
    title: "حملة إعلانية جديدة",
    category: "منشور",
    image: "/placeholder.svg",
    date: "2023/05/05",
    author: "مؤسسة نجمة الشمال",
    status: "معتمد",
    hasDesign: true,
    platforms: ["facebook", "instagram"],
    stats: {
      likes: 210,
      comments: 65,
      shares: 48,
      clicks: 156
    }
  },
  {
    id: 6,
    title: "اجتماع فريق التسويق",
    category: "مجدول",
    image: "/placeholder.svg",
    date: "2023/05/10",
    author: "شركة الأفق الأخضر",
    status: "قيد المراجعة",
    hasDesign: false,
    platforms: ["linkedin"],
    stats: {
      likes: 0,
      comments: 0,
      shares: 0,
      clicks: 0
    }
  },
  {
    id: 7,
    title: "إطلاق الموقع الجديد",
    category: "منشور",
    image: "/placeholder.svg",
    date: "2023/05/20",
    author: "شركة الأفق الأخضر",
    status: "معتمد",
    hasDesign: true,
    platforms: ["facebook", "twitter", "linkedin"],
    stats: {
      likes: 78,
      comments: 24,
      shares: 15,
      clicks: 67
    }
  },
  {
    id: 8,
    title: "استراتيجية وسائل التواصل",
    category: "مجدول",
    image: "/placeholder.svg",
    date: "2023/05/25",
    author: "مؤسسة نجمة الشمال",
    status: "قيد المراجعة",
    hasDesign: true,
    platforms: ["instagram", "tiktok"],
    stats: {
      likes: 0,
      comments: 0,
      shares: 0,
      clicks: 0
    }
  }
];

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
  
  // تحويل التاريخ إلى صيغة نصية موحدة لسهولة المقارنة
  const formatDateForComparison = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };
  
  // تحويل التاريخ النصي في البيانات إلى كائن Date
  const parsePostDate = (dateString: string) => {
    const [year, month, day] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
  };
  
  // تصفية المنشورات بناءً على التاريخ المحدد
  const filteredByDatePosts = selectedDate 
    ? posts.filter(post => {
        const postDate = parsePostDate(post.date);
        const selectedDateStr = formatDateForComparison(selectedDate);
        const postDateStr = formatDateForComparison(postDate);
        return postDateStr === selectedDateStr;
      })
    : [];
  
  // تصفية إضافية بناءً على البحث
  const searchFilteredPosts = searchQuery 
    ? filteredByDatePosts.filter(post => 
        post.title.includes(searchQuery) || 
        post.category.includes(searchQuery) ||
        post.author.includes(searchQuery)
      )
    : filteredByDatePosts;
  
  // تصفية حسب المنصات
  const finalFilteredPosts = platformFilter 
    ? searchFilteredPosts.filter(post => post.platforms.includes(platformFilter))
    : searchFilteredPosts;
  
  // الحصول على كل التواريخ التي يوجد بها منشورات (للتلوين في التقويم)
  const datesWithPosts = posts.map(post => parsePostDate(post.date));
  
  // تجميع المنشورات حسب الفئة
  const groupedPosts = finalFilteredPosts.reduce((acc, post) => {
    if (!acc[post.category]) {
      acc[post.category] = [];
    }
    acc[post.category].push(post);
    return acc;
  }, {} as Record<string, typeof posts>);
  
  const handleBackToHome = () => {
    navigate('/');
  };
  
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleAddScheduledPost = () => {
    // Select first design as example
    const exampleDesign = {
      id: 1,
      title: "إطلاق منتج جديد",
      category: "إعلان",
      image: "/placeholder.svg",
      date: "2023/05/15",
      author: "شركة الأفق الأخضر",
      likes: 120,
      comments: 45
    };
    
    setSelectedDesign(exampleDesign);
    setIsPublishModalOpen(true);
  };
  
  return (
    <div className="min-h-screen flex" dir="rtl">
      {/* Sidebar */}
      <SidebarProvider>
        <aside className="h-screen sticky top-0 w-64 border-l bg-white hidden md:block">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold text-green-700">كانفاس التواصل</h2>
            </div>
            
            <nav className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-6">
                <li>
                  <Button 
                    variant="link" 
                    className="w-full justify-start gap-2 text-gray-600 hover:text-green-700"
                    onClick={handleBackToHome}
                  >
                    <Home className="h-5 w-5" />
                    <span className="text-lg">الرئيسية</span>
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="w-full justify-start gap-2 text-gray-600 hover:text-green-700" onClick={() => toast.info("تم النقر على لوحة المنشورات")}>
                    <LayoutGrid className="h-5 w-5" />
                    <span className="text-lg">لوحة المنشورات</span>
                  </Button>
                </li>
                <li>
                  <Button 
                    variant="link" 
                    className="w-full justify-start gap-2 text-gray-600 hover:text-green-700"
                    onClick={() => navigate("/designs")}
                  >
                    <PencilRuler className="h-5 w-5" />
                    <span className="text-lg">لوحة التصاميم</span>
                  </Button>
                </li>
                <li>
                  <Button 
                    variant="link" 
                    className="w-full justify-start gap-2 text-green-700"
                  >
                    <CalendarIcon className="h-5 w-5" />
                    <span className="text-lg">التقويم</span>
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="w-full justify-start gap-2 text-gray-600 hover:text-green-700" onClick={() => toast.info("تم النقر على الإحصائيات")}>
                    <BarChart className="h-5 w-5" />
                    <span className="text-lg">الإحصائيات</span>
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="w-full justify-start gap-2 text-gray-600 hover:text-green-700" onClick={() => toast.info("تم النقر على العملاء")}>
                    <Users className="h-5 w-5" />
                    <span className="text-lg">العملاء</span>
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="w-full justify-start gap-2 text-gray-600 hover:text-green-700" onClick={() => toast.info("تم النقر على الإعدادات")}>
                    <Settings className="h-5 w-5" />
                    <span className="text-lg">الإعدادات</span>
                  </Button>
                </li>
              </ul>
            </nav>
            
            <div className="p-4 border-t">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gray-200 relative overflow-hidden">
                    <img src="/lovable-uploads/10fc914b-5004-4050-8edd-e2273f4b215d.png" alt="Profile" className="h-full w-full object-cover" />
                  </div>
                </div>
                <div className="mr-3">
                  <p className="text-sm font-medium">أحمد محمد</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
        
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
                <TabsList>
                  <TabsTrigger value="month" onClick={() => setViewMode("month")} className={viewMode === "month" ? "bg-primary text-white" : ""}>شهري</TabsTrigger>
                  <TabsTrigger value="week" onClick={() => setViewMode("week")} className={viewMode === "week" ? "bg-primary text-white" : ""}>أسبوعي</TabsTrigger>
                </TabsList>
                
                <Select value={platformFilter || ""} onValueChange={(value) => setPlatformFilter(value || null)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="جميع المنصات" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">جميع المنصات</SelectItem>
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
                          <div className="font-bold text-3xl text-blue-600">478</div>
                          <Facebook className="h-6 w-6 text-blue-600" />
                        </div>
                        <p className="text-sm text-gray-500 mt-1">إجمالي التفاعلات</p>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div className="font-bold text-3xl text-pink-600">512</div>
                          <Instagram className="h-6 w-6 text-pink-600" />
                        </div>
                        <p className="text-sm text-gray-500 mt-1">إجمالي التفاعلات</p>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div className="font-bold text-3xl text-blue-400">192</div>
                          <Twitter className="h-6 w-6 text-blue-400" />
                        </div>
                        <p className="text-sm text-gray-500 mt-1">إجمالي التفاعلات</p>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div className="font-bold text-3xl text-blue-800">87</div>
                          <Linkedin className="h-6 w-6 text-blue-800" />
                        </div>
                        <p className="text-sm text-gray-500 mt-1">إجمالي التفاعلات</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">أداء المنشورات هذا الشهر</span>
                        <Button variant="ghost" size="sm" onClick={() => toast.info("عرض المزيد من الإحصائيات")}>
                          المزيد <ChevronDown className="h-3 w-3 mr-1" />
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">إجمالي التفاعلات</span>
                          <div className="text-xs font-medium">1,269</div>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-green-600 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">إجمالي الوصول</span>
                          <div className="text-xs font-medium">8,943</div>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">إجمالي النقرات</span>
                          <div className="text-xs font-medium">312</div>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-500 rounded-full" style={{ width: '40%' }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* المنشورات ليوم معين */}
              <div className="lg:w-1/2">
                <Card className="shadow-md h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">
                      {selectedDate ? `منشورات يوم ${selectedDate.toLocaleDateString('ar-EG')}` : "اختر تاريخًا"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          className="pl-10 pr-4 py-2 w-full text-right" 
                          placeholder="ابحث عن منشور..." 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4 max-h-[700px] overflow-auto">
                      {finalFilteredPosts.length > 0 ? (
                        Object.entries(groupedPosts).map(([category, posts]) => (
                          <div key={category} className="space-y-2">
                            <h3 className="text-lg font-semibold text-right mb-2">{category}</h3>
                            {posts.map(post => (
                              <div key={post.id} className="border rounded-lg p-3 hover:bg-gray-50">
                                <div className="flex">
                                  <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                                  </div>
                                  <div className="mr-3 flex-1">
                                    <div className="flex justify-between">
                                      <h3 className="font-medium">{post.title}</h3>
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" size="sm">
                                            <MoreHorizontal className="h-4 w-4" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-48">
                                          <DropdownMenuGroup>
                                            <DropdownMenuItem onClick={() => toast.info("تعديل المنشور")}>
                                              تعديل المنشور
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => toast.info("تغيير موعد النشر")}>
                                              تغيير موعد النشر
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => toast.info("حذف المنشور")}>
                                              حذف المنشور
                                            </DropdownMenuItem>
                                          </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </div>
                                    
                                    <div className="text-sm text-gray-500 mt-1">{post.author}</div>
                                    
                                    <div className="flex mt-2 justify-between">
                                      <div className="flex items-center gap-1">
                                        {post.platforms.map((platform) => (
                                          <div key={platform} className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                                            {getPlatformIcon(platform)}
                                          </div>
                                        ))}
                                      </div>
                                      
                                      {post.category === "منشور" && (
                                        <div className="text-xs flex gap-2">
                                          <div className="flex items-center gap-1 text-gray-500">
                                            <span>{post.stats.likes}</span>
                                            <Heart className="h-3 w-3" />
                                          </div>
                                          <div className="flex items-center gap-1 text-gray-500">
                                            <span>{post.stats.comments}</span>
                                            <MessageCircle className="h-3 w-3" />
                                          </div>
                                        </div>
                                      )}
                                      
                                      {post.category === "مجدول" && (
                                        <div className="text-xs text-gray-500">
                                          {new Date(parsePostDate(post.date)).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-10">
                          <p className="text-gray-500">
                            {selectedDate 
                              ? "لا توجد منشورات في هذا التاريخ" 
                              : "الرجاء اختيار تاريخ لعرض المنشورات"}
                          </p>
                          
                          <Button 
                            variant="outline" 
                            className="mt-4"
                            onClick={handleAddScheduledPost}
                          >
                            <Plus className="h-4 w-4 ml-2" />
                            إضافة منشور
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </SidebarProvider>
      
      {selectedDesign && (
        <PublishDesignModal
          isOpen={isPublishModalOpen}
          onClose={() => setIsPublishModalOpen(false)}
          design={selectedDesign}
        />
      )}
    </div>
  );
};

export default CalendarPage;

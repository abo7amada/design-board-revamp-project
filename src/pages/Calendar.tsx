
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Bell, Calendar as CalendarIcon, LayoutGrid, PencilRuler, Search, Settings, BarChart, Users, Home, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import PostCard from "@/components/PostCard";

// بيانات افتراضية
const posts = [
  {
    id: 1,
    title: "إطلاق منتج جديد",
    category: "منشور",
    image: "/placeholder.svg",
    date: "2023/05/15",
    author: "شركة الأفق الأخضر",
    status: "معتمد",
    hasDesign: true
  },
  {
    id: 2,
    title: "ورشة عمل تقنية",
    category: "مجدول",
    image: "/placeholder.svg",
    date: "2023/06/20",
    author: "شركة الأفق الأخضر",
    status: "قيد المراجعة",
    hasDesign: true
  },
  {
    id: 3,
    title: "عرض موسم الصيف",
    category: "مسودة",
    image: "/placeholder.svg",
    date: "2023/07/01",
    author: "مؤسسة نجمة الشمال",
    status: "مسودة",
    hasDesign: false
  },
  {
    id: 4,
    title: "مقابلة مع المدير التنفيذي",
    category: "مسودة",
    image: "/placeholder.svg",
    date: "2023/08/05",
    author: "شركة الأفق الأخضر",
    status: "مسودة",
    hasDesign: false
  },
  {
    id: 5,
    title: "حملة إعلانية جديدة",
    category: "منشور",
    image: "/placeholder.svg",
    date: "2023/05/05",
    author: "مؤسسة نجمة الشمال",
    status: "معتمد",
    hasDesign: true
  },
  {
    id: 6,
    title: "اجتماع فريق التسويق",
    category: "مجدول",
    image: "/placeholder.svg",
    date: "2023/05/10",
    author: "شركة الأفق الأخضر",
    status: "قيد المراجعة",
    hasDesign: false
  },
  {
    id: 7,
    title: "إطلاق الموقع الجديد",
    category: "منشور",
    image: "/placeholder.svg",
    date: "2023/05/20",
    author: "شركة الأفق الأخضر",
    status: "معتمد",
    hasDesign: true
  },
  {
    id: 8,
    title: "استراتيجية وسائل التواصل",
    category: "مجدول",
    image: "/placeholder.svg",
    date: "2023/05/25",
    author: "مؤسسة نجمة الشمال",
    status: "قيد المراجعة",
    hasDesign: true
  }
];

const CalendarPage = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  
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
  const filteredPosts = selectedDate 
    ? posts.filter(post => {
        const postDate = parsePostDate(post.date);
        const selectedDateStr = formatDateForComparison(selectedDate);
        const postDateStr = formatDateForComparison(postDate);
        return postDateStr === selectedDateStr;
      })
    : [];
  
  // تصفية إضافية بناءً على البحث
  const searchFilteredPosts = searchQuery 
    ? filteredPosts.filter(post => 
        post.title.includes(searchQuery) || 
        post.category.includes(searchQuery) ||
        post.author.includes(searchQuery)
      )
    : filteredPosts;
  
  // الحصول على كل التواريخ التي يوجد بها منشورات (للتلوين في التقويم)
  const datesWithPosts = posts.map(post => parsePostDate(post.date));
  
  // تجميع المنشورات حسب الفئة
  const groupedPosts = searchFilteredPosts.reduce((acc, post) => {
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
              <h1 className="text-xl font-bold text-green-700 mr-2">التقويم</h1>
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
                    
                    <div className="space-y-4 max-h-[500px] overflow-auto">
                      {searchFilteredPosts.length > 0 ? (
                        Object.entries(groupedPosts).map(([category, posts]) => (
                          <div key={category} className="space-y-2">
                            <h3 className="text-lg font-semibold text-right mb-2">{category}</h3>
                            {posts.map(post => (
                              <PostCard key={post.id} post={post} />
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
    </div>
  );
};

export default CalendarPage;

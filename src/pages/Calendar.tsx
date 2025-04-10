
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bell, Calendar as CalendarIcon, LayoutGrid, PencilRuler, Search, Settings, BarChart, Users, Home, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import PostCard from "@/components/PostCard";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

// بيانات افتراضية للمنشورات
const posts = [
  {
    id: 1,
    title: "إطلاق منتج جديد",
    category: "منشور",
    image: "/placeholder.svg",
    date: "2023/5/15",
    author: "شركة الأفق الأخضر",
    status: "معتمد",
    hasDesign: true
  },
  {
    id: 2,
    title: "ورشة عمل تقنية",
    category: "مجدول",
    image: "/placeholder.svg",
    date: "2023/6/20",
    author: "شركة الأفق الأخضر",
    status: "قيد المراجعة",
    hasDesign: true
  },
  {
    id: 3,
    title: "عرض موسم الصيف",
    category: "مسودة",
    image: "/placeholder.svg",
    date: "2023/7/1",
    author: "مؤسسة نجمة الشمال",
    status: "مسودة",
    hasDesign: false
  },
  {
    id: 4,
    title: "مقابلة مع المدير التنفيذي",
    category: "مسودة",
    image: "/placeholder.svg",
    date: "2023/8/5",
    author: "شركة الأفق الأخضر",
    status: "مسودة",
    hasDesign: false
  },
  {
    id: 5,
    title: "إطلاق الحملة الإعلانية الجديدة",
    category: "منشور",
    image: "/placeholder.svg",
    date: "2023/9/10",
    author: "شركة الأفق الأخضر",
    status: "معتمد",
    hasDesign: true
  },
  {
    id: 6,
    title: "مؤتمر التسويق الرقمي",
    category: "مجدول",
    image: "/placeholder.svg",
    date: "2023/10/15",
    author: "مؤسسة نجمة الشمال",
    status: "قيد المراجعة",
    hasDesign: true
  }
];

// تحويل سلسلة التاريخ إلى كائن Date
const parseDate = (dateString: string) => {
  const [year, month, day] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day);
};

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [filteredPosts, setFilteredPosts] = useState<typeof posts>([]);
  const navigate = useNavigate();

  // تحديد التواريخ التي تحتوي على منشورات
  const datesWithPosts = posts.map(post => parseDate(post.date));

  // تصفية المنشورات بناءً على التاريخ المحدد
  useEffect(() => {
    if (selectedDate) {
      const formattedSelectedDate = format(selectedDate, 'yyyy/M/d');
      const postsOnSelectedDate = posts.filter(post => {
        return post.date === formattedSelectedDate;
      });
      setFilteredPosts(postsOnSelectedDate);
    } else {
      setFilteredPosts([]);
    }
  }, [selectedDate]);

  // معالج تغيير التاريخ
  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = format(date, 'yyyy/M/d');
      toast.info(`تم اختيار تاريخ: ${formattedDate}`);
    }
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
                  <Button variant="link" className="w-full justify-start gap-2 text-gray-600 hover:text-green-700" onClick={() => navigate("/")}>
                    <Home className="h-5 w-5" />
                    <span className="text-lg">الرئيسية</span>
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="w-full justify-start gap-2 text-gray-600 hover:text-green-700" onClick={() => navigate("/")}>
                    <LayoutGrid className="h-5 w-5" />
                    <span className="text-lg">لوحة المنشورات</span>
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="w-full justify-start gap-2 text-gray-600 hover:text-green-700" onClick={() => navigate("/designs")}>
                    <PencilRuler className="h-5 w-5" />
                    <span className="text-lg">لوحة التصاميم</span>
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="w-full justify-start gap-2 text-green-700">
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
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => toast.info("لديك إشعاران جديدان")}>
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">2</span>
              </Button>
            </div>
            
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-green-700 mr-2">تقويم المنشورات</h1>
              <Button variant="ghost" size="icon" className="ml-2" onClick={() => navigate("/")}>
                <span className="sr-only">إغلاق</span>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                  <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </Button>
            </div>
          </header>
          
          {/* Content */}
          <div className="p-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-right mb-8">تقويم المنشورات</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Calendar */}
                <Card className="p-6 md:col-span-1">
                  <h3 className="text-xl font-bold mb-4 text-right">التقويم</h3>
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateChange}
                      className="border p-3 pointer-events-auto"
                      showOutsideDays={true}
                      modifiers={{
                        hasPost: datesWithPosts
                      }}
                      modifiersStyles={{
                        hasPost: {
                          backgroundColor: "#e6f4ea",
                          borderRadius: "4px",
                          color: "#137333"
                        }
                      }}
                    />
                  </div>
                  <div className="mt-4 text-right">
                    <p className="text-gray-600 text-sm">
                      * الأيام المميزة باللون الأخضر تحتوي على منشورات
                    </p>
                  </div>
                </Card>
                
                {/* Posts for the selected date */}
                <Card className="p-6 md:col-span-2">
                  <div className="flex justify-between items-center mb-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-2"
                      onClick={() => {
                        if (selectedDate) {
                          const newDate = new Date(selectedDate);
                          newDate.setDate(newDate.getDate() - 1);
                          setSelectedDate(newDate);
                        }
                      }}
                    >
                      <ChevronRight className="h-4 w-4" />
                      <span>اليوم السابق</span>
                    </Button>
                    
                    <h3 className="text-xl font-bold text-right">
                      {selectedDate ? format(selectedDate, 'yyyy/MM/dd') : 'لا يوجد تاريخ محدد'}
                    </h3>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-2"
                      onClick={() => {
                        if (selectedDate) {
                          const newDate = new Date(selectedDate);
                          newDate.setDate(newDate.getDate() + 1);
                          setSelectedDate(newDate);
                        }
                      }}
                    >
                      <span>اليوم التالي</span>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {filteredPosts.length > 0 ? (
                      filteredPosts.map(post => (
                        <PostCard key={post.id} post={post} />
                      ))
                    ) : (
                      <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <CalendarIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <h4 className="text-lg font-medium text-gray-600 mb-2">لا توجد منشورات في هذا اليوم</h4>
                        <p className="text-gray-500">اختر تاريخًا آخر أو قم بإضافة منشورات جديدة</p>
                      </div>
                    )}
                  </div>
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

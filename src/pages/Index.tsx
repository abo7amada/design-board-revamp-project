import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, LayoutGrid, PencilRuler, Search, Settings, BarChart, Users, Home, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
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
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  // تصفية المنشورات بناءً على البحث
  const filteredPosts = posts.filter(post => 
    post.title.includes(searchQuery) || 
    post.category.includes(searchQuery) ||
    post.author.includes(searchQuery)
  );

  // تجميع المنشورات حسب الفئة
  const groupedPosts = filteredPosts.reduce((acc, post) => {
    if (!acc[post.category]) {
      acc[post.category] = [];
    }
    acc[post.category].push(post);
    return acc;
  }, {} as Record<string, typeof posts>);

  const categories = {
    "منشور": { count: groupedPosts["منشور"]?.length || 0, color: "bg-purple-100" },
    "مجدول": { count: groupedPosts["مجدول"]?.length || 0, color: "bg-blue-100" },
    "مسودة": { count: groupedPosts["مسودة"]?.length || 0, color: "bg-gray-100" }
  };

  const handleAddPost = () => {
    navigate("/add-post");
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
                  <Button variant="link" className="w-full justify-start gap-2 text-green-700">
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
                  <Button variant="link" className="w-full justify-start gap-2 text-gray-600 hover:text-green-700" onClick={() => toast.info("تم النقر على التقويم")}>
                    <Calendar className="h-5 w-5" />
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
              <h1 className="text-xl font-bold text-green-700 mr-2">لوحة إدارة التصاميم</h1>
              <Button 
                variant="ghost" 
                size="icon" 
                className="ml-2"
                onClick={() => toast.info("تم النقر على زر الإغلاق")}
              >
                <span className="sr-only">Close</span>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                  <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </Button>
            </div>
          </header>
          
          {/* Content */}
          <div className="p-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-right mb-8">لوحة المنشورات</h2>
              
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <Button 
                  className="bg-green-600 hover:bg-green-700 gap-2"
                  onClick={handleAddPost}
                >
                  <span>إضافة منشور</span>
                  <Plus className="h-4 w-4" />
                </Button>
                
                <div className="flex-1 flex gap-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      className="pl-10 pr-4 py-2 w-full text-right" 
                      placeholder="ابحث عن منشور..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <select 
                    className="bg-white border border-gray-300 rounded-md px-4 py-2"
                    onChange={() => toast.info("تم تغيير تصفية العملاء")}
                  >
                    <option>كل العملاء</option>
                    <option>شركة الأفق الأخضر</option>
                    <option>مؤسسة نجمة الشمال</option>
                  </select>
                  
                  <select 
                    className="bg-white border border-gray-300 rounded-md px-4 py-2"
                    onChange={() => toast.info("تم تغيير تصفية الحالة")}
                  >
                    <option>جميع الحالات</option>
                    <option>معتمد</option>
                    <option>قيد المراجعة</option>
                    <option>مسودة</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(categories).map(([category, details]) => (
                  <Card 
                    key={category} 
                    className={`${details.color} rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-all`}
                    onClick={() => toast.info(`تم النقر على فئة: ${category}`)}
                  >
                    <div className="p-5 flex justify-between items-center">
                      <div className="rounded-md px-2 py-1 bg-opacity-80" style={{ backgroundColor: category === "منشور" ? "#b083f8" : category === "مجدول" ? "#4e97f7" : "#6b7280" }}>
                        <span className="text-white font-medium text-sm">{details.count}</span>
                      </div>
                      <h3 className="text-xl font-bold">{category}</h3>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              {Object.entries(groupedPosts).map(([category, posts]) => (
                <div key={category} className="space-y-4">
                  {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              ))}
              
              {filteredPosts.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">لا توجد منشورات متطابقة مع معايير البحث</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default Index;

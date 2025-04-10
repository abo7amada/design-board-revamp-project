
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, LayoutGrid, PencilRuler, Search, Settings, BarChart, Users, Home, List, Filter, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import DesignCard from "@/components/DesignCard";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// بيانات افتراضية للتصاميم
const designsData = [
  {
    id: 1,
    title: "تصميم الحملة الترويجية للصيف",
    category: "ترويجي",
    image: "/placeholder.svg",
    date: "2023/06/15",
    author: "أحمد محمد",
    likes: 24,
    comments: 8
  },
  {
    id: 2,
    title: "شعار الشركة الجديد",
    category: "هوية بصرية",
    image: "/placeholder.svg",
    date: "2023/05/22",
    author: "سارة عبدالله",
    likes: 43,
    comments: 12
  },
  {
    id: 3,
    title: "منشور انستجرام للعيد",
    category: "وسائل تواصل",
    image: "/placeholder.svg",
    date: "2023/07/01",
    author: "محمود أحمد",
    likes: 18,
    comments: 5
  },
  {
    id: 4,
    title: "بطاقة دعوة للمؤتمر السنوي",
    category: "طباعة",
    image: "/placeholder.svg",
    date: "2023/07/10",
    author: "خالد عمر",
    likes: 15,
    comments: 3
  },
  {
    id: 5,
    title: "تصميم الموقع الإلكتروني الجديد",
    category: "ويب",
    image: "/placeholder.svg",
    date: "2023/06/30",
    author: "نورة سالم",
    likes: 32,
    comments: 14
  },
  {
    id: 6,
    title: "إعلان ترويجي للخصم الموسمي",
    category: "ترويجي",
    image: "/placeholder.svg",
    date: "2023/06/05",
    author: "أحمد محمد",
    likes: 21,
    comments: 7
  }
];

// تصنيف التصاميم حسب الفئة
const categories = {
  "جميع التصاميم": { count: designsData.length, color: "bg-green-100", textColor: "text-green-800" },
  "ترويجي": { count: designsData.filter(d => d.category === "ترويجي").length, color: "bg-purple-100", textColor: "text-purple-800" },
  "هوية بصرية": { count: designsData.filter(d => d.category === "هوية بصرية").length, color: "bg-blue-100", textColor: "text-blue-800" },
  "وسائل تواصل": { count: designsData.filter(d => d.category === "وسائل تواصل").length, color: "bg-yellow-100", textColor: "text-yellow-800" },
  "طباعة": { count: designsData.filter(d => d.category === "طباعة").length, color: "bg-red-100", textColor: "text-red-800" },
  "ويب": { count: designsData.filter(d => d.category === "ويب").length, color: "bg-indigo-100", textColor: "text-indigo-800" }
};

const Designs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("جميع التصاميم");
  const navigate = useNavigate();
  
  // تصفية التصاميم بناءً على البحث والفئة المحددة
  const filteredDesigns = designsData.filter(design => 
    (design.title.includes(searchQuery) || 
    design.category.includes(searchQuery) ||
    design.author.includes(searchQuery)) && 
    (selectedCategory === "جميع التصاميم" || design.category === selectedCategory)
  );

  const handleAddDesign = () => {
    navigate("/add-design");
  };

  const handleFilterChange = (category: string) => {
    setSelectedCategory(category);
    toast(`تم التصفية حسب: ${category}`);
  };

  const handleViewChange = (mode: "grid" | "list") => {
    setViewMode(mode);
    toast(`تم تغيير طريقة العرض إلى: ${mode === "grid" ? "شبكة" : "قائمة"}`);
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
                  <Button variant="link" className="w-full justify-start gap-2 text-green-700">
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
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => toast.info("لديك إشعاران جديدان")}>
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">2</span>
              </Button>
            </div>
            
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-green-700 mr-2">لوحة إدارة التصاميم</h1>
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
              <h2 className="text-2xl font-bold text-right mb-8">لوحة التصاميم</h2>
              
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <Button className="bg-green-600 hover:bg-green-700 gap-2" onClick={handleAddDesign}>
                  <span>إضافة تصميم</span>
                  <Plus className="h-4 w-4" />
                </Button>
                
                <div className="flex-1 flex gap-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      className="pl-10 pr-4 py-2 w-full text-right" 
                      placeholder="ابحث عن تصميم..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant={viewMode === "grid" ? "default" : "outline"} 
                      size="icon" 
                      onClick={() => handleViewChange("grid")}
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant={viewMode === "list" ? "default" : "outline"} 
                      size="icon" 
                      onClick={() => handleViewChange("list")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Button variant="outline" className="flex items-center gap-2" onClick={() => toast.info("تم فتح خيارات التصفية")}>
                    <Filter className="h-4 w-4" />
                    <span>تصفية</span>
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
                {Object.entries(categories).map(([category, details]) => (
                  <Card 
                    key={category} 
                    className={`${details.color} rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-md ${selectedCategory === category ? 'ring-2 ring-green-500' : ''}`}
                    onClick={() => handleFilterChange(category)}
                  >
                    <div className="p-3 flex flex-col items-center justify-center text-center">
                      <div className={`${details.textColor} font-medium text-lg mb-1`}>
                        {category}
                      </div>
                      <div className="text-sm font-medium bg-white bg-opacity-70 px-2 py-1 rounded-full">
                        {details.count}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            
            <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
              {filteredDesigns.length > 0 ? (
                filteredDesigns.map(design => (
                  <DesignCard key={design.id} design={design} viewMode={viewMode} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">لا توجد تصاميم متطابقة مع معايير البحث</p>
                  <Button 
                    variant="link" 
                    className="mt-4 text-green-600"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("جميع التصاميم");
                    }}
                  >
                    عرض جميع التصاميم
                  </Button>
                </div>
              )}
            </div>
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default Designs;

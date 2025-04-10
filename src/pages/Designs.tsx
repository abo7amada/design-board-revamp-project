
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bell, List, Filter, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import DesignCard from "@/components/DesignCard";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AppSidebar } from "@/components/shared/AppSidebar";
import { designsData } from "@/components/data/mockData";
import { Design } from "@/types/design";

// بيانات افتراضية للتصاميم
const statuses = {
  "معتمد": { count: designsData.filter(d => d.category === "معتمد").length, color: "bg-green-100", textColor: "text-green-800", borderColor: "border-green-500" },
  "قيد المراجعة": { count: designsData.filter(d => d.category === "قيد المراجعة").length, color: "bg-yellow-100", textColor: "text-yellow-800", borderColor: "border-yellow-500" },
  "مسودة": { count: designsData.filter(d => d.category === "مسودة").length, color: "bg-gray-100", textColor: "text-gray-800", borderColor: "border-gray-500" }
};

const Designs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [selectedClient, setSelectedClient] = useState("كل العملاء");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const navigate = useNavigate();
  
  // تصفية التصاميم بناءً على البحث والفئة المحددة
  const filteredDesigns = designsData.filter(design => 
    (design.title.includes(searchQuery) || 
    design.author.includes(searchQuery)) && 
    (selectedCategory === "الكل" || design.category === selectedCategory)
  );

  const handleAddDesign = () => {
    navigate("/add-design");
  };

  const handleFilterChange = (category: string) => {
    setSelectedCategory(category);
    toast(`تم التصفية حسب: ${category}`);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "grid" ? "list" : "grid");
  };

  useEffect(() => {
    console.log("تم تحميل صفحة التصاميم");
  }, []);

  return (
    <div className="min-h-screen flex" dir="rtl">
      {/* Sidebar */}
      <SidebarProvider>
        <AppSidebar />
        
        {/* Main content */}
        <main className="flex-1 bg-white">
          {/* Header */}
          <header className="bg-white border-b py-4 px-6 flex justify-between items-center">
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
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => toast.info("تغيير اللغة")}>
                <span className="sr-only">تغيير اللغة</span>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                  <path d="M7.49996 1.80002C4.35194 1.80002 1.79996 4.352 1.79996 7.50002C1.79996 10.648 4.35194 13.2 7.49996 13.2C10.648 13.2 13.2 10.648 13.2 7.50002C13.2 4.352 10.648 1.80002 7.49996 1.80002ZM0.899963 7.50002C0.899963 3.85494 3.85488 0.900024 7.49996 0.900024C11.145 0.900024 14.1 3.85494 14.1 7.50002C14.1 11.1451 11.145 14.1 7.49996 14.1C3.85488 14.1 0.899963 11.1451 0.899963 7.50002Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  <path d="M13.4999 7.89998H1.49994V7.09998H13.4999V7.89998Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  <path d="M7.09991 13.5V1.5H7.89991V13.5H7.09991Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  <path d="M10.3917 7.50002C10.3917 9.28565 9.28559 10.8 7.49996 10.8C5.71433 10.8 4.60822 9.28565 4.60822 7.50002C4.60822 5.71439 5.71433 4.20004 7.49996 4.20004C9.28559 4.20004 10.3917 5.71439 10.3917 7.50002ZM7.49996 10C8.66928 10 9.5917 8.94755 9.5917 7.50002C9.5917 6.05249 8.66928 5.00004 7.49996 5.00004C6.33064 5.00004 5.40822 6.05249 5.40822 7.50002C5.40822 8.94755 6.33064 10 7.49996 10Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </Button>
              <Button variant="ghost" size="icon" onClick={() => toast.info("تغيير الوضع الليلي")}>
                <span className="sr-only">تغيير الوضع الليلي</span>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                  <path d="M2.89998 0.499976C2.89998 0.279062 2.72089 0.099976 2.49998 0.099976C2.27906 0.099976 2.09998 0.279062 2.09998 0.499976V1.09998H1.49998C1.27906 1.09998 1.09998 1.27906 1.09998 1.49998C1.09998 1.72089 1.27906 1.89998 1.49998 1.89998H2.09998V2.49998C2.09998 2.72089 2.27906 2.89998 2.49998 2.89998C2.72089 2.89998 2.89998 2.72089 2.89998 2.49998V1.89998H3.49998C3.72089 1.89998 3.89998 1.72089 3.89998 1.49998C3.89998 1.27906 3.72089 1.09998 3.49998 1.09998H2.89998V0.499976ZM5.89998 3.49998C5.89998 3.27906 5.72089 3.09998 5.49998 3.09998C5.27906 3.09998 5.09998 3.27906 5.09998 3.49998V4.09998H4.49998C4.27906 4.09998 4.09998 4.27906 4.09998 4.49998C4.09998 4.72089 4.27906 4.89998 4.49998 4.89998H5.09998V5.49998C5.09998 5.72089 5.27906 5.89998 5.49998 5.89998C5.72089 5.89998 5.89998 5.72089 5.89998 5.49998V4.89998H6.49998C6.72089 4.89998 6.89998 4.72089 6.89998 4.49998C6.89998 4.27906 6.72089 4.09998 6.49998 4.09998H5.89998V3.49998ZM1.89998 6.49998C1.89998 6.27906 1.72089 6.09998 1.49998 6.09998C1.27906 6.09998 1.09998 6.27906 1.09998 6.49998V7.09998H0.499976C0.279062 7.09998 0.099976 7.27906 0.099976 7.49998C0.099976 7.72089 0.279062 7.89998 0.499976 7.89998H1.09998V8.49998C1.09998 8.72089 1.27906 8.89997 1.49998 8.89997C1.72089 8.89997 1.89998 8.72089 1.89998 8.49998V7.89998H2.49998C2.72089 7.89998 2.89998 7.72089 2.89998 7.49998C2.89998 7.27906 2.72089 7.09998 2.49998 7.09998H1.89998V6.49998ZM8.54406 0.98184L8.24618 0.941586C8.03275 0.917676 7.90692 1.1655 8.02936 1.34194C8.17013 1.54479 8.29981 1.75592 8.41754 1.97445C8.91878 2.90485 9.20322 3.96932 9.20322 5.10022C9.20322 8.35938 6.56226 11 3.30309 11C3.21429 11 3.12613 10.9978 3.03863 10.9935C2.90332 10.9856 2.80427 11.1275 2.89217 11.2459C4.28932 13.0682 6.53072 14.2 9.0347 14.2C13.4153 14.2 17 10.6153 17 6.23474C17 3.13015 15.0595 0.428515 12.3421 -0.17297C11.1114 -0.451886 9.83304 -0.20291 8.54406 0.98184Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </Button>
            </div>
          </header>
          
          {/* Content */}
          <div className="p-6">
            <div className="mb-8">
              <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <h2 className="text-2xl font-bold mb-4 md:mb-0">لوحة التصاميم</h2>
                
                <div className="flex flex-col md:flex-row gap-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2" 
                    onClick={toggleViewMode}
                  >
                    {viewMode === "grid" ? (
                      <>
                        <List className="h-4 w-4" />
                        <span>عرض قائمة</span>
                      </>
                    ) : (
                      <>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                          <path d="M12.5 2H8V7H13V2.5C13 2.22386 12.7761 2 12.5 2ZM13 8H8V13H12.5C12.7761 13 13 12.7761 13 12.5V8ZM7 2H2.5C2.22386 2 2 2.22386 2 2.5V7H7V2ZM2 8V12.5C2 12.7761 2.22386 13 2.5 13H7V8H2ZM2.5 1H12.5C13.3284 1 14 1.67157 14 2.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V2.5C1 1.67157 1.67157 1 2.5 1Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                        </svg>
                        <span>عرض شبكة</span>
                      </>
                    )}
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700 gap-2" onClick={handleAddDesign}>
                    <span>إضافة تصميم</span>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    className="pl-10 pr-4 py-2 w-full text-right" 
                    placeholder="ابحث عن تصميم..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Select value={selectedClient} onValueChange={setSelectedClient}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="كل العملاء" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="كل العملاء">كل العملاء</SelectItem>
                      <SelectItem value="شركة الوفق الأصفر">شركة الوفق الأصفر</SelectItem>
                      <SelectItem value="مؤسسة نجمة الشمال">مؤسسة نجمة الشمال</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="جميع الحالات" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="الكل">جميع الحالات</SelectItem>
                      <SelectItem value="معتمد">معتمد</SelectItem>
                      <SelectItem value="قيد المراجعة">قيد المراجعة</SelectItem>
                      <SelectItem value="مسودة">مسودة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {Object.entries(statuses).map(([status, details]) => (
                  <Card 
                    key={status} 
                    className={`${details.color} rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-md ${selectedCategory === status ? `ring-2 ${details.borderColor}` : ''}`}
                    onClick={() => handleFilterChange(status)}
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <span className={`text-xl font-bold ${details.textColor}`}>{status}</span>
                        <span className="px-2 py-1 rounded-full bg-white">{details.count}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div className="grid gap-6 grid-cols-1">
              {viewMode === "list" ? (
                filteredDesigns.length > 0 ? (
                  filteredDesigns.map(design => (
                    <DesignCard key={design.id} design={design} viewMode="list" onStatusChange={() => {}} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500 text-lg">لا توجد تصاميم متطابقة مع معايير البحث</p>
                    <Button 
                      variant="link" 
                      className="mt-4 text-green-600"
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("الكل");
                      }}
                    >
                      عرض جميع التصاميم
                    </Button>
                  </div>
                )
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDesigns.length > 0 ? (
                    filteredDesigns.map(design => (
                      <DesignCard key={design.id} design={design} viewMode="grid" onStatusChange={() => {}} />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <p className="text-gray-500 text-lg">لا توجد تصاميم متطابقة مع معايير البحث</p>
                      <Button 
                        variant="link" 
                        className="mt-4 text-green-600"
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedCategory("الكل");
                        }}
                      >
                        عرض جميع التصاميم
                      </Button>
                    </div>
                  )}
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

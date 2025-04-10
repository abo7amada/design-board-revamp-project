
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { clientsData } from "@/data/clients-data";
import { ClientsTable } from "@/components/clients/ClientsTable";
import { ClientForm } from "@/components/clients/ClientForm";
import { ClientsFilter } from "@/components/clients/ClientsFilter";
import { ClientsHeader } from "@/components/clients/ClientsHeader";
import { AppSidebar } from "@/components/shared/AppSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DesignCard from "@/components/DesignCard";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

// بيانات افتراضية للتصاميم
const designsData = [
  {
    id: 1,
    title: "إطلاق منتج جديد",
    category: "معتمد",
    image: "/placeholder.svg",
    date: "2023/05/02",
    author: "شركة الوفق الأصفر",
    likes: 24,
    comments: 8,
    description: "تم تصميم الإعلان بألوان العلامة التجارية",
    clientId: 1
  },
  {
    id: 2,
    title: "ورشة عمل تقنية",
    category: "قيد المراجعة",
    image: "/placeholder.svg",
    date: "2023/06/05",
    author: "شركة الوفق الأصفر",
    likes: 43,
    comments: 12,
    description: "أضفت تفاصيل الورشة كما طلبتم",
    clientId: 1
  },
  {
    id: 3,
    title: "إعلان توظيف",
    category: "مسودة",
    image: "/placeholder.svg",
    date: "2023/09/01",
    author: "مؤسسة نجمة الشمال",
    likes: 18,
    comments: 5,
    description: "بانتظار تعليقاتكم على التصميم",
    clientId: 2
  }
];

// بيانات افتراضية للمنشورات
const postsData = [
  {
    id: 1,
    title: "منشور عن إطلاق منتج جديد",
    status: "منشور",
    platform: "انستغرام",
    scheduledDate: "2023/05/15",
    image: "/placeholder.svg",
    likes: 45,
    comments: 12,
    shares: 8,
    clientId: 1
  },
  {
    id: 2,
    title: "منشور عن ورشة عمل",
    status: "مجدول",
    platform: "تويتر",
    scheduledDate: "2023/06/20",
    image: "/placeholder.svg",
    likes: 32,
    comments: 5,
    shares: 15,
    clientId: 1
  },
  {
    id: 3,
    title: "منشور تهنئة عيد الفطر",
    status: "مسودة",
    platform: "فيسبوك",
    scheduledDate: "2023/04/20",
    image: "/placeholder.svg",
    likes: 0,
    comments: 0,
    shares: 0,
    clientId: 2
  }
];

// تصنيف التصاميم حسب الحالة
const designStatuses = {
  "معتمد": { color: "bg-green-100", textColor: "text-green-800", borderColor: "border-green-500" },
  "قيد المراجعة": { color: "bg-yellow-100", textColor: "text-yellow-800", borderColor: "border-yellow-500" },
  "مسودة": { color: "bg-gray-100", textColor: "text-gray-800", borderColor: "border-gray-500" }
};

const Clients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("الكل");
  const [selectedSector, setSelectedSector] = useState("الكل");
  const [activeTab, setActiveTab] = useState("clients");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [designSearchQuery, setDesignSearchQuery] = useState("");
  const [selectedDesignCategory, setSelectedDesignCategory] = useState("الكل");
  const navigate = useNavigate();
  const { clientId } = useParams<{ clientId: string }>();

  // تصفية العملاء بناءً على البحث والحالة والقطاع
  const filteredClients = clientsData.filter(client => 
    (client.name.includes(searchQuery) || 
    client.email.includes(searchQuery) || 
    client.contact.includes(searchQuery)) && 
    (selectedStatus === "الكل" || client.status === selectedStatus) &&
    (selectedSector === "الكل" || client.sector === selectedSector)
  );

  // الحصول على التصاميم الخاصة بالعميل الحالي
  const getClientDesigns = (clientId?: number) => {
    if (!clientId) return designsData;
    return designsData.filter(design => design.clientId === clientId);
  };

  // الحصول على المنشورات الخاصة بالعميل الحالي
  const getClientPosts = (clientId?: number) => {
    if (!clientId) return postsData;
    return postsData.filter(post => post.clientId === clientId);
  };

  // تصفية التصاميم بناءً على البحث والفئة المحددة
  const filteredDesigns = getClientDesigns(clientId ? parseInt(clientId) : undefined).filter(design => 
    (design.title.includes(designSearchQuery) || 
    design.author.includes(designSearchQuery)) && 
    (selectedDesignCategory === "الكل" || design.category === selectedDesignCategory)
  );

  const handleDesignStatusChange = (id: number, newStatus: string) => {
    // في تطبيق حقيقي، سنقوم بتحديث حالة التصميم في قاعدة البيانات
    console.log("تحديث حالة التصميم:", id, newStatus);
    toast.success(`تم تحديث حالة التصميم ${id} إلى ${newStatus}`);
  };

  const handleAddDesign = () => {
    navigate("/add-design");
  };

  const handleFilterChange = (category: string) => {
    setSelectedDesignCategory(category);
    toast(`تم التصفية حسب: ${category}`);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "grid" ? "list" : "grid");
  };

  // عدد التصاميم حسب الحالة
  const getDesignCountByStatus = (status: string) => {
    return filteredDesigns.filter(d => d.category === status).length;
  };

  return (
    <div className="min-h-screen flex w-full" dir="rtl">
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        
        {/* Main content */}
        <main className="flex-1 bg-white">
          {/* Header */}
          <ClientsHeader />
          
          {/* Content */}
          <div className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full mb-6">
                <TabsTrigger value="clients" className="flex-1">العملاء</TabsTrigger>
                <TabsTrigger value="designs" className="flex-1">التصاميم</TabsTrigger>
                <TabsTrigger value="posts" className="flex-1">المنشورات</TabsTrigger>
              </TabsList>
              
              <TabsContent value="clients">
                <div className="mb-8">
                  <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold mb-4 md:mb-0">قائمة العملاء</h2>
                    
                    <div className="flex flex-col md:flex-row gap-4">
                      <ClientForm />
                    </div>
                  </div>
                  
                  <ClientsFilter 
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
                    selectedSector={selectedSector}
                    setSelectedSector={setSelectedSector}
                    activeTab="all"
                    setActiveTab={() => {}}
                  />
                  
                  <ClientsTable filteredClients={filteredClients} />
                </div>
              </TabsContent>
              
              <TabsContent value="designs">
                <div className="mb-8">
                  <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold mb-4 md:mb-0">
                      {clientId 
                        ? `تصاميم العميل: ${clientsData.find(c => c.id === parseInt(clientId))?.name || 'العميل'}`
                        : 'لوحة التصاميم'}
                    </h2>
                    
                    <div className="flex flex-col md:flex-row gap-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-2" 
                        onClick={toggleViewMode}
                      >
                        {viewMode === "grid" ? (
                          <>
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                              <path d="M1 1H14V3H1V1ZM1 4H14V6H1V4ZM1 7H14V9H1V7ZM1 10H14V12H1V10ZM1 13H14V15H1V13Z" fill="currentColor"></path>
                            </svg>
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
                        value={designSearchQuery}
                        onChange={(e) => setDesignSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {Object.entries(designStatuses).map(([status, details]) => (
                      <Card 
                        key={status} 
                        className={`${details.color} rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-md ${selectedDesignCategory === status ? `ring-2 ${details.borderColor}` : ''}`}
                        onClick={() => handleFilterChange(status)}
                      >
                        <CardContent className="p-6">
                          <div className="flex justify-between items-center">
                            <span className={`text-xl font-bold ${details.textColor}`}>{status}</span>
                            <span className="px-2 py-1 rounded-full bg-white">
                              {getDesignCountByStatus(status)}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="grid gap-6 grid-cols-1">
                    {viewMode === "list" ? (
                      filteredDesigns.length > 0 ? (
                        filteredDesigns.map(design => (
                          <DesignCard 
                            key={design.id} 
                            design={design} 
                            viewMode="list" 
                            onStatusChange={handleDesignStatusChange}
                          />
                        ))
                      ) : (
                        <div className="col-span-full text-center py-12">
                          <p className="text-gray-500 text-lg">لا توجد تصاميم متطابقة مع معايير البحث</p>
                          <Button 
                            variant="link" 
                            className="mt-4 text-green-600"
                            onClick={() => {
                              setDesignSearchQuery("");
                              setSelectedDesignCategory("الكل");
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
                            <DesignCard 
                              key={design.id} 
                              design={design} 
                              viewMode="grid" 
                              onStatusChange={handleDesignStatusChange}
                            />
                          ))
                        ) : (
                          <div className="col-span-full text-center py-12">
                            <p className="text-gray-500 text-lg">لا توجد تصاميم متطابقة مع معايير البحث</p>
                            <Button 
                              variant="link" 
                              className="mt-4 text-green-600"
                              onClick={() => {
                                setDesignSearchQuery("");
                                setSelectedDesignCategory("الكل");
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
              </TabsContent>
              
              <TabsContent value="posts">
                <div className="mb-8">
                  <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold mb-4 md:mb-0">
                      {clientId 
                        ? `منشورات العميل: ${clientsData.find(c => c.id === parseInt(clientId))?.name || 'العميل'}`
                        : 'لوحة المنشورات'}
                    </h2>
                    
                    <div className="flex flex-col md:flex-row gap-4">
                      <Button className="bg-green-600 hover:bg-green-700 gap-2" onClick={() => navigate("/add-post")}>
                        <span>إضافة منشور</span>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input 
                        className="pl-10 pr-4 py-2 w-full text-right" 
                        placeholder="ابحث عن منشور..." 
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {getClientPosts(clientId ? parseInt(clientId) : undefined).length > 0 ? (
                      getClientPosts(clientId ? parseInt(clientId) : undefined).map(post => (
                        <Card key={post.id} className="overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer">
                          <div className="h-48 relative overflow-hidden bg-gray-100">
                            <img 
                              src={post.image} 
                              alt={post.title} 
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                            <div className="absolute top-3 left-3">
                              <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                                post.status === "منشور" 
                                  ? "bg-green-500 text-white" 
                                  : post.status === "مجدول" 
                                    ? "bg-blue-500 text-white" 
                                    : "bg-gray-500 text-white"
                              }`}>
                                {post.status}
                              </span>
                            </div>
                            <div className="absolute top-3 right-3">
                              <span className="px-2 py-1 rounded-md text-xs font-medium bg-white shadow-sm">
                                {post.platform}
                              </span>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="mb-2">
                              <h3 className="text-lg font-semibold">{post.title}</h3>
                              <p className="text-sm text-gray-500">تاريخ النشر: {post.scheduledDate}</p>
                            </div>
                            <div className="flex justify-between border-t pt-3 mt-3">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                  <svg className="h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-3a5 5 0 100-10 5 5 0 000 10z" />
                                  </svg>
                                  <span className="text-sm">{post.likes}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <svg className="h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3 2a1 1 0 000 2h6a1 1 0 100-2H5zm0 4a1 1 0 000 2h3a1 1 0 100-2H5z" />
                                  </svg>
                                  <span className="text-sm">{post.comments}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M15 8a3 3 0 10-6 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
                                  </svg>
                                  <span className="text-sm">{post.shares}</span>
                                </div>
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-sm"
                                onClick={() => toast.info(`عرض تفاصيل المنشور: ${post.title}`)}
                              >
                                عرض
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))
                    ) : (
                      <div className="col-span-full text-center py-12">
                        <p className="text-gray-500 text-lg">لا توجد منشورات متاحة</p>
                        <Button 
                          variant="link" 
                          className="mt-4 text-green-600"
                          onClick={() => navigate("/add-post")}
                        >
                          إضافة منشور جديد
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default Clients;

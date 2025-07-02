
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, LayoutGrid, PencilRuler, Search, Settings, BarChart, Users, Home, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import PostCard from "@/components/PostCard";
import { usePosts } from "@/hooks/usePosts";
import { useClients } from "@/hooks/useClients";
import { useDesigns } from "@/hooks/useDesigns";
import { AppSidebar } from "@/components/shared/AppSidebar";

// Remove mock data - will use real data from hooks

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  const { posts, loading: postsLoading } = usePosts();
  const { clients, loading: clientsLoading } = useClients();
  const { designs, loading: designsLoading } = useDesigns();
  
  // تصفية المنشورات بناءً على البحث
  const filteredPosts = posts.filter(post => 
    post.title.includes(searchQuery) || 
    (post.clients?.name && post.clients.name.includes(searchQuery)) ||
    post.status?.includes(searchQuery)
  );

  // تجميع المنشورات حسب الحالة
  const statusGroups = {
    draft: filteredPosts.filter(post => post.status === 'draft').length,
    review: filteredPosts.filter(post => post.status === 'review').length,
    approved: filteredPosts.filter(post => post.status === 'approved').length,
    published: filteredPosts.filter(post => post.status === 'published').length,
  };

  const categories = {
    "مسودة": { count: statusGroups.draft, color: "bg-gray-100" },
    "قيد المراجعة": { count: statusGroups.review, color: "bg-yellow-100" },
    "معتمد": { count: statusGroups.approved, color: "bg-green-100" },
    "منشور": { count: statusGroups.published, color: "bg-blue-100" }
  };

  const handleAddPost = () => {
    navigate("/add-post");
  };
  
  const handleCalendarClick = () => {
    navigate("/calendar");
  };
  
  const handleDesignsClick = () => {
    navigate("/designs");
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
                    {clients.map(client => (
                      <option key={client.id} value={client.id}>{client.name}</option>
                    ))}
                  </select>
                  
                  <select 
                    className="bg-white border border-gray-300 rounded-md px-4 py-2"
                    onChange={() => toast.info("تم تغيير تصفية الحالة")}
                  >
                    <option>جميع الحالات</option>
                    <option value="approved">معتمد</option>
                    <option value="review">قيد المراجعة</option>
                    <option value="draft">مسودة</option>
                    <option value="published">منشور</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {Object.entries(categories).map(([category, details]) => (
                  <Card 
                    key={category} 
                    className={`${details.color} rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-all`}
                    onClick={() => toast.info(`تم النقر على فئة: ${category}`)}
                  >
                    <div className="p-5 flex justify-between items-center">
                      <div className="rounded-md px-2 py-1 bg-opacity-80" style={{ backgroundColor: category === "منشور" ? "#3b82f6" : category === "معتمد" ? "#22c55e" : category === "قيد المراجعة" ? "#eab308" : "#6b7280" }}>
                        <span className="text-white font-medium text-sm">{details.count}</span>
                      </div>
                      <h3 className="text-xl font-bold">{category}</h3>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              {postsLoading ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">جاري تحميل المنشورات...</p>
                </div>
              ) : filteredPosts.length > 0 ? (
                <div className="space-y-4">
                  {filteredPosts.map(post => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
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

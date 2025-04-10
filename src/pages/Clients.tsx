
import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { clientsData } from "@/data/clients-data";
import { AppSidebar } from "@/components/shared/AppSidebar";
import { ClientsHeader } from "@/components/clients/ClientsHeader";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { ClientsMainView } from "@/components/client/ClientsMainView";
import { ClientDetailView } from "@/components/client/ClientDetailView";
import { designsData, postsData } from "@/components/data/mockData";

const Clients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("الكل");
  const [selectedSector, setSelectedSector] = useState("الكل");
  const [activeTab, setActiveTab] = useState("clients");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const navigate = useNavigate();
  const { clientId } = useParams<{ clientId: string }>();
  const location = useLocation();

  // تحديد التبويب النشط بناءً على المسار
  useEffect(() => {
    if (location.pathname.includes('/designs')) {
      setActiveTab("designs");
    } else if (location.pathname.includes('/posts')) {
      setActiveTab("posts");
    } else if (location.pathname.includes('/calendar')) {
      setActiveTab("calendar");
    } else if (location.pathname.includes('/statistics')) {
      setActiveTab("statistics");
    } else if (clientId) {
      setActiveTab("clients");
    }
  }, [location.pathname, clientId]);

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

  const handleDesignStatusChange = (id: number, newStatus: string) => {
    // في تطبيق حقيقي، سنقوم بتحديث حالة التصميم في قاعدة البيانات
    console.log("تحديث حالة التصميم:", id, newStatus);
    toast.success(`تم تحديث حالة التصميم ${id} إلى ${newStatus}`);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "grid" ? "list" : "grid");
  };

  // الحصول على اسم العميل الحالي
  const currentClient = clientId ? clientsData.find(c => c.id === parseInt(clientId)) : null;
  
  // Handle tab changes for client detail view
  const handleClientDetailTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "clients") {
      navigate(`/clients/${clientId}`);
    } else if (tab === "designs") {
      navigate(`/clients/${clientId}/designs`);
    } else if (tab === "posts") {
      navigate(`/clients/${clientId}/posts`);
    } else if (tab === "calendar") {
      navigate(`/clients/${clientId}/calendar`);
    } else if (tab === "statistics") {
      navigate(`/clients/${clientId}/statistics`);
    }
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
            {clientId ? (
              <ClientDetailView 
                clientId={clientId}
                currentClient={currentClient}
                clientDesigns={getClientDesigns(currentClient?.id)}
                clientPosts={getClientPosts(currentClient?.id)}
                activeTab={activeTab}
                viewMode={viewMode}
                toggleViewMode={toggleViewMode}
                onTabChange={handleClientDetailTabChange}
                onDesignStatusChange={handleDesignStatusChange}
              />
            ) : (
              <ClientsMainView 
                clientsData={clientsData}
                designsData={designsData}
                postsData={postsData}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                selectedSector={selectedSector}
                setSelectedSector={setSelectedSector}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                viewMode={viewMode}
                toggleViewMode={toggleViewMode}
                onDesignStatusChange={handleDesignStatusChange}
              />
            )}
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default Clients;

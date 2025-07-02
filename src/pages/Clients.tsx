
import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/AppSidebar";
import { ClientsHeader } from "@/components/clients/ClientsHeader";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { ClientsMainView } from "@/components/client/ClientsMainView";
import { ClientDetailView } from "@/components/client/ClientDetailView";
import { useClients } from "@/hooks/useClients";
import { useDesignsData } from "@/hooks/useDesignsData";
import { usePosts } from "@/hooks/usePosts";

const Clients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("الكل");
  const [selectedSector, setSelectedSector] = useState("الكل");
  const [activeTab, setActiveTab] = useState("clients");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const navigate = useNavigate();
  const { clientId } = useParams<{ clientId: string }>();
  const location = useLocation();
  
  // استخدام الخطافات الجديدة للبيانات
  const { clients, loading: clientsLoading } = useClients();
  const { designs, loading: designsLoading, handleStatusChange } = useDesignsData();
  const { posts, loading: postsLoading } = usePosts();

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
  const getClientDesigns = (clientId?: string) => {
    if (!clientId) return designs;
    return designs.filter(design => design.client_id === clientId);
  };

  // الحصول على المنشورات الخاصة بالعميل الحالي
  const getClientPosts = (clientId?: string) => {
    if (!clientId) return posts;
    return posts.filter(post => post.client_id === clientId);
  };

  const handleDesignStatusChange = async (id: string, newStatus: string) => {
    await handleStatusChange(id, newStatus);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "grid" ? "list" : "grid");
  };

  // الحصول على اسم العميل الحالي
  const currentClient = clientId ? clients.find(c => c.id === clientId) : null;
  
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
                clientsData={clients}
                designsData={designs}
                postsData={posts}
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
                loading={clientsLoading || designsLoading || postsLoading}
              />
            )}
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default Clients;


import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ClientInfo } from "./ClientInfo";
import { ClientDesignsTab } from "./ClientDesignsTab";
import { ClientPostsTab } from "./ClientPostsTab";
import { ClientCalendar } from "./ClientCalendar";
import { ClientStatistics } from "./ClientStatistics";

interface ClientDetailViewProps {
  clientId: string;
  currentClient: any;
  clientDesigns: any[];
  clientPosts: any[];
  activeTab: string;
  viewMode: "grid" | "list";
  toggleViewMode: () => void;
  onTabChange: (tab: string) => void;
  onDesignStatusChange: (id: number, newStatus: string) => void;
}

export const ClientDetailView = ({
  clientId,
  currentClient,
  clientDesigns,
  clientPosts,
  activeTab,
  viewMode,
  toggleViewMode,
  onTabChange,
  onDesignStatusChange
}: ClientDetailViewProps) => {
  const navigate = useNavigate();
  
  const navigateToClients = () => {
    navigate("/clients");
  };

  return (
    <>
      <div className="mb-6 flex items-center">
        <Button 
          variant="ghost" 
          className="flex items-center gap-2 mb-2" 
          onClick={navigateToClients}
        >
          <ArrowRight className="h-4 w-4" />
          <span>العودة لقائمة العملاء</span>
        </Button>
        
        {currentClient && (
          <div className="flex flex-col mr-4 border-r pr-4">
            <h1 className="text-xl font-bold">{currentClient.name}</h1>
            <p className="text-sm text-gray-500">{currentClient.email}</p>
          </div>
        )}
      </div>
      
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="clients" className="flex-1">معلومات العميل</TabsTrigger>
          <TabsTrigger value="designs" className="flex-1">التصاميم</TabsTrigger>
          <TabsTrigger value="posts" className="flex-1">المنشورات</TabsTrigger>
          <TabsTrigger value="calendar" className="flex-1">التقويم</TabsTrigger>
          <TabsTrigger value="statistics" className="flex-1">الإحصائيات</TabsTrigger>
        </TabsList>
        
        <TabsContent value="clients">
          <ClientInfo currentClient={currentClient} />
        </TabsContent>
        
        <TabsContent value="designs">
          <ClientDesignsTab 
            clientName={currentClient?.name}
            designs={clientDesigns}
            viewMode={viewMode}
            toggleViewMode={toggleViewMode}
            onStatusChange={onDesignStatusChange}
          />
        </TabsContent>
        
        <TabsContent value="posts">
          <ClientPostsTab 
            clientName={currentClient?.name}
            posts={clientPosts}
          />
        </TabsContent>

        <TabsContent value="calendar">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <h2 className="text-2xl font-bold mb-4 md:mb-0">
                تقويم نشاطات {currentClient?.name}
              </h2>
            </div>
            
            {currentClient && (
              <ClientCalendar 
                clientId={currentClient.id} 
                postsData={clientPosts} 
                designsData={clientDesigns} 
              />
            )}
          </div>
        </TabsContent>

        <TabsContent value="statistics">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <h2 className="text-2xl font-bold mb-4 md:mb-0">
                إحصائيات {currentClient?.name}
              </h2>
            </div>
            
            {currentClient && (
              <ClientStatistics 
                clientId={currentClient.id} 
                postsData={clientPosts} 
                designsData={clientDesigns} 
              />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

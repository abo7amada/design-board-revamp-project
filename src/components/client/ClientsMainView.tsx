
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClientForm } from "@/components/clients/ClientForm";
import { ClientsFilter } from "@/components/clients/ClientsFilter";
import { ClientsTable } from "@/components/clients/ClientsTable";
import { ClientDesignsTab } from "./ClientDesignsTab";
import { ClientPostsTab } from "./ClientPostsTab";

interface ClientsMainViewProps {
  clientsData: any[];
  designsData: any[];
  postsData: any[];
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
  selectedSector: string;
  setSelectedSector: (value: string) => void;
  activeTab: string;
  setActiveTab: (value: string) => void;
  viewMode: "grid" | "list";
  toggleViewMode: () => void;
  onDesignStatusChange: (id: number, newStatus: string) => void;
}

export const ClientsMainView = ({
  clientsData,
  designsData,
  postsData,
  searchQuery,
  setSearchQuery,
  selectedStatus,
  setSelectedStatus,
  selectedSector,
  setSelectedSector,
  activeTab,
  setActiveTab,
  viewMode,
  toggleViewMode,
  onDesignStatusChange
}: ClientsMainViewProps) => {
  // Filter clients based on search, status, and sector
  const filteredClients = clientsData.filter(client => 
    (client.name.includes(searchQuery) || 
    client.email.includes(searchQuery) || 
    client.contact.includes(searchQuery)) && 
    (selectedStatus === "الكل" || client.status === selectedStatus) &&
    (selectedSector === "الكل" || client.sector === selectedSector)
  );

  return (
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
        <ClientDesignsTab 
          designs={designsData}
          viewMode={viewMode}
          toggleViewMode={toggleViewMode}
          onStatusChange={onDesignStatusChange}
        />
      </TabsContent>
      
      <TabsContent value="posts">
        <ClientPostsTab posts={postsData} />
      </TabsContent>
    </Tabs>
  );
};

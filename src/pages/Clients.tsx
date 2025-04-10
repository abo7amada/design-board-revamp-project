
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { clientsData } from "@/data/clients-data";
import { ClientsTable } from "@/components/clients/ClientsTable";
import { ClientForm } from "@/components/clients/ClientForm";
import { ClientsFilter } from "@/components/clients/ClientsFilter";
import { ClientsHeader } from "@/components/clients/ClientsHeader";
import { AppSidebar } from "@/components/shared/AppSidebar";

const Clients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("الكل");
  const [selectedSector, setSelectedSector] = useState("الكل");
  const [activeTab, setActiveTab] = useState("all");

  // تصفية العملاء بناءً على البحث والحالة والقطاع
  const filteredClients = clientsData.filter(client => 
    (client.name.includes(searchQuery) || 
    client.email.includes(searchQuery) || 
    client.contact.includes(searchQuery)) && 
    (selectedStatus === "الكل" || client.status === selectedStatus) &&
    (selectedSector === "الكل" || client.sector === selectedSector)
  );

  // تصفية العملاء حسب التبويب النشط
  const tabFilteredClients = activeTab === "all" 
    ? filteredClients 
    : activeTab === "active" 
      ? filteredClients.filter(client => client.status === "نشط")
      : filteredClients.filter(client => client.status !== "نشط");

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
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              
              <ClientsTable filteredClients={tabFilteredClients} />
            </div>
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default Clients;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import ClientCard from "@/components/ClientCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ClientsMainViewProps {
  clientsData: any[];
  designsData: any[];
  postsData: any[];
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  selectedStatus: string;
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>;
  selectedSector: string;
  setSelectedSector: React.Dispatch<React.SetStateAction<string>>;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
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
  const navigate = useNavigate();

  // Filter clients based on search, status, and sector
  const filteredClients = clientsData.filter(client => {
    const searchMatch = client.name.includes(searchQuery) || client.contactPerson.includes(searchQuery);
    const statusMatch = selectedStatus === "الكل" || client.status === selectedStatus;
    const sectorMatch = selectedSector === "الكل" || client.sector === selectedSector;
    return searchMatch && statusMatch && sectorMatch;
  });

  const handleAddClient = () => {
    navigate("/add-client");
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-2xl font-bold mb-4 md:mb-0">لوحة العملاء</h2>
        
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
          <Button className="bg-green-600 hover:bg-green-700 gap-2" onClick={handleAddClient}>
            <span>إضافة عميل</span>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            className="pl-10 pr-4 py-2 w-full text-right" 
            placeholder="ابحث عن عميل..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="جميع الحالات" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="الكل">جميع الحالات</SelectItem>
              <SelectItem value="نشط">نشط</SelectItem>
              <SelectItem value="غير نشط">غير نشط</SelectItem>
              <SelectItem value="قيد المراجعة">قيد المراجعة</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedSector} onValueChange={setSelectedSector}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="جميع القطاعات" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="الكل">جميع القطاعات</SelectItem>
              <SelectItem value="تجارة">تجارة</SelectItem>
              <SelectItem value="خدمات">خدمات</SelectItem>
              <SelectItem value="تقنية">تقنية</SelectItem>
              <SelectItem value="تعليم">تعليم</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid gap-6 grid-cols-1">
        {viewMode === "list" ? (
          filteredClients.length > 0 ? (
            filteredClients.map(client => (
              <ClientCard 
                key={client.id} 
                client={client} 
                viewMode="list"
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">لا يوجد عملاء متطابقين مع معايير البحث</p>
              <Button 
                variant="link" 
                className="mt-4 text-green-600"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedStatus("الكل");
                  setSelectedSector("الكل");
                }}
              >
                عرض جميع العملاء
              </Button>
            </div>
          )
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClients.length > 0 ? (
              filteredClients.map(client => (
                <ClientCard 
                  key={client.id} 
                  client={client} 
                  viewMode="grid"
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">لا يوجد عملاء متطابقين مع معايير البحث</p>
                <Button 
                  variant="link" 
                  className="mt-4 text-green-600"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedStatus("الكل");
                    setSelectedSector("الكل");
                  }}
                >
                  عرض جميع العملاء
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

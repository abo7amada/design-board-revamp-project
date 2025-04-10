
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ClientsFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  selectedSector: string;
  setSelectedSector: (sector: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const ClientsFilter = ({
  searchQuery,
  setSearchQuery,
  selectedStatus,
  setSelectedStatus,
  selectedSector,
  setSelectedSector,
  activeTab,
  setActiveTab
}: ClientsFilterProps) => {
  return (
    <>
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
          <Select value={selectedSector} onValueChange={setSelectedSector}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="كل القطاعات" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="الكل">كل القطاعات</SelectItem>
              <SelectItem value="تقنية المعلومات">تقنية المعلومات</SelectItem>
              <SelectItem value="التجارة الإلكترونية">التجارة الإلكترونية</SelectItem>
              <SelectItem value="الصناعة">الصناعة</SelectItem>
              <SelectItem value="الإعلام">الإعلام</SelectItem>
              <SelectItem value="العقارات">العقارات</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="كل الحالات" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="الكل">كل الحالات</SelectItem>
              <SelectItem value="نشط">نشط</SelectItem>
              <SelectItem value="غير نشط">غير نشط</SelectItem>
              <SelectItem value="متوقف">متوقف</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">جميع العملاء</TabsTrigger>
          <TabsTrigger value="active">العملاء النشطين</TabsTrigger>
          <TabsTrigger value="inactive">العملاء غير النشطين</TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
};

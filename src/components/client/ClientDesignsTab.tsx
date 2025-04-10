
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import DesignCard from "@/components/DesignCard";

// Design statuses with styling
const designStatuses = {
  "معتمد": { color: "bg-green-100", textColor: "text-green-800", borderColor: "border-green-500" },
  "قيد المراجعة": { color: "bg-yellow-100", textColor: "text-yellow-800", borderColor: "border-yellow-500" },
  "مسودة": { color: "bg-gray-100", textColor: "text-gray-800", borderColor: "border-gray-500" }
};

interface ClientDesignsTabProps {
  clientName?: string;
  designs: any[];
  viewMode: "grid" | "list";
  toggleViewMode: () => void;
  onStatusChange: (id: number, newStatus: string) => void;
}

export const ClientDesignsTab = ({ 
  clientName, 
  designs, 
  viewMode, 
  toggleViewMode, 
  onStatusChange 
}: ClientDesignsTabProps) => {
  const navigate = useNavigate();
  const [designSearchQuery, setDesignSearchQuery] = useState("");
  const [selectedDesignCategory, setSelectedDesignCategory] = useState("الكل");

  // Filter designs based on search and category
  const filteredDesigns = designs.filter(design => 
    (design.title.includes(designSearchQuery) || 
    design.author.includes(designSearchQuery)) && 
    (selectedDesignCategory === "الكل" || design.category === selectedDesignCategory)
  );

  // Count designs by status
  const getDesignCountByStatus = (status: string) => {
    return designs.filter(d => d.category === status).length;
  };

  const handleFilterChange = (category: string) => {
    setSelectedDesignCategory(category);
    toast(`تم التصفية حسب: ${category}`);
  };

  const handleAddDesign = () => {
    navigate("/add-design");
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-2xl font-bold mb-4 md:mb-0">
          {clientName ? `تصاميم ${clientName}` : "لوحة التصاميم"}
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
                onStatusChange={onStatusChange}
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
                  onStatusChange={onStatusChange}
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
  );
};

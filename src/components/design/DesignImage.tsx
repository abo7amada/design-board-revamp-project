
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface DesignImageProps {
  image: string;
  title: string;
  viewMode: "grid" | "list";
}

const DesignImage = ({ image, title, viewMode }: DesignImageProps) => {
  const [saved, setSaved] = useState(false);
  
  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSaved(!saved);
    toast(saved ? "تم إلغاء الحفظ" : "تم حفظ التصميم");
  };
  
  return (
    <div className={cn(
      viewMode === "grid" ? "w-full" : "w-1/3"
    )}>
      <div className={cn(
        "relative overflow-hidden bg-gray-100",
        viewMode === "grid" ? "h-48" : "h-full"
      )}>
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
        <div className="absolute top-3 left-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-sm" 
            onClick={handleSave}
          >
            <Bookmark className={cn("h-5 w-5", saved ? "fill-blue-600 text-blue-600" : "text-gray-600")} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DesignImage;

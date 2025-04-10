
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Eye, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface DesignFooterProps {
  likes: number;
  comments: number;
  category: string;
  onLike: (e: React.MouseEvent) => void;
  onComments: (e: React.MouseEvent) => void;
  onView: (e: React.MouseEvent) => void;
  onEdit: (e: React.MouseEvent) => void;
  onPublish: (e: React.MouseEvent) => void;
}

const DesignFooter = ({ 
  likes, 
  comments, 
  category,
  onLike,
  onComments,
  onView,
  onEdit,
  onPublish
}: DesignFooterProps) => {
  const [liked, setLiked] = useState(false);
  
  const handleLike = (e: React.MouseEvent) => {
    setLiked(!liked);
    onLike(e);
  };

  return (
    <div className="flex justify-between border-t border-gray-100">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn(
            "flex items-center gap-1 px-2", 
            liked ? "text-red-500" : "text-gray-500"
          )}
          onClick={handleLike}
        >
          <Heart className={cn("h-4 w-4", liked && "fill-red-500")} />
          <span>{liked ? likes + 1 : likes}</span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-1 px-2 text-gray-500" 
          onClick={onComments}
        >
          <MessageCircle className="h-4 w-4" />
          <span>{comments}</span>
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        {category === "معتمد" && (
          <Button 
            variant="outline" 
            size="sm" 
            className="text-sm bg-green-50" 
            onClick={onPublish}
          >
            نشر
          </Button>
        )}
        <Button 
          variant="outline" 
          size="sm" 
          className="text-sm flex items-center gap-1"
          onClick={onView}
        >
          <Eye className="h-3 w-3 ml-1" />
          عرض
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-sm bg-blue-50 text-blue-600 flex items-center gap-1" 
          onClick={onEdit}
        >
          <Pencil className="h-3 w-3 ml-1" />
          تعديل
        </Button>
      </div>
    </div>
  );
};

export default DesignFooter;

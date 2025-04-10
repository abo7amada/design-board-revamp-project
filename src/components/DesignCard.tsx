
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Heart, MessageCircle, MoreHorizontal, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Design {
  id: number;
  title: string;
  category: string;
  image: string;
  date: string;
  author: string;
  likes: number;
  comments: number;
}

interface DesignCardProps {
  design: Design;
  viewMode: "grid" | "list";
}

const DesignCard = ({ design, viewMode }: DesignCardProps) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-SA", { 
      month: "short", 
      day: "numeric",
      year: "numeric"
    });
  };
  
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-md",
      viewMode === "list" && "flex flex-row"
    )}>
      <div className={cn(
        viewMode === "grid" ? "w-full" : "w-1/3"
      )}>
        <div className={cn(
          "relative overflow-hidden bg-gray-100",
          viewMode === "grid" ? "h-48" : "h-full"
        )}>
          <img 
            src={design.image} 
            alt={design.title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-sm" 
              onClick={() => setSaved(!saved)}
            >
              <Bookmark className={cn("h-5 w-5", saved ? "fill-blue-600 text-blue-600" : "text-gray-600")} />
            </Button>
          </div>
        </div>
      </div>
      
      <div className={cn(
        "flex flex-col",
        viewMode === "grid" ? "w-full" : "w-2/3"
      )}>
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-blue-600">{design.category}</p>
              <h3 className="text-lg font-semibold mt-1 text-gray-800">{design.title}</h3>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-4 pt-0 pb-2 flex-grow">
          <p className="text-sm text-gray-500">تم الإنشاء بواسطة <span className="font-medium text-gray-700">{design.author}</span> في {formatDate(design.date)}</p>
        </CardContent>
        
        <CardFooter className="p-4 pt-2 flex justify-between border-t border-gray-100">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className={cn(
                "flex items-center gap-1 px-2", 
                liked ? "text-red-500" : "text-gray-500"
              )}
              onClick={() => setLiked(!liked)}
            >
              <Heart className={cn("h-4 w-4", liked && "fill-red-500")} />
              <span>{liked ? design.likes + 1 : design.likes}</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="flex items-center gap-1 px-2 text-gray-500">
              <MessageCircle className="h-4 w-4" />
              <span>{design.comments}</span>
            </Button>
          </div>
          
          <Button variant="outline" size="sm" className="text-sm">
            عرض
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default DesignCard;

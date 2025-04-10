
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Heart, MessageCircle, MoreHorizontal, Bookmark, Share2, Edit, Pencil, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import PublishDesignModal from "./PublishDesignModal";
import MessagePanel from "./chat/MessagePanel";

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
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isMessagePanelOpen, setIsMessagePanelOpen] = useState(false);
  const navigate = useNavigate();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-SA", { 
      month: "short", 
      day: "numeric",
      year: "numeric"
    });
  };
  
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
    toast(liked ? "تم إلغاء الإعجاب" : "تم الإعجاب بالتصميم");
  };
  
  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSaved(!saved);
    toast(saved ? "تم إلغاء الحفظ" : "تم حفظ التصميم");
  };
  
  const handleView = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("عرض التصميم:", design.title);
    toast.info(`عرض تفاصيل التصميم: ${design.title}`);
    
    // In a real app, we would navigate to the design detail page
    // For now, we'll simulate navigation by showing a toast
    toast.success(`تم الانتقال إلى صفحة عرض التصميم: ${design.title}`);
  };
  
  const handleMore = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  
  const handleComments = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMessagePanelOpen(true);
    toast.info(`فتح المحادثة حول التصميم: ${design.title}`);
  };
  
  const handleEditRequest = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMessagePanelOpen(true);
    setTimeout(() => {
      // Trigger the edit-request tab after the message panel opens
      const event = new CustomEvent('openEditRequestTab', { detail: { designId: design.id } });
      document.dispatchEvent(event);
    }, 100);
    toast.info(`إنشاء طلب تعديل للتصميم: ${design.title}`);
  };
  
  const handlePublish = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("فتح نافذة النشر للتصميم:", design.title);
    setIsPublishModalOpen(true);
  };
  
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Instead of just showing a toast, now we're opening the edit request panel
    handleEditRequest(e);
  };
  
  const handleStatusChange = (newStatus: string) => {
    console.log("تم تغيير حالة التصميم إلى:", newStatus);
    toast.success(`تم تغيير حالة التصميم إلى: ${newStatus}`);
  };
  
  const handleChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/chat`, { state: { designId: design.id, designTitle: design.title } });
    toast.success(`الانتقال إلى المحادثات حول التصميم: ${design.title}`);
  };
  
  // دالة لتحديد لون الفئة
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "معتمد":
        return "bg-green-500 text-white";
      case "قيد المراجعة":
        return "bg-yellow-500 text-white";
      case "مسودة":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };
  
  return (
    <>
      <Card 
        className={cn(
          "overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer",
          viewMode === "list" && "flex flex-row"
        )}
        onClick={(e) => {
          e.stopPropagation();
          handleView(e);
        }}
      >
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
                onClick={handleSave}
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <p className={`text-sm font-medium px-2 py-1 rounded-md cursor-pointer ${getCategoryColor(design.category)}`} onClick={(e) => e.stopPropagation()}>
                      {design.category}
                    </p>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40 bg-white">
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation();
                      handleStatusChange("معتمد");
                    }}>
                      <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                      معتمد
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation();
                      handleStatusChange("قيد المراجعة");
                    }}>
                      <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
                      قيد المراجعة
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation();
                      handleStatusChange("مسودة");
                    }}>
                      <span className="h-2 w-2 rounded-full bg-gray-500 mr-2"></span>
                      مسودة
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <h3 className="text-lg font-semibold mt-1 text-gray-800">{design.title}</h3>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500" onClick={handleMore}>
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white">
                  <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation();
                    handleEditRequest(e);
                  }}>
                    <Edit className="h-4 w-4 ml-2" />
                    طلب تعديل
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation();
                    toast.info("مشاركة التصميم");
                  }}>
                    <Share2 className="h-4 w-4 ml-2" />
                    مشاركة
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation();
                    handleChat(e);
                  }}>
                    <MessageCircle className="h-4 w-4 ml-2" />
                    محادثة
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          
          <CardContent className="p-4 pt-0 pb-2 flex-grow">
            <p className="text-sm text-gray-500">تم الإنشاء بواسطة <span className="font-medium text-gray-700 cursor-pointer hover:underline" onClick={(e) => {
              e.stopPropagation();
              toast.info(`عرض ملف المستخدم: ${design.author}`);
            }}>{design.author}</span> في {formatDate(design.date)}</p>
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
                onClick={handleLike}
              >
                <Heart className={cn("h-4 w-4", liked && "fill-red-500")} />
                <span>{liked ? design.likes + 1 : design.likes}</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-1 px-2 text-gray-500" 
                onClick={handleComments}
              >
                <MessageCircle className="h-4 w-4" />
                <span>{design.comments}</span>
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              {design.category === "معتمد" && (
                <Button variant="outline" size="sm" className="text-sm bg-green-50" onClick={handlePublish}>
                  نشر
                </Button>
              )}
              <Button 
                variant="outline" 
                size="sm" 
                className="text-sm flex items-center gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  handleView(e);
                }}
              >
                <Eye className="h-3 w-3 ml-1" />
                عرض
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-sm bg-blue-50 text-blue-600 flex items-center gap-1" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(e);
                }}
              >
                <Pencil className="h-3 w-3 ml-1" />
                تعديل
              </Button>
            </div>
          </CardFooter>
        </div>
      </Card>
      
      <PublishDesignModal 
        isOpen={isPublishModalOpen} 
        onClose={() => setIsPublishModalOpen(false)} 
        design={design}
      />
      
      <MessagePanel
        isOpen={isMessagePanelOpen}
        onClose={() => setIsMessagePanelOpen(false)}
        designId={design.id}
        designTitle={design.title}
      />
    </>
  );
};

export default DesignCard;

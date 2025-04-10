
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import PublishDesignModal from "./PublishDesignModal";
import MessagePanel from "./chat/MessagePanel";
import DesignImage from "./design/DesignImage";
import DesignHeader from "./design/DesignHeader";
import DesignContent from "./design/DesignContent";
import DesignFooter from "./design/DesignFooter";
import { Design, DesignCardProps } from "@/types/design";

const DesignCard = ({ design, viewMode, onStatusChange }: DesignCardProps) => {
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isMessagePanelOpen, setIsMessagePanelOpen] = useState(false);
  const [designCategory, setDesignCategory] = useState(design.category);
  const navigate = useNavigate();
  
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast("تم تغيير حالة الإعجاب");
  };
  
  const handleView = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("عرض التصميم:", design.title);
    toast.info(`عرض تفاصيل التصميم: ${design.title}`);
    
    // تنقل إلى صفحة تفاصيل التصميم
    navigate(`/design-details/${design.id}`, { 
      state: { 
        design: design 
      }
    });
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
    setDesignCategory(newStatus);
    if (onStatusChange) {
      onStatusChange(design.id, newStatus);
    }
    toast.success(`تم تغيير حالة التصميم إلى: ${newStatus}`);
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
        <DesignImage 
          image={design.image} 
          title={design.title} 
          viewMode={viewMode} 
        />
        
        <div className={cn(
          "flex flex-col",
          viewMode === "grid" ? "w-full" : "w-2/3"
        )}>
          <CardHeader className="p-4 pb-2">
            <DesignHeader 
              title={design.title}
              category={designCategory}
              author={design.author}
              date={design.date}
              designId={design.id}
              designTitle={design.title}
              onMore={handleMore}
              onStatusChange={handleStatusChange}
              onEditRequest={handleEditRequest}
            />
          </CardHeader>
          
          <CardContent className="p-4 pt-0 pb-2 flex-grow">
            <DesignContent 
              author={design.author} 
              date={design.date} 
            />
          </CardContent>
          
          <CardFooter className="p-4 pt-2">
            <DesignFooter 
              likes={design.likes}
              comments={design.comments}
              category={designCategory}
              onLike={handleLike}
              onComments={handleComments}
              onView={handleView}
              onEdit={handleEdit}
              onPublish={handlePublish}
            />
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

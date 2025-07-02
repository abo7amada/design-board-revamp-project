
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Edit, Share2, MessageCircle } from "lucide-react";

interface DesignHeaderProps {
  title: string;
  category: string;
  author: string;
  date: string;
  designId: string;
  designTitle: string;
  onMore: (e: React.MouseEvent) => void;
  onStatusChange: (newStatus: string) => void;
  onEditRequest: (e: React.MouseEvent) => void;
}

const DesignHeader = ({ 
  title, 
  category, 
  author, 
  date, 
  designId, 
  designTitle,
  onMore,
  onStatusChange,
  onEditRequest
}: DesignHeaderProps) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-SA", { 
      month: "short", 
      day: "numeric",
      year: "numeric"
    });
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

  const handleWhatsAppShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Create a more detailed share message with design information
    const designUrl = `${window.location.origin}/designs/${designId}`;
    const shareText = `مشاركة التصميم: ${designTitle}\nتم إنشاء التصميم بواسطة: ${author}\nفي تاريخ: ${formatDate(date)}\nرابط التصميم: ${designUrl}`;
    
    // Create a WhatsApp share URL
    // Format: https://wa.me/?text=encodedText
    const encodedText = encodeURIComponent(shareText);
    const whatsappUrl = `https://wa.me/?text=${encodedText}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    // Show success toast
    toast.success(`تم فتح واتساب لمشاركة التصميم "${designTitle}"`);
  };
  
  const handleChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/chat`, { state: { designId: designId, designTitle: designTitle } });
    toast.success(`الانتقال إلى المحادثات حول التصميم: ${designTitle}`);
  };

  return (
    <div className="flex justify-between items-start">
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <p className={`text-sm font-medium px-2 py-1 rounded-md cursor-pointer ${getCategoryColor(category)}`} onClick={(e) => e.stopPropagation()}>
              {category}
            </p>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40 bg-white">
            <DropdownMenuItem onClick={(e) => {
              e.stopPropagation();
              onStatusChange("معتمد");
            }}>
              <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
              معتمد
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => {
              e.stopPropagation();
              onStatusChange("قيد المراجعة");
            }}>
              <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
              قيد المراجعة
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => {
              e.stopPropagation();
              onStatusChange("مسودة");
            }}>
              <span className="h-2 w-2 rounded-full bg-gray-500 mr-2"></span>
              مسودة
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <h3 className="text-lg font-semibold mt-1 text-gray-800">{title}</h3>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500" onClick={onMore}>
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white">
          <DropdownMenuItem onClick={(e) => {
            e.stopPropagation();
            onEditRequest(e);
          }}>
            <Edit className="h-4 w-4 ml-2" />
            طلب تعديل
          </DropdownMenuItem>
          <DropdownMenuItem onClick={(e) => {
            e.stopPropagation();
            handleWhatsAppShare(e);
          }}>
            <Share2 className="h-4 w-4 ml-2" />
            مشاركة عبر واتساب
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
  );
};

export default DesignHeader;


import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Image, User, Share2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PostProps {
  post: {
    id: number;
    title: string;
    category?: string;
    image?: string;
    date: string;
    author: string;
    status: string;
    hasDesign?: boolean;
    scheduledDate?: string;
    platform?: string;
    likes?: number;
    comments?: number;
    shares?: number;
    clientId?: number;
    content?: string; // Added content property
  };
}

const PostCard = ({ post: initialPost }: PostProps) => {
  const [post, setPost] = useState(initialPost);
  const [isPublished, setIsPublished] = useState(post.status === "معتمد");
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "منشور":
        return "bg-purple-500 text-white";
      case "مجدول":
        return "bg-blue-500 text-white";
      case "مسودة":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "معتمد":
        return "bg-green-100 text-green-800 border border-green-300";
      case "قيد المراجعة":
        return "bg-yellow-100 text-yellow-800 border border-yellow-300";
      case "مسودة":
        return "bg-gray-200 text-gray-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const handleStatusChange = (newStatus: string) => {
    setPost(prev => ({ ...prev, status: newStatus }));
    toast.success(`تم تغيير حالة المنشور "${post.title}" إلى ${newStatus}`);
    
    // إذا تم تغيير الحالة إلى "معتمد"، نقوم بتحديث حالة النشر
    if (newStatus === "معتمد") {
      setIsPublished(true);
    } else if (isPublished) {
      setIsPublished(false);
    }
  };

  const handleCategoryClick = () => {
    toast.info(`تصفية حسب الفئة: ${post.category || post.status}`);
  };

  const handlePublishToggle = () => {
    setIsPublished(!isPublished);
    toast.success(isPublished ? "تم إلغاء النشر" : "تم النشر على جميع المنصات");
  };

  const handleWhatsAppShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Create a more detailed share message with post information
    const postUrl = `${window.location.origin}/posts/${post.id}`;
    const shareText = `مشاركة المنشور: ${post.title}\nتم إنشاء المنشور بواسطة: ${post.author}\nفي تاريخ: ${post.date}\nرابط المنشور: ${postUrl}`;
    
    // Create a WhatsApp share URL
    const encodedText = encodeURIComponent(shareText);
    const whatsappUrl = `https://wa.me/?text=${encodedText}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    // Show success toast
    toast.success(`تم فتح واتساب لمشاركة المنشور "${post.title}"`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all cursor-pointer" onClick={() => toast.info(`تم النقر على المنشور: ${post.title}`)}>
      <div className="flex flex-col md:flex-row border-b border-gray-100">
        {post.hasDesign && (
          <div className="md:w-1/4 lg:w-1/5 p-4">
            <div className="bg-gray-100 h-32 rounded-md flex items-center justify-center">
              <img 
                src={post.image || "/placeholder.svg"} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
        
        <div className={`p-4 ${post.hasDesign ? 'md:w-3/4 lg:w-4/5' : 'w-full'}`}>
          <div className="flex flex-wrap justify-between items-start mb-3">
            <div>
              <div className="flex items-center mb-2">
                <span 
                  className={`text-sm px-3 py-1 rounded-md ${getCategoryColor(post.category || post.status)} cursor-pointer`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCategoryClick();
                  }}
                >
                  {post.category || post.status}
                </span>
                {post.platform && (
                  <span className="text-sm px-3 py-1 rounded-md bg-white shadow-sm ml-2">
                    {post.platform}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-semibold">{post.title}</h3>
            </div>
            
            <div onClick={(e) => e.stopPropagation()}>
              <Select 
                value={post.status}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger className={`text-sm min-w-[120px] rounded-md ${getStatusColor(post.status)}`}>
                  <SelectValue placeholder="اختر الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="معتمد">معتمد</SelectItem>
                  <SelectItem value="قيد المراجعة">قيد المراجعة</SelectItem>
                  <SelectItem value="مسودة">مسودة</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{post.scheduledDate || post.date}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            
            {!post.hasDesign && !post.image && (
              <div className="flex items-center gap-1">
                <Image className="h-4 w-4" />
                <span>لا يوجد تصميم</span>
              </div>
            )}
          </div>
          
          {(post.category === "منشور" || post.status === "معتمد") && (
            <div className="mt-4 flex justify-between">
              <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
                <input 
                  type="checkbox" 
                  id={`publish-${post.id}`} 
                  className="mr-2"
                  checked={isPublished}
                  onChange={handlePublishToggle}
                />
                <label 
                  htmlFor={`publish-${post.id}`} 
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  تم النشر على جميع المنصات
                </label>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center gap-1 text-gray-600" 
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Share2 className="h-4 w-4" />
                    <span>مشاركة</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleWhatsAppShare}>
                    مشاركة عبر واتساب
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
          
          {post.likes !== undefined && (
            <div className="flex justify-between border-t pt-3 mt-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <svg className="h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-3a5 5 0 100-10 5 5 0 000 10z" />
                  </svg>
                  <span className="text-sm">{post.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3 2a1 1 0 000 2h6a1 1 0 100-2H5zm0 4a1 1 0 000 2h3a1 1 0 100-2H5z" />
                  </svg>
                  <span className="text-sm">{post.comments}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M15 8a3 3 0 10-6 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
                  </svg>
                  <span className="text-sm">{post.shares}</span>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  toast.info(`عرض تفاصيل المنشور: ${post.title}`);
                }}
              >
                عرض
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default PostCard;

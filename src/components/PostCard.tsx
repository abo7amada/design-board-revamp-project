
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Image, User } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface PostProps {
  post: {
    id: number;
    title: string;
    category: string;
    image?: string;
    date: string;
    author: string;
    status: string;
    hasDesign: boolean;
  };
}

const PostCard = ({ post }: PostProps) => {
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

  const handleStatusClick = () => {
    toast.info(`عرض تفاصيل حالة المنشور: ${post.status}`);
  };

  const handleCategoryClick = () => {
    toast.info(`تصفية حسب الفئة: ${post.category}`);
  };

  const handlePublishToggle = () => {
    setIsPublished(!isPublished);
    toast.success(isPublished ? "تم إلغاء النشر" : "تم النشر على جميع المنصات");
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
                  className={`text-sm px-3 py-1 rounded-md ${getCategoryColor(post.category)} cursor-pointer`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCategoryClick();
                  }}
                >
                  {post.category}
                </span>
              </div>
              <h3 className="text-xl font-semibold">{post.title}</h3>
            </div>
            
            <div>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`text-sm rounded-md ${getStatusColor(post.status)}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleStatusClick();
                }}
              >
                {post.status}
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            
            {!post.hasDesign && (
              <div className="flex items-center gap-1">
                <Image className="h-4 w-4" />
                <span>لا يوجد تصميم</span>
              </div>
            )}
          </div>
          
          {post.category === "منشور" && post.status === "معتمد" && (
            <div className="mt-4 flex items-center">
              <input 
                type="checkbox" 
                id={`publish-${post.id}`} 
                className="mr-2"
                checked={isPublished}
                onChange={(e) => {
                  e.stopPropagation();
                  handlePublishToggle();
                }}
              />
              <label 
                htmlFor={`publish-${post.id}`} 
                className="text-sm text-gray-600 cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                تم النشر على جميع المنصات
              </label>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default PostCard;

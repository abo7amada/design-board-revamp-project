import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Edit, Trash2, Share, Eye } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Post } from "@/hooks/usePosts";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'review':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'published':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string | null) => {
    switch (status) {
      case 'draft':
        return 'مسودة';
      case 'review':
        return 'قيد المراجعة';
      case 'approved':
        return 'معتمد';
      case 'published':
        return 'منشور';
      default:
        return 'غير محدد';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
            
            <div className="flex items-center gap-3 mb-3">
              <Badge className={getStatusColor(post.status)}>
                {getStatusText(post.status)}
              </Badge>
              
              {post.clients && (
                <span className="text-sm text-gray-600">
                  العميل: {post.clients.name}
                </span>
              )}
              
              {post.designs && (
                <span className="text-sm text-gray-600">
                  التصميم: {post.designs.title}
                </span>
              )}
            </div>
            
            {post.content && (
              <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                {post.content}
              </p>
            )}
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>تاريخ الإنشاء: {formatDate(post.created_at)}</span>
              
              {post.scheduled_at && (
                <span>مجدول للنشر: {formatDate(post.scheduled_at)}</span>
              )}
              
              {post.platforms && post.platforms.length > 0 && (
                <span>المنصات: {post.platforms.join(', ')}</span>
              )}
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => toast.info("سيتم فتح صفحة عرض المنشور")}>
                <Eye className="h-4 w-4 mr-2" />
                عرض
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.info("سيتم فتح صفحة تحرير المنشور")}>
                <Edit className="h-4 w-4 mr-2" />
                تحرير
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.info("سيتم فتح نافذة المشاركة")}>
                <Share className="h-4 w-4 mr-2" />
                مشاركة
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => toast.info("سيتم حذف المنشور")}
                className="text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                حذف
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {post.designs?.image_url && (
          <div className="mt-4">
            <img 
              src={post.designs.image_url} 
              alt={post.designs.title}
              className="w-full h-48 object-cover rounded-md"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PostCard;
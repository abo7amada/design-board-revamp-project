
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PostCard from "@/components/PostCard";

interface ClientPostsTabProps {
  clientName?: string;
  posts: any[];
}

export const ClientPostsTab = ({ clientName, posts }: ClientPostsTabProps) => {
  const navigate = useNavigate();
  const [postSearchQuery, setPostSearchQuery] = useState("");
  const [selectedPostCategory, setSelectedPostCategory] = useState("الكل");
  
  // Filter posts based on search and category
  const filteredPosts = posts.filter(post => 
    (post.title.includes(postSearchQuery) || 
    post.author.includes(postSearchQuery)) && 
    (selectedPostCategory === "الكل" || post.status === selectedPostCategory)
  );

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-2xl font-bold mb-4 md:mb-0">
          {clientName ? `منشورات ${clientName}` : "لوحة المنشورات"}
        </h2>
        
        <div className="flex flex-col md:flex-row gap-4">
          <Button className="bg-green-600 hover:bg-green-700 gap-2" onClick={() => navigate("/add-post")}>
            <span>إضافة منشور</span>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            className="pl-10 pr-4 py-2 w-full text-right" 
            placeholder="ابحث عن منشور..." 
            value={postSearchQuery}
            onChange={(e) => setPostSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">لا توجد منشورات متاحة</p>
            <Button 
              variant="link" 
              className="mt-4 text-green-600"
              onClick={() => navigate("/add-post")}
            >
              إضافة منشور جديد
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

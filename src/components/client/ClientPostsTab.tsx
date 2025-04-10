
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PostCard from "@/components/PostCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { SocialPlatformPreview } from "@/components/social/SocialPlatformPreview";

interface ClientPostsTabProps {
  clientName?: string;
  posts: any[];
}

export const ClientPostsTab = ({ clientName, posts }: ClientPostsTabProps) => {
  const navigate = useNavigate();
  const [postSearchQuery, setPostSearchQuery] = useState("");
  const [selectedPostCategory, setSelectedPostCategory] = useState("الكل");
  const [socialPreviewOpen, setSocialPreviewOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  
  // Filter posts based on search and category
  const filteredPosts = posts.filter(post => 
    (post.title.includes(postSearchQuery) || 
    post.author.includes(postSearchQuery)) && 
    (selectedPostCategory === "الكل" || post.status === selectedPostCategory)
  );

  const handleOpenSocialPreview = (platform: string) => {
    setSelectedPlatform(platform);
    setSocialPreviewOpen(true);
  };

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
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="text-blue-600 hover:bg-blue-50 border-blue-200"
              onClick={() => handleOpenSocialPreview("facebook")}
            >
              <svg className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
              </svg>
              فيسبوك
            </Button>
            <Button 
              variant="outline" 
              className="text-pink-600 hover:bg-pink-50 border-pink-200"
              onClick={() => handleOpenSocialPreview("instagram")}
            >
              <svg className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.247-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.247 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.181-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.055-.059 1.37-.059 4.04 0 2.67.01 2.986.059 4.04.045.976.207 1.505.344 1.858.181.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.047 1.37.059 4.04.059 2.67 0 2.987-.01 4.04-.059.976-.045 1.505-.207 1.858-.344.466-.181.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.047-1.055.059-1.37.059-4.04 0-2.67-.01-2.986-.059-4.04-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.055-.047-1.37-.059-4.04-.059zm0 3.064A5.139 5.139 0 0017.134 12 5.139 5.139 0 0012 17.134 5.139 5.139 0 006.866 12 5.139 5.139 0 0012 6.866zm0 8.468A3.334 3.334 0 118.666 12 3.334 3.334 0 0112 15.334zm6.538-8.469a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" />
              </svg>
              انستغرام
            </Button>
            <Button 
              variant="outline" 
              className="text-blue-400 hover:bg-blue-50 border-blue-200"
              onClick={() => handleOpenSocialPreview("twitter")}
            >
              <svg className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
              تويتر
            </Button>
          </div>
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

      <Dialog open={socialPreviewOpen} onOpenChange={setSocialPreviewOpen}>
        <DialogContent className="max-w-4xl" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {selectedPlatform === "facebook" && "صفحة الفيسبوك"}
              {selectedPlatform === "instagram" && "صفحة الانستغرام"}
              {selectedPlatform === "twitter" && "صفحة تويتر"}
            </DialogTitle>
            <DialogDescription>
              عرض ونشر المحتوى مباشرة على منصة {selectedPlatform === "facebook" ? "فيسبوك" : selectedPlatform === "instagram" ? "انستغرام" : "تويتر"}
            </DialogDescription>
          </DialogHeader>

          <SocialPlatformPreview platform={selectedPlatform} clientName={clientName} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

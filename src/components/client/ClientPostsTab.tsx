
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
          <div className="flex flex-wrap gap-2">
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
                <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.247-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.247 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.181-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.055-.059 1.37-.059 4.04 0 2.67.01 2.986.059 4.04.045.976.207 1.505.344 1.858.181.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.047 1.37.059 4.04.059 2.67 0 2.987-.01 4.04-.059.976-.045 1.505-.207 1.858-.344.466-.181.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.047-1.055.059-1.37.059-4.04 0-2.67-.01-2.986-.059-4.04-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.055-.047-1.37-.059-4.04-.059zm0 3.064A5.139 5.139 0 0117.134 12 5.139 5.139 0 0112 17.134 5.139 5.139 0 016.866 12 5.139 5.139 0 0112 6.866zm0 8.468A3.334 3.334 0 118.666 12 3.334 3.334 0 0112 15.334zm6.538-8.469a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" />
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
            <Button 
              variant="outline" 
              className="text-black hover:bg-gray-50 border-gray-200"
              onClick={() => handleOpenSocialPreview("tiktok")}
            >
              <svg className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.321 5.562a5.122 5.122 0 01-.443-.258 6.228 6.228 0 01-1.137-.92c-1.409-1.4-1.363-3.345-1.35-3.623L16.38.75h-3.126v14.287c0 1.323-.952 2.415-2.254 2.601-1.59.228-2.947-.896-2.947-2.394 0-1.32 1.09-2.417 2.43-2.417.265 0 .52.04.76.116v-3.19a6.077 6.077 0 00-3.65 1.073c-1.942 1.29-2.985 3.8-2.483 6.346.572 2.887 3.016 4.993 5.902 5.076 3.256.094 5.98-2.53 5.98-5.719V9.406c1.622 1.12 3.575 1.802 5.657 1.802V8.055c-.985 0-2.836-.732-3.327-2.493" />
              </svg>
              تيك توك
            </Button>
            <Button 
              variant="outline" 
              className="text-yellow-400 hover:bg-yellow-50 border-yellow-200"
              onClick={() => handleOpenSocialPreview("snapchat")}
            >
              <svg className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.206 1c.119 0 .774.019 1.197.019.922 0 2.1-.075 3.327.595 1.016.55 1.8 1.541 2.268 2.938.361 1.084.343 2.124.343 3.293 0 .144-.012.289-.012.444.012.087.099.519.593.816.313.193.677.271 1.016.271.439 0 .877-.167 1.214-.382v.666c-.175.139-.49.354-.958.485-.3.083-.663.16-1.098.16-.462 0-.964-.073-1.435-.319-.91-.479-1.615-1.444-1.993-2.808-.115-.41-.14-.834-.14-1.068 0-.167.012-.319.012-.444 0-1.73-.011-3.856-2.519-3.831-.211 0-.44.020-.663.020-.222 0-.452-.016-.663-.016-.517 0-1.031.065-1.388.176C9.125 2.951 7.787 4.646 7.787 7.448c0 .39.025.785.074 1.175-.182.031-.388.062-.6.062-.365 0-.731-.062-1.047-.185-.325-.129-.638-.308-.9-.535v.741a4.87 4.87 0 001.534.764c.318.087.65.128 1.047.128.175 0 .351-.012.517-.034.329.822.964 1.454 1.847 1.847.829.37 1.85.535 3.077.535.06 0 .113-.004.175-.004.761 0 2.436.066.61.087a.858.858 0 01.77.572c.05.154.037.337.025.515-.084 1.166-2.11 1.722-2.642 1.845-.139.034-.54.124-.554.35-.008.175-.008.347.112.531.271.401 1.206.859 2.969.859.886 0 1.771-.113 2.642-.344 1.147-.296 2.147-.82 2.969-1.555v.7c-1.016 1.138-2.383 1.58-3.531 1.889-.775.205-1.572.314-2.396.314-2.295 0-3.782-.672-4.558-1.21a2.221 2.221 0 01-.774-.928c-.107-.286-.132-.592-.083-.887a.58.58 0 01.013-.033c.38-1.483 2.235-1.821 2.972-1.97.088-.016.171-.034.255-.05.562-.111.75-.258.764-.319.025-.103.037-.23.05-.356.025-.388-.19-.775-.513-.941-.3-.158-.624-.193-.996-.219-.11-.012-.221-.018-.325-.018-1.098 0-1.881.12-2.532.385-1.032.422-1.553 1.136-1.665 1.32-.05.087-.075.173-.075.268a.372.372 0 00.175.305.56.56 0 00.367.116c.211 0 .451-.087.451-.087l.025.05s-.137.294-.137.6c0 .074 0 .15.012.217.075.388.289.684.652.9.578.337 1.565.53 2.928.53 1.377 0 2.507-.243 3.372-.734l.013-.01c.649-.367 1.009-.853 1.071-1.427.05-.519-.189-.943-.34-1.141-.325-.443-.812-.542-1.201-.585-.187-.02-.436-.02-.677-.02-1.047 0-1.7-.063-2.047-.099-1.098-.116-1.184-.294-1.209-.393-.025-.13-.025-.26-.025-.39 0-1.233.025-2.593-.688-3.637C12.72 4.7 11.648 4.233 10.575 4.233h-.037c-1.073 0-2.146.466-2.93 1.32-.713 1.044-.688 2.404-.688 3.637 0 .13 0 .26-.025.39-.025.098-.111.277-1.21.393-.346.036-1 .099-2.046.099-.242 0-.49 0-.677.02-.39.043-.876.141-1.202.585-.15.198-.39.622-.34 1.141.063.574.423 1.06 1.072 1.427l.013.01c.864.491 1.994.734 3.371.734 1.364 0 2.351-.193 2.93-.53.363-.216.577-.512.651-.9a1.25 1.25 0 00.013-.218c0-.305-.138-.6-.138-.6l.026-.05s.24.087.45.087a.567.567 0 00.369-.116.372.372 0 00.174-.305c0-.095-.025-.18-.075-.268-.112-.184-.632-.898-1.664-1.32-.651-.266-1.435-.385-2.532-.385-.105 0-.215.006-.326.018a6.77 6.77 0 00-.995.219c-.321.166-.538.553-.513.941.12.127.025.254.05.356.013.06.202.208.764.32.084.015.167.033.255.05.737.148 2.592.486 2.97 1.969a.577.577 0 01.14.033c.05.295.024.6-.083.887-.152.39-.431.715-.775.928-.776.538-2.263 1.21-4.558 1.21-.824 0-1.622-.109-2.396-.314-1.147-.31-2.514-.751-3.53-1.889v-.7c.822.736 1.821 1.259 2.969 1.555.87.231 1.756.344 2.642.344 1.763 0 2.698-.458 2.969-.86.119-.184.119-.355.112-.53-.014-.225-.415-.316-.555-.35-.53-.123-2.558-.679-2.642-1.845-.013-.177-.025-.36.025-.515a.858.858 0 01.77-.572 596.51 596.51 0 01.609-.087c.063 0 .115.004.176.004 1.226 0 2.248-.165 3.077-.535.883-.393 1.518-1.025 1.847-1.847.166.022.343.034.517.034.396 0 .73-.04 1.047-.128a4.87 4.87 0 001.535-.764v-.74c-.264.226-.575.405-.901.534-.316.123-.682.185-1.047.185-.212 0-.418-.031-.6-.062a9.49 9.49 0 00.075-1.175c0-2.802-1.338-4.497-4.095-5.534-.357-.11-.87-.175-1.388-.175-.211 0-.44.015-.663.015-.224 0-.452-.019-.661-.019-2.509-.025-2.521 2.1-2.521 3.83 0 .126.013.278.013.445 0 .234-.025.659-.139 1.068-.378 1.363-1.083 2.329-1.993 2.808-.471.246-.974.32-1.436.32-.435 0-.798-.078-1.097-.161-.468-.131-.782-.346-.959-.485v-.667c.338.215.775.383 1.215.383.34 0 .702-.078 1.016-.271.493-.298.58-.729.593-.817 0-.155-.013-.3-.013-.443 0-1.17-.018-2.21.343-3.294.468-1.397 1.252-2.388 2.268-2.938 1.228-.67 2.405-.595 3.327-.595.423 0 1.078-.019 1.198-.019" />
              </svg>
              سناب شات
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
              {selectedPlatform === "tiktok" && "صفحة تيك توك"}
              {selectedPlatform === "snapchat" && "صفحة سناب شات"}
            </DialogTitle>
            <DialogDescription>
              عرض ونشر المحتوى مباشرة على منصة {
                selectedPlatform === "facebook" ? "فيسبوك" : 
                selectedPlatform === "instagram" ? "انستغرام" : 
                selectedPlatform === "twitter" ? "تويتر" : 
                selectedPlatform === "tiktok" ? "تيك توك" : "سناب شات"
              }
            </DialogDescription>
          </DialogHeader>

          <SocialPlatformPreview platform={selectedPlatform} clientName={clientName} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

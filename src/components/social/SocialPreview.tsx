
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Eye, Share2 } from "lucide-react";
import { toast } from "sonner";

interface SocialPreviewProps {
  post: {
    title: string;
    content: string;
    image?: string;
  };
}

export const SocialPreview = ({ post }: SocialPreviewProps) => {
  const [activeTab, setActiveTab] = useState<string>("facebook");

  const handleShare = () => {
    toast.success(`تم جدولة النشر على ${getPlatformName(activeTab)}`);
  };

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case "facebook": return "فيسبوك";
      case "instagram": return "إنستجرام";
      case "twitter": return "تويتر";
      case "linkedin": return "لينكد إن";
      default: return platform;
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Eye className="h-5 w-5 text-green-600" />
          <span>معاينة المنشور</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs defaultValue="facebook" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="facebook">فيسبوك</TabsTrigger>
            <TabsTrigger value="instagram">إنستجرام</TabsTrigger>
            <TabsTrigger value="twitter">تويتر</TabsTrigger>
            <TabsTrigger value="linkedin">لينكد إن</TabsTrigger>
          </TabsList>
          
          <TabsContent value="facebook" className="mt-0">
            <div className="border rounded-md overflow-hidden bg-white">
              <div className="p-3 border-b flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  ك
                </div>
                <div>
                  <p className="font-semibold">كانفاس التواصل</p>
                  <p className="text-xs text-gray-500">الآن</p>
                </div>
              </div>
              <div className="p-3">
                <p className="mb-3 whitespace-pre-line">{post.content}</p>
                {post.image && (
                  <div className="aspect-video rounded-md overflow-hidden bg-gray-100">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              <div className="flex border-t p-2 gap-2 text-sm">
                <div className="flex-1 text-center py-1 hover:bg-gray-100 rounded">أعجبني</div>
                <div className="flex-1 text-center py-1 hover:bg-gray-100 rounded">تعليق</div>
                <div className="flex-1 text-center py-1 hover:bg-gray-100 rounded">مشاركة</div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="instagram" className="mt-0">
            <div className="border rounded-md overflow-hidden bg-white">
              <div className="p-3 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-gradient-to-tr from-yellow-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                    ك
                  </div>
                  <p className="font-semibold">canvas_design</p>
                </div>
                <div className="text-gray-500">•••</div>
              </div>
              {post.image && (
                <div className="aspect-square bg-gray-100">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-3">
                <div className="flex gap-4 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </div>
                <p className="text-sm">
                  <span className="font-semibold">canvas_design</span> {post.content}
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="twitter" className="mt-0">
            <div className="border rounded-md overflow-hidden bg-white p-4">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold">
                  ك
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <p className="font-semibold">كانفاس التواصل</p>
                    <p className="text-gray-500">@canvas_design • الآن</p>
                  </div>
                  <p className="mt-1 mb-3 whitespace-pre-line">{post.content.substring(0, 280)}</p>
                  {post.image && (
                    <div className="rounded-md overflow-hidden bg-gray-100 mb-3">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex justify-between text-gray-500 text-sm mt-2">
                    <div>💬 0</div>
                    <div>🔄 0</div>
                    <div>❤️ 0</div>
                    <div>📊 0</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="linkedin" className="mt-0">
            <div className="border rounded-md overflow-hidden bg-white">
              <div className="p-3 border-b flex items-center gap-3">
                <div className="h-12 w-12 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold">
                  ك
                </div>
                <div>
                  <p className="font-semibold">كانفاس التواصل</p>
                  <p className="text-xs text-gray-500">مؤسسة تصميم • الآن</p>
                </div>
              </div>
              <div className="p-3">
                <p className="mb-3 whitespace-pre-line">{post.content}</p>
                {post.image && (
                  <div className="rounded-md overflow-hidden bg-gray-100">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              <div className="flex border-t p-2 gap-2 text-sm justify-center">
                <div className="px-4 py-1 hover:bg-gray-100 rounded flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  <span>أعجبني</span>
                </div>
                <div className="px-4 py-1 hover:bg-gray-100 rounded flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <span>تعليق</span>
                </div>
                <div className="px-4 py-1 hover:bg-gray-100 rounded flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  <span>مشاركة</span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <div className="mt-4 flex justify-end">
            <Button 
              className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
              <span>جدولة النشر على {getPlatformName(activeTab)}</span>
            </Button>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

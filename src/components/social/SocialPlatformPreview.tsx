
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { CardContent, Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { postsData } from "@/components/data/mockData";
import { Send, Image, Smile, Calendar, X, Check } from "lucide-react";

interface SocialPlatformPreviewProps {
  platform: string | null;
  clientName?: string;
}

export const SocialPlatformPreview = ({ platform, clientName }: SocialPlatformPreviewProps) => {
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState(postsData.filter(p => p.platform === platform));
  const [tab, setTab] = useState("feed");
  
  const handlePost = () => {
    if (!newPost.trim()) {
      toast.error("الرجاء كتابة محتوى المنشور");
      return;
    }
    
    // في التطبيق الحقيقي، هنا سيتم إرسال البيانات إلى API المنصة
    toast.success("تم نشر المحتوى بنجاح على " + getPlatformName());
    
    // إضافة المنشور الجديد محليًا
    const newPostObj = {
      id: Date.now(),
      title: newPost.substring(0, 30) + (newPost.length > 30 ? "..." : ""),
      status: "منشور",
      platform: platform || "facebook",
      scheduledDate: new Date().toISOString().split('T')[0],
      image: null,
      likes: 0,
      comments: 0,
      shares: 0,
      clientId: 1,
      date: new Date().toISOString().split('T')[0],
      author: clientName || "العميل",
      hasDesign: false,
      content: newPost
    };
    
    setPosts([newPostObj, ...posts]);
    setNewPost("");
  };
  
  const handleSchedulePost = () => {
    if (!newPost.trim()) {
      toast.error("الرجاء كتابة محتوى المنشور");
      return;
    }
    
    toast.success("تم جدولة المنشور بنجاح");
    setNewPost("");
  };
  
  const getPlatformName = (): string => {
    switch (platform) {
      case "facebook": return "فيسبوك";
      case "instagram": return "انستغرام";
      case "twitter": return "تويتر";
      default: return "المنصة";
    }
  };
  
  const getPlatformHeader = () => {
    switch (platform) {
      case "facebook":
        return (
          <div className="bg-blue-600 text-white p-4 rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-full p-1">
                <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">{clientName || "صفحة العميل"}</h3>
                <p className="text-sm opacity-90">صفحة فيسبوك الرسمية</p>
              </div>
            </div>
          </div>
        );
      case "instagram":
        return (
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-full p-1">
                <svg className="h-6 w-6 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.247-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.247 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.181-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.055-.059 1.37-.059 4.04 0 2.67.01 2.986.059 4.04.045.976.207 1.505.344 1.858.181.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.047 1.37.059 4.04.059 2.67 0 2.987-.01 4.04-.059.976-.045 1.505-.207 1.858-.344.466-.181.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.047-1.055.059-1.37.059-4.04 0-2.67-.01-2.986-.059-4.04-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.055-.047-1.37-.059-4.04-.059z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">{clientName || "حساب العميل"}</h3>
                <p className="text-sm opacity-90">Instagram Official</p>
              </div>
            </div>
          </div>
        );
      case "twitter":
        return (
          <div className="bg-blue-400 text-white p-4 rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-full p-1">
                <svg className="h-6 w-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">{clientName || "حساب العميل"}</h3>
                <p className="text-sm opacity-90">@client_official</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="h-[70vh] flex flex-col">
      <Tabs value={tab} onValueChange={setTab} className="flex-1 flex flex-col">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="feed">آخر المنشورات</TabsTrigger>
          <TabsTrigger value="compose">إنشاء منشور جديد</TabsTrigger>
          <TabsTrigger value="schedule">المنشورات المجدولة</TabsTrigger>
        </TabsList>
        
        <TabsContent value="feed" className="flex-1 overflow-y-auto border rounded-lg">
          <Card className="h-full flex flex-col border-0 shadow-none">
            {getPlatformHeader()}
            
            <CardContent className="p-0 flex-1 overflow-y-auto">
              {posts.length > 0 ? (
                <div className="divide-y">
                  {posts.map((post) => (
                    <div key={post.id} className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-gray-200 h-10 w-10 flex items-center justify-center overflow-hidden">
                          {post.author.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h4 className="font-bold">{post.author}</h4>
                              <p className="text-sm text-gray-500">{post.date}</p>
                            </div>
                            {post.id % 2 === 0 && (
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          <p className="mt-2">{post.content || post.title}</p>
                          {post.hasDesign && post.image && (
                            <div className="mt-2 bg-gray-100 rounded-md h-48 overflow-hidden">
                              <img 
                                src={post.image} 
                                alt={post.title} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex gap-4 mt-3 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14Z" />
                              </svg>
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
                              </svg>
                              <span>{post.comments}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M7 11 12 6l5 5" />
                                <path d="M12 6v12" />
                              </svg>
                              <span>{post.shares}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full p-8 text-center">
                  <div>
                    <p className="text-gray-500 mb-2">لا توجد منشورات لعرضها</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setTab("compose")}
                    >
                      إنشاء منشور جديد
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="compose" className="flex-1 border rounded-lg">
          <Card className="h-full flex flex-col border-0 shadow-none">
            {getPlatformHeader()}
            
            <CardContent className="p-4 flex-1">
              <div className="flex items-start gap-3 mb-4">
                <div className="rounded-full bg-gray-200 h-10 w-10 flex items-center justify-center overflow-hidden">
                  {clientName ? clientName.charAt(0) : "C"}
                </div>
                <Textarea
                  className="flex-1 resize-none min-h-[150px]"
                  placeholder={`اكتب شيئًا للنشر على ${getPlatformName()}...`}
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Image className="h-4 w-4 mr-1" />
                    إضافة صورة
                  </Button>
                  <Button variant="outline" size="sm">
                    <Smile className="h-4 w-4 mr-1" />
                    إضافة رموز
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleSchedulePost}>
                    <Calendar className="h-4 w-4 mr-1" />
                    جدولة
                  </Button>
                  <Button onClick={handlePost}>
                    <Send className="h-4 w-4 mr-1" />
                    نشر الآن
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="schedule" className="flex-1 border rounded-lg">
          <Card className="h-full flex flex-col border-0 shadow-none">
            {getPlatformHeader()}
            
            <CardContent className="p-4 flex-1">
              <h3 className="font-bold text-lg mb-4">المنشورات المجدولة</h3>
              
              {postsData.filter(p => p.status === "مجدول" && p.platform === platform).length > 0 ? (
                <div className="space-y-4">
                  {postsData
                    .filter(p => p.status === "مجدول" && p.platform === platform)
                    .map((post) => (
                      <div key={post.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">{post.title}</h4>
                            <p className="text-sm text-gray-500">مجدول للنشر: {post.scheduledDate}</p>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full text-green-600">
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full text-red-600">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        {post.hasDesign && post.image && (
                          <div className="mt-2 bg-gray-100 rounded-md h-24 overflow-hidden">
                            <img 
                              src={post.image} 
                              alt={post.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        
                        <div className="flex justify-end mt-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => toast.success("تم نشر المنشور المجدول فوراً")}
                          >
                            نشر الآن
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full p-8 text-center">
                  <div>
                    <p className="text-gray-500 mb-2">لا توجد منشورات مجدولة</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setTab("compose")}
                    >
                      إنشاء منشور مجدول
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

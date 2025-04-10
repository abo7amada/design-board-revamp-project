
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

interface PostType {
  id: number;
  title: string;
  status: string;
  platform: string;
  scheduledDate: string;
  image: string | null;
  likes: number;
  comments: number;
  shares: number;
  clientId: number;
  date: string;
  author: string;
  hasDesign: boolean;
  content?: string;
}

export const SocialPlatformPreview = ({ platform, clientName }: SocialPlatformPreviewProps) => {
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState<PostType[]>(postsData.filter(p => p.platform === platform) as PostType[]);
  const [tab, setTab] = useState("feed");
  
  const handlePost = () => {
    if (!newPost.trim()) {
      toast.error("الرجاء كتابة محتوى المنشور");
      return;
    }
    
    // في التطبيق الحقيقي، هنا سيتم إرسال البيانات إلى API المنصة
    toast.success("تم نشر المحتوى بنجاح على " + getPlatformName());
    
    // إضافة المنشور الجديد محليًا
    const newPostObj: PostType = {
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
      case "tiktok": return "تيك توك";
      case "snapchat": return "سناب شات";
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
      case "tiktok":
        return (
          <div className="bg-black text-white p-4 rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-full p-1">
                <svg className="h-6 w-6 text-black" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.321 5.562a5.122 5.122 0 01-.443-.258 6.228 6.228 0 01-1.137-.92c-1.409-1.4-1.363-3.345-1.35-3.623L16.38.75h-3.126v14.287c0 1.323-.952 2.415-2.254 2.601-1.59.228-2.947-.896-2.947-2.394 0-1.32 1.09-2.417 2.43-2.417.265 0 .52.04.76.116v-3.19a6.077 6.077 0 00-3.65 1.073c-1.942 1.29-2.985 3.8-2.483 6.346.572 2.887 3.016 4.993 5.902 5.076 3.256.094 5.98-2.53 5.98-5.719V9.406c1.622 1.12 3.575 1.802 5.657 1.802V8.055c-.985 0-2.836-.732-3.327-2.493" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">{clientName || "حساب العميل"}</h3>
                <p className="text-sm opacity-90">@client_tiktok</p>
              </div>
            </div>
          </div>
        );
      case "snapchat":
        return (
          <div className="bg-yellow-400 text-black p-4 rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-full p-1">
                <svg className="h-6 w-6 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.206 1c.119 0 .774.019 1.197.019.922 0 2.1-.075 3.327.595 1.016.55 1.8 1.541 2.268 2.938.361 1.084.343 2.124.343 3.293 0 .144-.012.289-.012.444.012.087.099.519.593.816.313.193.677.271 1.016.271.439 0 .877-.167 1.214-.382v.666c-.175.139-.49.354-.958.485-.3.083-.663.16-1.098.16-.462 0-.964-.073-1.435-.319-.91-.479-1.615-1.444-1.993-2.808-.115-.41-.14-.834-.14-1.068 0-.167.012-.319.012-.444 0-1.73-.011-3.856-2.519-3.831-.211 0-.44.020-.663.020-.222 0-.452-.016-.663-.016-.517 0-1.031.065-1.388.176C9.125 2.951 7.787 4.646 7.787 7.448c0 .39.025.785.074 1.175-.182.031-.388.062-.6.062-.365 0-.731-.062-1.047-.185-.325-.129-.638-.308-.9-.535v.741a4.87 4.87 0 001.534.764c.318.087.65.128 1.047.128.175 0 .351-.012.517-.034.329.822.964 1.454 1.847 1.847.829.37 1.85.535 3.077.535.06 0 .113-.004.175-.004.761 0 2.436.066.61.087a.858.858 0 01.77.572c.05.154.037.337.025.515-.084 1.166-2.11 1.722-2.642 1.845-.139.034-.54.124-.554.35-.008.175-.008.347.112.531.271.401 1.206.859 2.969.859.886 0 1.771-.113 2.642-.344 1.147-.296 2.147-.82 2.969-1.555v.7c-1.016 1.138-2.383 1.58-3.531 1.889-.775.205-1.572.314-2.396.314-2.295 0-3.782-.672-4.558-1.21a2.221 2.221 0 01-.774-.928c-.107-.286-.132-.592-.083-.887a.58.58 0 01.013-.033c.38-1.483 2.235-1.821 2.972-1.97.088-.016.171-.034.255-.05.562-.111.75-.258.764-.319.025-.103.037-.23.05-.356.025-.388-.19-.775-.513-.941-.3-.158-.624-.193-.996-.219-.11-.012-.221-.018-.325-.018-1.098 0-1.881.12-2.532.385-1.032.422-1.553 1.136-1.665 1.32-.05.087-.075.173-.075.268a.372.372 0 00.175.305.56.56 0 00.367.116c.211 0 .451-.087.451-.087l.025.05s-.137.294-.137.6c0 .074 0 .15.012.217.075.388.289.684.652.9.578.337 1.565.53 2.928.53 1.377 0 2.507-.243 3.372-.734l.013-.01c.649-.367 1.009-.853 1.071-1.427.05-.519-.189-.943-.34-1.141-.325-.443-.812-.542-1.201-.585-.187-.02-.436-.02-.677-.02-1.047 0-1.7-.063-2.047-.099-1.098-.116-1.184-.294-1.209-.393-.025-.13-.025-.26-.025-.39 0-1.233.025-2.593-.688-3.637C12.72 4.7 11.648 4.233 10.575 4.233h-.037c-1.073 0-2.146.466-2.93 1.32-.713 1.044-.688 2.404-.688 3.637 0 .13 0 .26-.025.39-.025.098-.111.277-1.21.393-.346.036-1 .099-2.046.099-.242 0-.49 0-.677.02-.39.043-.876.141-1.202.585-.15.198-.39.622-.34 1.141.063.574.423 1.06 1.072 1.427l.013.01c.864.491 1.994.734 3.371.734 1.364 0 2.351-.193 2.93-.53.363-.216.577-.512.651-.9a1.25 1.25 0 00.013-.218c0-.305-.138-.6-.138-.6l.026-.05s.24.087.45.087a.567.567 0 00.369-.116.372.372 0 00.174-.305c0-.095-.025-.18-.075-.268-.112-.184-.632-.898-1.664-1.32-.651-.266-1.435-.385-2.532-.385-.105 0-.215.006-.326.018a6.77 6.77 0 00-.995.219c-.321.166-.538.553-.513.941.12.127.025.254.05.356.013.06.202.208.764.32.084.015.167.033.255.05.737.148 2.592.486 2.97 1.969a.577.577 0 01.14.033c.05.295.024.6-.083.887-.152.39-.431.715-.775.928-.776.538-2.263 1.21-4.558 1.21-.824 0-1.622-.109-2.396-.314-1.147-.31-2.514-.751-3.53-1.889v-.7c.822.736 1.821 1.259 2.969 1.555.87.231 1.756.344 2.642.344 1.763 0 2.698-.458 2.969-.86.119-.184.119-.355.112-.53-.014-.225-.415-.316-.555-.35-.53-.123-2.558-.679-2.642-1.845-.013-.177-.025-.36.025-.515a.858.858 0 01.77-.572 596.51 596.51 0 01.609-.087c.063 0 .115.004.176.004 1.226 0 2.248-.165 3.077-.535.883-.393 1.518-1.025 1.847-1.847.166.022.343.034.517.034.396 0 .73-.04 1.047-.128a4.87 4.87 0 001.535-.764v-.74c-.264.226-.575.405-.901.534-.316.123-.682.185-1.047.185-.212 0-.418-.031-.6-.062a9.49 9.49 0 00.075-1.175c0-2.802-1.338-4.497-4.095-5.534-.357-.11-.87-.175-1.388-.175-.211 0-.44.015-.663.015-.224 0-.452-.019-.661-.019-2.509-.025-2.521 2.1-2.521 3.83 0 .126.013.278.013.445 0 .234-.025.659-.139 1.068-.378 1.363-1.083 2.329-1.993 2.808-.471.246-.974.32-1.436.32-.435 0-.798-.078-1.097-.161-.468-.131-.782-.346-.959-.485v-.667c.338.215.775.383 1.215.383.34 0 .702-.078 1.016-.271.493-.298.58-.729.593-.817 0-.155-.013-.3-.013-.443 0-1.17-.018-2.21.343-3.294.468-1.397 1.252-2.388 2.268-2.938 1.228-.67 2.405-.595 3.327-.595.423 0 1.078-.019 1.198-.019" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">{clientName || "حساب العميل"}</h3>
                <p className="text-sm opacity-90">@client_snapchat</p>
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

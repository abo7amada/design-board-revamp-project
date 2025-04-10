
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/AppSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { SocialPlatformCard } from "@/components/social/SocialPlatformCard";
import { toast } from "sonner";
import { Network, NetworkOff, Plus, RefreshCw, Share2 } from "lucide-react";

interface SocialPlatform {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  lastPost?: string;
  audience?: number;
}

const initialPlatforms: SocialPlatform[] = [
  { id: "facebook", name: "فيسبوك", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png", connected: true, lastPost: "أمس", audience: 12500 },
  { id: "instagram", name: "إنستجرام", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png", connected: false },
  { id: "twitter", name: "تويتر", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png", connected: true, lastPost: "منذ 3 أيام", audience: 8200 },
  { id: "linkedin", name: "لينكد إن", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/768px-LinkedIn_logo_initials.png", connected: true, lastPost: "منذ أسبوع", audience: 5400 },
  { id: "tiktok", name: "تيك توك", icon: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/TikTok_logo.svg/1200px-TikTok_logo.svg.png", connected: false },
];

const SocialIntegrations = () => {
  const [platforms, setPlatforms] = useState<SocialPlatform[]>(initialPlatforms);
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  
  const handleTogglePlatform = (id: string, enabled: boolean) => {
    setPlatforms(
      platforms.map((platform) =>
        platform.id === id ? { ...platform, connected: enabled } : platform
      )
    );
  };
  
  const handleSaveCredentials = () => {
    if (!apiKey || !apiSecret) {
      toast.error("الرجاء إدخال مفتاح API وكلمة السر");
      return;
    }
    toast.success("تم حفظ بيانات الاعتماد بنجاح");
  };
  
  const connectedPlatforms = platforms.filter((platform) => platform.connected);
  
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full" dir="rtl">
        <AppSidebar />
        
        <main className="flex-1 p-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">إدارة المنصات الاجتماعية</h1>
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  <span>تحديث الحالة</span>
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  <span>إضافة منصة</span>
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="platforms" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="platforms">المنصات</TabsTrigger>
                <TabsTrigger value="api">واجهة برمجة التطبيقات (API)</TabsTrigger>
                <TabsTrigger value="analytics">التحليلات</TabsTrigger>
              </TabsList>
              
              <TabsContent value="platforms">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {platforms.map((platform) => (
                      <SocialPlatformCard
                        key={platform.id}
                        platform={platform}
                        onToggle={handleTogglePlatform}
                      />
                    ))}
                  </div>
                  
                  <Card className="bg-gray-50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {connectedPlatforms.length > 0 ? (
                          <Network className="h-5 w-5 text-green-600" />
                        ) : (
                          <NetworkOff className="h-5 w-5 text-gray-400" />
                        )}
                        <span>حالة الاتصال</span>
                      </CardTitle>
                      <CardDescription>
                        {connectedPlatforms.length > 0
                          ? `متصل بـ ${connectedPlatforms.length} منصات`
                          : "لا يوجد منصات متصلة حاليًا"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {connectedPlatforms.length > 0 ? (
                        <div className="space-y-3">
                          <p className="text-sm text-gray-500">
                            يمكنك نشر وجدولة المحتوى على المنصات التالية:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {connectedPlatforms.map((platform) => (
                              <div
                                key={platform.id}
                                className="flex items-center gap-2 bg-white rounded-full px-3 py-1 border"
                              >
                                <div className="h-5 w-5 shrink-0 rounded-full overflow-hidden">
                                  <img
                                    src={platform.icon}
                                    alt={platform.name}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <span className="text-sm">{platform.name}</span>
                              </div>
                            ))}
                          </div>
                          <Button 
                            className="mt-2 bg-green-600 hover:bg-green-700 gap-2"
                            onClick={() => toast.success("تم توجيهك إلى صفحة إنشاء منشور جديد")}
                          >
                            <Share2 className="h-4 w-4" />
                            <span>نشر على المنصات المتصلة</span>
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-gray-500 mb-4">
                            قم بتوصيل منصة واحدة على الأقل للبدء في نشر المحتوى
                          </p>
                          <Button 
                            variant="outline"
                            onClick={() => toast.info("اختر منصة للاتصال بها")}
                          >
                            توصيل منصة
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="api">
                <Card>
                  <CardHeader>
                    <CardTitle>إعدادات واجهة برمجة التطبيقات (API)</CardTitle>
                    <CardDescription>
                      قم بإدخال بيانات اعتماد API لكل منصة للسماح بالنشر التلقائي
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">بيانات اعتماد المنصات</h3>
                      
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <label htmlFor="apiKey" className="block text-sm font-medium">
                            مفتاح API
                          </label>
                          <Input
                            id="apiKey"
                            placeholder="أدخل مفتاح API"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="apiSecret" className="block text-sm font-medium">
                            كلمة سر API
                          </label>
                          <Input
                            id="apiSecret"
                            type="password"
                            placeholder="أدخل كلمة سر API"
                            value={apiSecret}
                            onChange={(e) => setApiSecret(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <Button 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={handleSaveCredentials}
                      >
                        حفظ بيانات الاعتماد
                      </Button>
                    </div>
                    
                    <div className="border-t pt-6 space-y-4">
                      <h3 className="text-lg font-medium">توثيق OAuth</h3>
                      <p className="text-sm text-gray-500">
                        استخدم توثيق OAuth للاتصال بالمنصات الاجتماعية بشكل آمن دون الحاجة لتخزين كلمات المرور.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {platforms.map((platform) => (
                          <Button
                            key={platform.id}
                            variant={platform.connected ? "outline" : "default"}
                            className={platform.connected ? "border-green-200 text-green-700" : ""}
                            onClick={() => {
                              if (!platform.connected) {
                                toast.success(`تم فتح نافذة توثيق ${platform.name}`);
                              } else {
                                toast.info(`أنت متصل بالفعل بـ ${platform.name}`);
                              }
                            }}
                          >
                            <div className="h-5 w-5 mr-2 rounded-full overflow-hidden">
                              <img
                                src={platform.icon}
                                alt={platform.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <span>
                              {platform.connected
                                ? `متصل بـ ${platform.name}`
                                : `توثيق ${platform.name}`}
                            </span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="analytics">
                <Card>
                  <CardHeader>
                    <CardTitle>تحليلات المنصات الاجتماعية</CardTitle>
                    <CardDescription>
                      عرض إحصائيات وتحليلات أداء المحتوى على مختلف المنصات
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {connectedPlatforms.length > 0 ? (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card>
                            <CardContent className="p-6">
                              <div className="text-center">
                                <p className="text-sm text-gray-500 mb-1">إجمالي المتابعين</p>
                                <p className="text-3xl font-bold">
                                  {connectedPlatforms.reduce(
                                    (total, platform) => total + (platform.audience || 0),
                                    0
                                  ).toLocaleString()}
                                </p>
                                <p className="text-sm text-green-600 mt-2">+5.2% هذا الشهر</p>
                              </div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-6">
                              <div className="text-center">
                                <p className="text-sm text-gray-500 mb-1">المنشورات المجدولة</p>
                                <p className="text-3xl font-bold">14</p>
                                <p className="text-sm text-blue-600 mt-2">6 منشورات هذا الأسبوع</p>
                              </div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-6">
                              <div className="text-center">
                                <p className="text-sm text-gray-500 mb-1">معدل التفاعل</p>
                                <p className="text-3xl font-bold">3.8%</p>
                                <p className="text-sm text-green-600 mt-2">+0.5% مقارنة بالشهر الماضي</p>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                        
                        <div className="border rounded-md p-8 text-center bg-gray-50">
                          <h3 className="text-lg font-medium mb-2">التحليلات التفصيلية</h3>
                          <p className="text-sm text-gray-500 mb-4">
                            يمكنك عرض تحليلات مفصلة لكل منصة وكل منشور من خلال لوحة التحكم.
                          </p>
                          <Button 
                            onClick={() => toast.info("سيتم فتح لوحة التحليلات المفصلة")}
                          >
                            عرض التحليلات المفصلة
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">
                          قم بتوصيل منصة واحدة على الأقل لعرض التحليلات
                        </p>
                        <Button 
                          variant="outline"
                          onClick={() => toast.info("اختر منصة للاتصال بها")}
                        >
                          توصيل منصة
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default SocialIntegrations;

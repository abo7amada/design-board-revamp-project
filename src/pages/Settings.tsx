
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, LayoutGrid, PencilRuler, BarChart, Users, Home, Settings as SettingsIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("ar");
  const navigate = useNavigate();

  // دالة للتنقل بين الصفحات
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleSaveSettings = () => {
    toast.success("تم حفظ الإعدادات بنجاح");
  };

  return (
    <div className="min-h-screen flex" dir="rtl">
      {/* Sidebar */}
      <SidebarProvider>
        <aside className="h-screen sticky top-0 w-64 border-l bg-white hidden md:block">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold text-green-700">كانفاس التواصل</h2>
            </div>
            
            <nav className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-6">
                <li>
                  <Button variant="link" className="w-full justify-start gap-2 text-gray-600 hover:text-green-700" onClick={() => handleNavigation("/")}>
                    <Home className="h-5 w-5" />
                    <span className="text-lg">الرئيسية</span>
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="w-full justify-start gap-2 text-gray-600 hover:text-green-700" onClick={() => handleNavigation("/")}>
                    <LayoutGrid className="h-5 w-5" />
                    <span className="text-lg">لوحة المنشورات</span>
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="w-full justify-start gap-2 text-gray-600 hover:text-green-700" onClick={() => handleNavigation("/designs")}>
                    <PencilRuler className="h-5 w-5" />
                    <span className="text-lg">لوحة التصاميم</span>
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="w-full justify-start gap-2 text-gray-600 hover:text-green-700" onClick={() => handleNavigation("/calendar")}>
                    <Calendar className="h-5 w-5" />
                    <span className="text-lg">التقويم</span>
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="w-full justify-start gap-2 text-gray-600 hover:text-green-700" onClick={() => handleNavigation("/statistics")}>
                    <BarChart className="h-5 w-5" />
                    <span className="text-lg">الإحصائيات</span>
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="w-full justify-start gap-2 text-gray-600 hover:text-green-700" onClick={() => handleNavigation("/clients")}>
                    <Users className="h-5 w-5" />
                    <span className="text-lg">العملاء</span>
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="w-full justify-start gap-2 text-green-700">
                    <SettingsIcon className="h-5 w-5" />
                    <span className="text-lg">الإعدادات</span>
                  </Button>
                </li>
              </ul>
            </nav>
            
            <div className="p-4 border-t">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gray-200 relative overflow-hidden">
                    <img src="/lovable-uploads/10fc914b-5004-4050-8edd-e2273f4b215d.png" alt="Profile" className="h-full w-full object-cover" />
                  </div>
                </div>
                <div className="mr-3">
                  <p className="text-sm font-medium">أحمد محمد</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 bg-white">
          {/* Header */}
          <header className="bg-white border-b py-4 px-6 flex justify-between items-center">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => toast.info("لديك إشعاران جديدان")}>
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">2</span>
              </Button>
            </div>
            
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-green-700 mr-2">الإعدادات</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => {
                setLanguage(language === "ar" ? "en" : "ar");
                toast.info("تم تغيير اللغة");
              }}>
                <span className="sr-only">تغيير اللغة</span>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                  <path d="M7.49996 1.80002C4.35194 1.80002 1.79996 4.352 1.79996 7.50002C1.79996 10.648 4.35194 13.2 7.49996 13.2C10.648 13.2 13.2 10.648 13.2 7.50002C13.2 4.352 10.648 1.80002 7.49996 1.80002ZM0.899963 7.50002C0.899963 3.85494 3.85488 0.900024 7.49996 0.900024C11.145 0.900024 14.1 3.85494 14.1 7.50002C14.1 11.1451 11.145 14.1 7.49996 14.1C3.85488 14.1 0.899963 11.1451 0.899963 7.50002Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  <path d="M13.4999 7.89998H1.49994V7.09998H13.4999V7.89998Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  <path d="M7.09991 13.5V1.5H7.89991V13.5H7.09991Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  <path d="M10.3917 7.50002C10.3917 9.28565 9.28559 10.8 7.49996 10.8C5.71433 10.8 4.60822 9.28565 4.60822 7.50002C4.60822 5.71439 5.71433 4.20004 7.49996 4.20004C9.28559 4.20004 10.3917 5.71439 10.3917 7.50002ZM7.49996 10C8.66928 10 9.5917 8.94755 9.5917 7.50002C9.5917 6.05249 8.66928 5.00004 7.49996 5.00004C6.33064 5.00004 5.40822 6.05249 5.40822 7.50002C5.40822 8.94755 6.33064 10 7.49996 10Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </Button>
              <Button variant="ghost" size="icon" onClick={() => {
                setDarkMode(!darkMode);
                toast.info("تم تغيير الوضع الليلي");
              }}>
                <span className="sr-only">تغيير الوضع الليلي</span>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                  <path d="M2.89998 0.499976C2.89998 0.279062 2.72089 0.099976 2.49998 0.099976C2.27906 0.099976 2.09998 0.279062 2.09998 0.499976V1.09998H1.49998C1.27906 1.09998 1.09998 1.27906 1.09998 1.49998C1.09998 1.72089 1.27906 1.89998 1.49998 1.89998H2.09998V2.49998C2.09998 2.72089 2.27906 2.89998 2.49998 2.89998C2.72089 2.89998 2.89998 2.72089 2.89998 2.49998V1.89998H3.49998C3.72089 1.89998 3.89998 1.72089 3.89998 1.49998C3.89998 1.27906 3.72089 1.09998 3.49998 1.09998H2.89998V0.499976ZM5.89998 3.49998C5.89998 3.27906 5.72089 3.09998 5.49998 3.09998C5.27906 3.09998 5.09998 3.27906 5.09998 3.49998V4.09998H4.49998C4.27906 4.09998 4.09998 4.27906 4.09998 4.49998C4.09998 4.72089 4.27906 4.89998 4.49998 4.89998H5.09998V5.49998C5.09998 5.72089 5.27906 5.89998 5.49998 5.89998C5.72089 5.89998 5.89998 5.72089 5.89998 5.49998V4.89998H6.49998C6.72089 4.89998 6.89998 4.72089 6.89998 4.49998C6.89998 4.27906 6.72089 4.09998 6.49998 4.09998H5.89998V3.49998ZM1.89998 6.49998C1.89998 6.27906 1.72089 6.09998 1.49998 6.09998C1.27906 6.09998 1.09998 6.27906 1.09998 6.49998V7.09998H0.499976C0.279062 7.09998 0.099976 7.27906 0.099976 7.49998C0.099976 7.72089 0.279062 7.89998 0.499976 7.89998H1.09998V8.49998C1.09998 8.72089 1.27906 8.89997 1.49998 8.89997C1.72089 8.89997 1.89998 8.72089 1.89998 8.49998V7.89998H2.49998C2.72089 7.89998 2.89998 7.72089 2.89998 7.49998C2.89998 7.27906 2.72089 7.09998 2.49998 7.09998H1.89998V6.49998ZM8.54406 0.98184L8.24618 0.941586C8.03275 0.917676 7.90692 1.1655 8.02936 1.34194C8.17013 1.54479 8.29981 1.75592 8.41754 1.97445C8.91878 2.90485 9.20322 3.96932 9.20322 5.10022C9.20322 8.35938 6.56226 11 3.30309 11C3.21429 11 3.12613 10.9978 3.03863 10.9935C2.90332 10.9856 2.80427 11.1275 2.89217 11.2459C4.28932 13.0682 6.53072 14.2 9.0347 14.2C13.4153 14.2 17 10.6153 17 6.23474C17 3.13015 15.0595 0.428515 12.3421 -0.17297C11.1114 -0.451886 9.83304 -0.20291 8.54406 0.98184Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </Button>
            </div>
          </header>
          
          {/* Content */}
          <div className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="mb-6">
                <TabsTrigger value="account">الحساب الشخصي</TabsTrigger>
                <TabsTrigger value="appearance">المظهر</TabsTrigger>
                <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
                <TabsTrigger value="security">الأمان</TabsTrigger>
              </TabsList>
              
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>معلومات الحساب</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">الاسم</Label>
                      <Input id="name" defaultValue="أحمد محمد" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input id="email" type="email" defaultValue="ahmed@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">نبذة تعريفية</Label>
                      <Input id="bio" defaultValue="مسؤول تسويق رقمي - متخصص في إدارة وسائل التواصل الاجتماعي" />
                    </div>
                    <Button onClick={handleSaveSettings}>حفظ التغييرات</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="appearance">
                <Card>
                  <CardHeader>
                    <CardTitle>إعدادات المظهر</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="darkMode">الوضع الليلي</Label>
                      <Switch 
                        id="darkMode" 
                        checked={darkMode} 
                        onCheckedChange={setDarkMode} 
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="language">اللغة</Label>
                      <div className="space-x-2">
                        <Button 
                          variant={language === "ar" ? "default" : "outline"} 
                          onClick={() => setLanguage("ar")}
                          className="ml-2"
                        >
                          العربية
                        </Button>
                        <Button 
                          variant={language === "en" ? "default" : "outline"} 
                          onClick={() => setLanguage("en")}
                        >
                          English
                        </Button>
                      </div>
                    </div>
                    <Button onClick={handleSaveSettings}>حفظ التغييرات</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>إعدادات الإشعارات</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="emailNotifications">إشعارات البريد الإلكتروني</Label>
                      <Switch 
                        id="emailNotifications" 
                        checked={notifications} 
                        onCheckedChange={setNotifications} 
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="pushNotifications">إشعارات الموقع</Label>
                      <Switch 
                        id="pushNotifications" 
                        defaultChecked={true} 
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="marketingEmails">رسائل تسويقية</Label>
                      <Switch 
                        id="marketingEmails" 
                        defaultChecked={false} 
                      />
                    </div>
                    <Button onClick={handleSaveSettings}>حفظ التغييرات</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>إعدادات الأمان</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">كلمة المرور الحالية</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">كلمة المرور الجديدة</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <Button onClick={() => toast.success("تم تغيير كلمة المرور بنجاح")}>تغيير كلمة المرور</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default Settings;

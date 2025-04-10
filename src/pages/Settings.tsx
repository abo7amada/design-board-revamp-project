
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, LayoutGrid, PencilRuler, BarChart, Users, Home, Settings as SettingsIcon, User, Lock, Globe, Bell as BellIcon, FileText, PaletteIcon, Headphones, Shield, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Settings = () => {
  const [currentTab, setCurrentTab] = useState("account");
  const navigate = useNavigate();

  // حالة الإعدادات
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: false,
    language: "ar",
    autoSave: true,
    twoFactorAuth: false,
  });

  // دالة للتنقل بين الصفحات
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleSettingChange = (setting: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
    toast.success(`تم تحديث ${setting} بنجاح`);
  };

  const handleSaveProfile = () => {
    toast.success("تم حفظ التغييرات بنجاح");
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
              <Button variant="ghost" size="icon" onClick={() => toast.info("تغيير اللغة")}>
                <span className="sr-only">تغيير اللغة</span>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                  <path d="M7.49996 1.80002C4.35194 1.80002 1.79996 4.352 1.79996 7.50002C1.79996 10.648 4.35194 13.2 7.49996 13.2C10.648 13.2 13.2 10.648 13.2 7.50002C13.2 4.352 10.648 1.80002 7.49996 1.80002ZM0.899963 7.50002C0.899963 3.85494 3.85488 0.900024 7.49996 0.900024C11.145 0.900024 14.1 3.85494 14.1 7.50002C14.1 11.1451 11.145 14.1 7.49996 14.1C3.85488 14.1 0.899963 11.1451 0.899963 7.50002Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  <path d="M13.4999 7.89998H1.49994V7.09998H13.4999V7.89998Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  <path d="M7.09991 13.5V1.5H7.89991V13.5H7.09991Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  <path d="M10.3917 7.50002C10.3917 9.28565 9.28559 10.8 7.49996 10.8C5.71433 10.8 4.60822 9.28565 4.60822 7.50002C4.60822 5.71439 5.71433 4.20004 7.49996 4.20004C9.28559 4.20004 10.3917 5.71439 10.3917 7.50002ZM7.49996 10C8.66928 10 9.5917 8.94755 9.5917 7.50002C9.5917 6.05249 8.66928 5.00004 7.49996 5.00004C6.33064 5.00004 5.40822 6.05249 5.40822 7.50002C5.40822 8.94755 6.33064 10 7.49996 10Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleSettingChange("darkMode", !settings.darkMode)}>
                <span className="sr-only">تغيير الوضع الليلي</span>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                  <path d="M2.89998 0.499976C2.89998 0.279062 2.72089 0.099976 2.49998 0.099976C2.27906 0.099976 2.09998 0.279062 2.09998 0.499976V1.09998H1.49998C1.27906 1.09998 1.09998 1.27906 1.09998 1.49998C1.09998 1.72089 1.27906 1.89998 1.49998 1.89998H2.09998V2.49998C2.09998 2.72089 2.27906 2.89998 2.49998 2.89998C2.72089 2.89998 2.89998 2.72089 2.89998 2.49998V1.89998H3.49998C3.72089 1.89998 3.89998 1.72089 3.89998 1.49998C3.89998 1.27906 3.72089 1.09998 3.49998 1.09998H2.89998V0.499976ZM5.89998 3.49998C5.89998 3.27906 5.72089 3.09998 5.49998 3.09998C5.27906 3.09998 5.09998 3.27906 5.09998 3.49998V4.09998H4.49998C4.27906 4.09998 4.09998 4.27906 4.09998 4.49998C4.09998 4.72089 4.27906 4.89998 4.49998 4.89998H5.09998V5.49998C5.09998 5.72089 5.27906 5.89998 5.49998 5.89998C5.72089 5.89998 5.89998 5.72089 5.89998 5.49998V4.89998H6.49998C6.72089 4.89998 6.89998 4.72089 6.89998 4.49998C6.89998 4.27906 6.72089 4.09998 6.49998 4.09998H5.89998V3.49998ZM1.89998 6.49998C1.89998 6.27906 1.72089 6.09998 1.49998 6.09998C1.27906 6.09998 1.09998 6.27906 1.09998 6.49998V7.09998H0.499976C0.279062 7.09998 0.099976 7.27906 0.099976 7.49998C0.099976 7.72089 0.279062 7.89998 0.499976 7.89998H1.09998V8.49998C1.09998 8.72089 1.27906 8.89997 1.49998 8.89997C1.72089 8.89997 1.89998 8.72089 1.89998 8.49998V7.89998H2.49998C2.72089 7.89998 2.89998 7.72089 2.89998 7.49998C2.89998 7.27906 2.72089 7.09998 2.49998 7.09998H1.89998V6.49998ZM8.54406 0.98184L8.24618 0.941586C8.03275 0.917676 7.90692 1.1655 8.02936 1.34194C8.17013 1.54479 8.29981 1.75592 8.41754 1.97445C8.91878 2.90485 9.20322 3.96932 9.20322 5.10022C9.20322 8.35938 6.56226 11 3.30309 11C3.21429 11 3.12613 10.9978 3.03863 10.9935C2.90332 10.9856 2.80427 11.1275 2.89217 11.2459C4.28932 13.0682 6.53072 14.2 9.0347 14.2C13.4153 14.2 17 10.6153 17 6.23474C17 3.13015 15.0595 0.428515 12.3421 -0.17297C11.1114 -0.451886 9.83304 -0.20291 8.54406 0.98184Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </Button>
            </div>
          </header>
          
          {/* Content */}
          <div className="p-6">
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1">
                  <Card className="sticky top-6">
                    <CardContent className="p-0">
                      <nav className="flex flex-col p-2">
                        <Button
                          variant={currentTab === "account" ? "default" : "ghost"}
                          className="justify-start gap-2 px-3 py-2 mb-1"
                          onClick={() => setCurrentTab("account")}
                        >
                          <User className="h-5 w-5" />
                          <span>الحساب الشخصي</span>
                        </Button>
                        <Button
                          variant={currentTab === "security" ? "default" : "ghost"}
                          className="justify-start gap-2 px-3 py-2 mb-1"
                          onClick={() => setCurrentTab("security")}
                        >
                          <Lock className="h-5 w-5" />
                          <span>الأمان والخصوصية</span>
                        </Button>
                        <Button
                          variant={currentTab === "notifications" ? "default" : "ghost"}
                          className="justify-start gap-2 px-3 py-2 mb-1"
                          onClick={() => setCurrentTab("notifications")}
                        >
                          <BellIcon className="h-5 w-5" />
                          <span>الإشعارات</span>
                        </Button>
                        <Button
                          variant={currentTab === "appearance" ? "default" : "ghost"}
                          className="justify-start gap-2 px-3 py-2 mb-1"
                          onClick={() => setCurrentTab("appearance")}
                        >
                          <PaletteIcon className="h-5 w-5" />
                          <span>المظهر</span>
                        </Button>
                        <Button
                          variant={currentTab === "language" ? "default" : "ghost"}
                          className="justify-start gap-2 px-3 py-2 mb-1"
                          onClick={() => setCurrentTab("language")}
                        >
                          <Globe className="h-5 w-5" />
                          <span>اللغة</span>
                        </Button>
                        <Button
                          variant={currentTab === "help" ? "default" : "ghost"}
                          className="justify-start gap-2 px-3 py-2 mb-1"
                          onClick={() => setCurrentTab("help")}
                        >
                          <Headphones className="h-5 w-5" />
                          <span>المساعدة والدعم</span>
                        </Button>
                      </nav>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="md:col-span-3">
                  {currentTab === "account" && (
                    <Card>
                      <CardHeader>
                        <CardTitle>معلومات الحساب الشخصي</CardTitle>
                        <CardDescription>
                          قم بتحديث معلومات حسابك الشخصي وإعدادات الملف التعريفي.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                          <div className="flex flex-col items-center">
                            <Avatar className="h-24 w-24">
                              <AvatarImage src="/lovable-uploads/10fc914b-5004-4050-8edd-e2273f4b215d.png" alt="avatar" />
                              <AvatarFallback>AM</AvatarFallback>
                            </Avatar>
                            <Button variant="outline" size="sm" className="mt-4">
                              تغيير الصورة
                            </Button>
                          </div>
                          
                          <div className="flex-1 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="name">الاسم</Label>
                                <Input id="name" defaultValue="أحمد محمد" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="username">اسم المستخدم</Label>
                                <Input id="username" defaultValue="ahmed_m" />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="email">البريد الإلكتروني</Label>
                              <Input id="email" type="email" defaultValue="ahmed@example.com" />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="bio">نبذة تعريفية</Label>
                              <Textarea id="bio" defaultValue="مصمم ومدير مشاريع في قسم التسويق الرقمي لشركة كانفاس التواصل." />
                            </div>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="role">الدور الوظيفي</Label>
                            <Input id="role" defaultValue="مدير مشاريع" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="department">القسم</Label>
                            <Input id="department" defaultValue="التسويق الرقمي" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">رقم الهاتف</Label>
                            <Input id="phone" defaultValue="+966 50 123 4567" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="location">الموقع</Label>
                            <Input id="location" defaultValue="الرياض، المملكة العربية السعودية" />
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button onClick={handleSaveProfile}>حفظ التغييرات</Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  {currentTab === "security" && (
                    <Card>
                      <CardHeader>
                        <CardTitle>الأمان والخصوصية</CardTitle>
                        <CardDescription>
                          إدارة إعدادات الأمان والخصوصية لحسابك.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">المصادقة الثنائية</div>
                              <div className="text-sm text-muted-foreground">تأمين حسابك بمستوى إضافي من الحماية</div>
                            </div>
                            <Switch
                              checked={settings.twoFactorAuth}
                              onCheckedChange={(checked) => handleSettingChange("twoFactorAuth", checked)}
                            />
                          </div>
                          
                          <Separator />
                          
                          <div>
                            <h3 className="text-lg font-medium mb-4">تغيير كلمة المرور</h3>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="current-password">كلمة المرور الحالية</Label>
                                <Input id="current-password" type="password" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="new-password">كلمة المرور الجديدة</Label>
                                <Input id="new-password" type="password" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="confirm-password">تأكيد كلمة المرور الجديدة</Label>
                                <Input id="confirm-password" type="password" />
                              </div>
                              <Button onClick={() => toast.success("تم تغيير كلمة المرور بنجاح")}>
                                تحديث كلمة المرور
                              </Button>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">جلسات تسجيل الدخول النشطة</h3>
                            <div className="rounded-md border p-4">
                              <div className="flex justify-between items-center">
                                <div>
                                  <div className="font-medium">الكمبيوتر المكتبي - Chrome</div>
                                  <div className="text-sm text-muted-foreground">الرياض، المملكة العربية السعودية • منذ 2 ساعة</div>
                                </div>
                                <Button variant="outline" size="sm" onClick={() => toast.info("تم إنهاء الجلسة")}>
                                  إنهاء الجلسة
                                </Button>
                              </div>
                            </div>
                            <div className="rounded-md border p-4">
                              <div className="flex justify-between items-center">
                                <div>
                                  <div className="font-medium">iPhone 13 - Safari</div>
                                  <div className="text-sm text-muted-foreground">الرياض، المملكة العربية السعودية • منذ 5 دقائق</div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="text-sm text-muted-foreground">الجلسة الحالية</div>
                                  <Button variant="outline" size="sm" onClick={() => toast.info("تم إنهاء الجلسة")}>
                                    إنهاء الجلسة
                                  </Button>
                                </div>
                              </div>
                            </div>
                            <Button 
                              variant="destructive"
                              onClick={() => toast.warning("تم إنهاء جميع الجلسات الأخرى")}
                            >
                              إنهاء جميع الجلسات الأخرى
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  {currentTab === "notifications" && (
                    <Card>
                      <CardHeader>
                        <CardTitle>إعدادات الإشعارات</CardTitle>
                        <CardDescription>
                          تخصيص كيفية وتوقيت استلام الإشعارات.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h3 className="font-medium text-lg">قنوات الإشعارات</h3>
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <div className="font-medium">إشعارات البريد الإلكتروني</div>
                                <div className="text-sm text-muted-foreground">الحصول على تحديثات عبر البريد الإلكتروني</div>
                              </div>
                              <Switch 
                                checked={settings.emailNotifications} 
                                onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)} 
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <div className="font-medium">إشعارات الدفع</div>
                                <div className="text-sm text-muted-foreground">الحصول على إشعارات على الجهاز</div>
                              </div>
                              <Switch 
                                checked={settings.pushNotifications} 
                                onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)} 
                              />
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div className="space-y-4">
                            <h3 className="font-medium text-lg">أنواع الإشعارات</h3>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                  <div className="font-medium">تحديثات المشاريع</div>
                                  <div className="text-sm text-muted-foreground">الحصول على إشعارات عند تحديث المشاريع</div>
                                </div>
                                <Switch defaultChecked />
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                  <div className="font-medium">تعليقات جديدة</div>
                                  <div className="text-sm text-muted-foreground">الحصول على إشعارات عند إضافة تعليق جديد</div>
                                </div>
                                <Switch defaultChecked />
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                  <div className="font-medium">مهام تم تعيينها</div>
                                  <div className="text-sm text-muted-foreground">الحصول على إشعارات عند تعيين مهمة جديدة لك</div>
                                </div>
                                <Switch defaultChecked />
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                  <div className="font-medium">تصاميم جديدة</div>
                                  <div className="text-sm text-muted-foreground">الحصول على إشعارات عند إضافة تصميم جديد</div>
                                </div>
                                <Switch defaultChecked />
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                  <div className="font-medium">إشعارات تسويقية</div>
                                  <div className="text-sm text-muted-foreground">الحصول على إشعارات حول العروض والميزات الجديدة</div>
                                </div>
                                <Switch />
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex justify-end">
                            <Button onClick={() => toast.success("تم حفظ إعدادات الإشعارات بنجاح")}>
                              حفظ التغييرات
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  {currentTab === "appearance" && (
                    <Card>
                      <CardHeader>
                        <CardTitle>إعدادات المظهر</CardTitle>
                        <CardDescription>
                          تخصيص مظهر التطبيق وواجهة المستخدم.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h3 className="font-medium text-lg">المظهر</h3>
                            <div className="grid grid-cols-3 gap-4">
                              <Button 
                                variant="outline" 
                                className={`aspect-square flex flex-col items-center justify-center gap-2 p-4 ${!settings.darkMode ? "ring-2 ring-green-600" : ""}`}
                                onClick={() => handleSettingChange("darkMode", false)}
                              >
                                <div className="h-10 w-10 rounded-full bg-white border"></div>
                                <span>فاتح</span>
                              </Button>
                              <Button 
                                variant="outline" 
                                className={`aspect-square flex flex-col items-center justify-center gap-2 p-4 ${settings.darkMode ? "ring-2 ring-green-600" : ""}`}
                                onClick={() => handleSettingChange("darkMode", true)}
                              >
                                <div className="h-10 w-10 rounded-full bg-gray-900 border"></div>
                                <span>داكن</span>
                              </Button>
                              <Button 
                                variant="outline" 
                                className="aspect-square flex flex-col items-center justify-center gap-2 p-4"
                                onClick={() => toast.info("سيتم استخدام وضع النظام")}
                              >
                                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-white to-gray-900 border"></div>
                                <span>تلقائي</span>
                              </Button>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div className="space-y-4">
                            <h3 className="font-medium text-lg">الخيارات</h3>
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <div className="font-medium">حفظ تلقائي</div>
                                <div className="text-sm text-muted-foreground">حفظ التغييرات تلقائيًا</div>
                              </div>
                              <Switch 
                                checked={settings.autoSave} 
                                onCheckedChange={(checked) => handleSettingChange("autoSave", checked)} 
                              />
                            </div>
                          </div>
                          
                          <div className="flex justify-end">
                            <Button onClick={() => toast.success("تم حفظ إعدادات المظهر بنجاح")}>
                              حفظ التغييرات
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  {currentTab === "language" && (
                    <Card>
                      <CardHeader>
                        <CardTitle>إعدادات اللغة</CardTitle>
                        <CardDescription>
                          تغيير لغة التطبيق والتنسيق.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h3 className="font-medium text-lg">لغة التطبيق</h3>
                            <Select
                              value={settings.language}
                              onValueChange={(value) => handleSettingChange("language", value)}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="اختر اللغة" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ar">العربية</SelectItem>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="fr">Français</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <Separator />
                          
                          <div className="space-y-4">
                            <h3 className="font-medium text-lg">تنسيق الوقت والتاريخ</h3>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label>تنسيق التاريخ</Label>
                                <Select defaultValue="dd/mm/yyyy">
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="اختر تنسيق التاريخ" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="dd/mm/yyyy">يوم/شهر/سنة (31/12/2023)</SelectItem>
                                    <SelectItem value="mm/dd/yyyy">شهر/يوم/سنة (12/31/2023)</SelectItem>
                                    <SelectItem value="yyyy/mm/dd">سنة/شهر/يوم (2023/12/31)</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label>تنسيق الوقت</Label>
                                <Select defaultValue="12h">
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="اختر تنسيق الوقت" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="12h">12 ساعة (01:30 PM)</SelectItem>
                                    <SelectItem value="24h">24 ساعة (13:30)</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label>المنطقة الزمنية</Label>
                                <Select defaultValue="asia_riyadh">
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="اختر المنطقة الزمنية" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="asia_riyadh">آسيا/الرياض (GMT+3)</SelectItem>
                                    <SelectItem value="europe_london">أوروبا/لندن (GMT+0)</SelectItem>
                                    <SelectItem value="america_newyork">أمريكا/نيويورك (GMT-5)</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex justify-end">
                            <Button onClick={() => toast.success("تم حفظ إعدادات اللغة بنجاح")}>
                              حفظ التغييرات
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  {currentTab === "help" && (
                    <Card>
                      <CardHeader>
                        <CardTitle>المساعدة والدعم</CardTitle>
                        <CardDescription>
                          الحصول على المساعدة واستكشاف الأخطاء وإصلاحها.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h3 className="font-medium text-lg">الموارد المتاحة</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <Card className="hover:bg-gray-50 cursor-pointer" onClick={() => toast.info("تم فتح مركز المساعدة")}>
                                <CardContent className="p-4 flex gap-3 items-start">
                                  <FileText className="h-6 w-6 text-gray-500" />
                                  <div>
                                    <h4 className="font-medium">مركز المساعدة</h4>
                                    <p className="text-sm text-muted-foreground">تصفح مقالات المساعدة والأسئلة الشائعة</p>
                                  </div>
                                  <ArrowRight className="ms-auto h-5 w-5 text-muted-foreground" />
                                </CardContent>
                              </Card>
                              <Card className="hover:bg-gray-50 cursor-pointer" onClick={() => toast.info("تم فتح دروس الفيديو")}>
                                <CardContent className="p-4 flex gap-3 items-start">
                                  <FileText className="h-6 w-6 text-gray-500" />
                                  <div>
                                    <h4 className="font-medium">دروس الفيديو</h4>
                                    <p className="text-sm text-muted-foreground">شاهد دروس فيديو توضيحية للميزات</p>
                                  </div>
                                  <ArrowRight className="ms-auto h-5 w-5 text-muted-foreground" />
                                </CardContent>
                              </Card>
                              <Card className="hover:bg-gray-50 cursor-pointer" onClick={() => toast.info("تم فتح المجتمع")}>
                                <CardContent className="p-4 flex gap-3 items-start">
                                  <Users className="h-6 w-6 text-gray-500" />
                                  <div>
                                    <h4 className="font-medium">مجتمع المستخدمين</h4>
                                    <p className="text-sm text-muted-foreground">تفاعل مع المستخدمين الآخرين</p>
                                  </div>
                                  <ArrowRight className="ms-auto h-5 w-5 text-muted-foreground" />
                                </CardContent>
                              </Card>
                              <Card className="hover:bg-gray-50 cursor-pointer" onClick={() => toast.info("تم فتح الدعم")}>
                                <CardContent className="p-4 flex gap-3 items-start">
                                  <Headphones className="h-6 w-6 text-gray-500" />
                                  <div>
                                    <h4 className="font-medium">اتصل بالدعم</h4>
                                    <p className="text-sm text-muted-foreground">احصل على مساعدة مباشرة من فريق الدعم</p>
                                  </div>
                                  <ArrowRight className="ms-auto h-5 w-5 text-muted-foreground" />
                                </CardContent>
                              </Card>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div className="space-y-4">
                            <h3 className="font-medium text-lg">التحقق من الأخطاء</h3>
                            <div className="space-y-4">
                              <Card className="overflow-hidden">
                                <CardHeader className="py-3">
                                  <CardTitle className="text-base">أداة التحقق من الأخطاء</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                  <div className="p-4 bg-gray-50 text-sm whitespace-pre font-mono">
                                    نظام التشغيل: Windows 11 Pro 64-bit{"\n"}
                                    المتصفح: Chrome 112.0.5615.138{"\n"}
                                    الإصدار: 2.4.5{"\n"}
                                    الذاكرة: 65% متاحة{"\n"}
                                    الاتصال: مستقر
                                  </div>
                                </CardContent>
                              </Card>
                              <Button onClick={() => toast.success("تم إنشاء تقرير الأخطاء")}>
                                إنشاء تقرير الأخطاء
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default Settings;

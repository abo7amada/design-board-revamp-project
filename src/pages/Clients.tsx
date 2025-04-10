
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, LayoutGrid, PencilRuler, BarChart, Users, Home, Settings, Search, Plus, User, Mail, Phone, Edit, Trash2, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// بيانات وهمية للعملاء
const clientsData = [
  {
    id: 1,
    name: "شركة الأفق الأخضر",
    image: "/placeholder.svg",
    email: "info@greencompany.com",
    phone: "+966 50 123 4567",
    sector: "تقنية المعلومات",
    status: "نشط",
    joinDate: "2023/01/10",
    projectsCount: 12,
    lastActivity: "2023/04/15",
    contact: "محمد الأحمد",
    website: "www.greencompany.com",
  },
  {
    id: 2,
    name: "مؤسسة نجمة الشمال",
    image: "/placeholder.svg",
    email: "contact@northstar.com",
    phone: "+966 55 987 6543",
    sector: "التجارة الإلكترونية",
    status: "نشط",
    joinDate: "2022/11/05",
    projectsCount: 8,
    lastActivity: "2023/04/10",
    contact: "سارة الشمري",
    website: "www.northstar.com",
  },
  {
    id: 3,
    name: "شركة الوفق الأصفر",
    image: "/placeholder.svg",
    email: "hello@yellowalign.com",
    phone: "+966 54 456 7890",
    sector: "الصناعة",
    status: "غير نشط",
    joinDate: "2022/08/15",
    projectsCount: 4,
    lastActivity: "2023/02/20",
    contact: "خالد المنصور",
    website: "www.yellowalign.com",
  },
  {
    id: 4,
    name: "شركة البيان",
    image: "/placeholder.svg",
    email: "info@albayan.com",
    phone: "+966 53 111 2222",
    sector: "الإعلام",
    status: "متوقف",
    joinDate: "2022/03/20",
    projectsCount: 2,
    lastActivity: "2022/10/05",
    contact: "فاطمة العتيبي",
    website: "www.albayan.com",
  },
  {
    id: 5,
    name: "مجموعة الوادي",
    image: "/placeholder.svg",
    email: "contact@alwadi.com",
    phone: "+966 56 333 4444",
    sector: "العقارات",
    status: "نشط",
    joinDate: "2023/02/01",
    projectsCount: 6,
    lastActivity: "2023/04/12",
    contact: "عبدالله الحربي",
    website: "www.alwadi.com",
  },
];

const Clients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("الكل");
  const [selectedSector, setSelectedSector] = useState("الكل");
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  // تصفية العملاء بناءً على البحث والحالة والقطاع
  const filteredClients = clientsData.filter(client => 
    (client.name.includes(searchQuery) || 
    client.email.includes(searchQuery) || 
    client.contact.includes(searchQuery)) && 
    (selectedStatus === "الكل" || client.status === selectedStatus) &&
    (selectedSector === "الكل" || client.sector === selectedSector)
  );

  // تصفية العملاء حسب التبويب النشط
  const tabFilteredClients = activeTab === "all" 
    ? filteredClients 
    : activeTab === "active" 
      ? filteredClients.filter(client => client.status === "نشط")
      : filteredClients.filter(client => client.status !== "نشط");

  // دالة للتنقل بين الصفحات
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "نشط":
        return <Badge className="bg-green-600 hover:bg-green-700">{status}</Badge>;
      case "غير نشط":
        return <Badge className="bg-yellow-600 hover:bg-yellow-700">{status}</Badge>;
      case "متوقف":
        return <Badge className="bg-red-600 hover:bg-red-700">{status}</Badge>;
      default:
        return <Badge className="bg-gray-600 hover:bg-gray-700">{status}</Badge>;
    }
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
                  <Button variant="link" className="w-full justify-start gap-2 text-green-700">
                    <Users className="h-5 w-5" />
                    <span className="text-lg">العملاء</span>
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="w-full justify-start gap-2 text-gray-600 hover:text-green-700" onClick={() => handleNavigation("/settings")}>
                    <Settings className="h-5 w-5" />
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
              <h1 className="text-xl font-bold text-green-700 mr-2">إدارة العملاء</h1>
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
              <Button variant="ghost" size="icon" onClick={() => toast.info("تغيير الوضع الليلي")}>
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
              <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <h2 className="text-2xl font-bold mb-4 md:mb-0">قائمة العملاء</h2>
                
                <div className="flex flex-col md:flex-row gap-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-green-600 hover:bg-green-700 gap-2">
                        <span>إضافة عميل</span>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]" dir="rtl">
                      <DialogHeader>
                        <DialogTitle>إضافة عميل جديد</DialogTitle>
                        <DialogDescription>
                          أدخل معلومات العميل الجديد في النموذج أدناه.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="name" className="text-right">اسم العميل</label>
                          <Input id="name" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="email" className="text-right">البريد الإلكتروني</label>
                          <Input id="email" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="phone" className="text-right">رقم الهاتف</label>
                          <Input id="phone" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="sector" className="text-right">القطاع</label>
                          <Input id="sector" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="contact" className="text-right">جهة الاتصال</label>
                          <Input id="contact" className="col-span-3" />
                        </div>
                      </div>
                      <DialogFooter className="flex justify-start">
                        <Button type="button" variant="outline" onClick={() => toast.error("تم إلغاء إضافة العميل")}>
                          إلغاء
                        </Button>
                        <Button type="submit" onClick={() => {
                          toast.success("تم إضافة العميل بنجاح");
                        }}>
                          إضافة
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    className="pl-10 pr-4 py-2 w-full text-right" 
                    placeholder="ابحث عن عميل..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Select value={selectedSector} onValueChange={setSelectedSector}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="كل القطاعات" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="الكل">كل القطاعات</SelectItem>
                      <SelectItem value="تقنية المعلومات">تقنية المعلومات</SelectItem>
                      <SelectItem value="التجارة الإلكترونية">التجارة الإلكترونية</SelectItem>
                      <SelectItem value="الصناعة">الصناعة</SelectItem>
                      <SelectItem value="الإعلام">الإعلام</SelectItem>
                      <SelectItem value="العقارات">العقارات</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="كل الحالات" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="الكل">كل الحالات</SelectItem>
                      <SelectItem value="نشط">نشط</SelectItem>
                      <SelectItem value="غير نشط">غير نشط</SelectItem>
                      <SelectItem value="متوقف">متوقف</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
                <TabsList>
                  <TabsTrigger value="all">جميع العملاء</TabsTrigger>
                  <TabsTrigger value="active">العملاء النشطين</TabsTrigger>
                  <TabsTrigger value="inactive">العملاء غير النشطين</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-right">العميل</TableHead>
                        <TableHead className="text-right">معلومات الاتصال</TableHead>
                        <TableHead className="text-right">القطاع</TableHead>
                        <TableHead className="text-right">الحالة</TableHead>
                        <TableHead className="text-right">المشاريع</TableHead>
                        <TableHead className="text-right">آخر نشاط</TableHead>
                        <TableHead className="text-right">الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tabFilteredClients.length > 0 ? (
                        tabFilteredClients.map((client) => (
                          <TableRow key={client.id} onClick={() => toast.info(`تم النقر على العميل: ${client.name}`)}>
                            <TableCell>
                              <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden mr-3">
                                  <User className="h-6 w-6 text-gray-500" />
                                </div>
                                <div>
                                  <div className="font-medium">{client.name}</div>
                                  <div className="text-sm text-muted-foreground">منذ {client.joinDate}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <div className="flex items-center text-sm">
                                  <Mail className="h-4 w-4 ml-2" />
                                  {client.email}
                                </div>
                                <div className="flex items-center text-sm mt-1">
                                  <Phone className="h-4 w-4 ml-2" />
                                  {client.phone}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{client.sector}</TableCell>
                            <TableCell>{getStatusBadge(client.status)}</TableCell>
                            <TableCell>{client.projectsCount}</TableCell>
                            <TableCell>{client.lastActivity}</TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                                      <path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                    </svg>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => toast.info(`عرض العميل: ${client.name}`)}>
                                    عرض البيانات
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => toast.info(`تعديل العميل: ${client.name}`)}>
                                    <Edit className="ml-2 h-4 w-4" />
                                    تعديل
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600" onClick={() => toast.error(`حذف العميل: ${client.name}`)}>
                                    <Trash2 className="ml-2 h-4 w-4" />
                                    حذف
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-10">
                            <p className="text-gray-500 text-lg">لا يوجد عملاء متطابقين مع معايير البحث</p>
                            <Button 
                              variant="link" 
                              className="mt-4 text-green-600"
                              onClick={() => {
                                setSearchQuery("");
                                setSelectedStatus("الكل");
                                setSelectedSector("الكل");
                              }}
                            >
                              عرض جميع العملاء
                            </Button>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default Clients;

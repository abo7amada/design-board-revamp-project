
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell, ArrowDown, ArrowUp, Filter } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart as ReBarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { AppSidebar } from "@/components/shared/AppSidebar";

// بيانات وهمية للإحصائيات
const monthlyPostData = [
  { month: "يناير", count: 4 },
  { month: "فبراير", count: 7 },
  { month: "مارس", count: 5 },
  { month: "أبريل", count: 10 },
  { month: "مايو", count: 8 },
  { month: "يونيو", count: 12 },
  { month: "يوليو", count: 15 },
  { month: "أغسطس", count: 13 },
  { month: "سبتمبر", count: 9 },
  { month: "أكتوبر", count: 11 },
  { month: "نوفمبر", count: 14 },
  { month: "ديسمبر", count: 16 },
];

const categoryData = [
  { name: "منشورات", value: 45, color: "#8884d8" },
  { name: "تصاميم", value: 32, color: "#82ca9d" },
  { name: "مهام", value: 18, color: "#ffc658" },
  { name: "أخرى", value: 5, color: "#ff7300" },
];

const clientActivityData = [
  { name: "شركة الأفق الأخضر", posts: 22, designs: 18, tasks: 12 },
  { name: "مؤسسة نجمة الشمال", posts: 15, designs: 10, tasks: 8 },
  { name: "شركة الوفق الأصفر", posts: 8, designs: 4, tasks: 3 },
  { name: "شركة البيان", posts: 5, designs: 2, tasks: 1 },
];

const Statistics = () => {
  const [dateRange, setDateRange] = useState("year");
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen flex w-full" dir="rtl">
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        
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
              <h1 className="text-xl font-bold text-green-700 mr-2">لوحة الإحصائيات</h1>
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
                <h2 className="text-2xl font-bold">نظرة عامة على الإحصائيات</h2>
                
                <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="اختر الفترة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">الأسبوع الماضي</SelectItem>
                      <SelectItem value="month">الشهر الماضي</SelectItem>
                      <SelectItem value="quarter">ربع السنة الماضي</SelectItem>
                      <SelectItem value="year">السنة الماضية</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    <span>تصفية</span>
                  </Button>
                </div>
              </div>
              
              {/* Cards summaries */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">إجمالي المنشورات</p>
                        <h3 className="text-2xl font-bold mt-1">45</h3>
                        <div className="flex items-center mt-1 text-green-600 text-sm">
                          <ArrowUp className="h-4 w-4 mr-1" /> 
                          <span>12% زيادة</span>
                        </div>
                      </div>
                      <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="h-6 w-6 text-green-600" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 4.5H5V5.5H6V4.5ZM9 4.5H10V5.5H9V4.5ZM2 4.5C2 3.11929 3.11929 2 4.5 2H10.5C11.8807 2 13 3.11929 13 4.5V10.5C13 11.8807 11.8807 13 10.5 13H4.5C3.11929 13 2 11.8807 2 10.5V4.5ZM4.5 3C3.67157 3 3 3.67157 3 4.5V10.5C3 11.3284 3.67157 12 4.5 12H10.5C11.3284 12 12 11.3284 12 10.5V4.5C12 3.67157 11.3284 3 10.5 3H4.5ZM6 8.5H5V9.5H6V8.5ZM9 8.5H10V9.5H9V8.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">إجمالي التصاميم</p>
                        <h3 className="text-2xl font-bold mt-1">32</h3>
                        <div className="flex items-center mt-1 text-green-600 text-sm">
                          <ArrowUp className="h-4 w-4 mr-1" /> 
                          <span>8% زيادة</span>
                        </div>
                      </div>
                      <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg className="h-6 w-6 text-purple-600" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.5 1C11.7761 1 12 1.22386 12 1.5V13.5C12 13.7761 11.7761 14 11.5 14C11.2239 14 11 13.7761 11 13.5V1.5C11 1.22386 11.2239 1 11.5 1ZM9.5 3C9.77614 3 10 3.22386 10 3.5V13.5C10 13.7761 9.77614 14 9.5 14C9.22386 14 9 13.7761 9 13.5V3.5C9 3.22386 9.22386 3 9.5 3ZM13.5 3C13.7761 3 14 3.22386 14 3.5V13.5C14 13.7761 13.7761 14 13.5 14C13.2239 14 13 13.7761 13 13.5V3.5C13 3.22386 13.2239 3 13.5 3ZM7.5 5C7.77614 5 8 5.22386 8 5.5V13.5C8 13.7761 7.77614 14 7.5 14C7.22386 14 7 13.7761 7 13.5V5.5C7 5.22386 7.22386 5 7.5 5ZM5.5 7C5.77614 7 6 7.22386 6 7.5V13.5C6 13.7761 5.77614 14 5.5 14C5.22386 14 5 13.7761 5 13.5V7.5C5 7.22386 5.22386 7 5.5 7ZM3.5 9C3.77614 9 4 9.22386 4 9.5V13.5C4 13.7761 3.77614 14 3.5 14C3.22386 14 3 13.7761 3 13.5V9.5C3 9.22386 3.22386 9 3.5 9ZM1.5 11C1.77614 11 2 11.2239 2 11.5V13.5C2 13.7761 1.77614 14 1.5 14C1.22386 14 1 13.7761 1 13.5V11.5C1 11.2239 1.22386 11 1.5 11Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">العملاء النشطين</p>
                        <h3 className="text-2xl font-bold mt-1">15</h3>
                        <div className="flex items-center mt-1 text-green-600 text-sm">
                          <ArrowUp className="h-4 w-4 mr-1" /> 
                          <span>3 عملاء جدد</span>
                        </div>
                      </div>
                      <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="h-6 w-6 text-blue-600" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49549 7.98351C5.2997 8.12901 4.27556 8.55134 3.50407 9.31302C2.52216 10.2824 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7175 4.17091 9.9867C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98671C11.5721 10.7175 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.0749 12.975 13.8623 12.975 13.5999C12.975 11.72 12.4778 10.2824 11.4959 9.31301C10.7244 8.55135 9.70025 8.12903 8.50447 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">معدل الإنجاز</p>
                        <h3 className="text-2xl font-bold mt-1">92%</h3>
                        <div className="flex items-center mt-1 text-red-600 text-sm">
                          <ArrowDown className="h-4 w-4 mr-1" /> 
                          <span>3% انخفاض</span>
                        </div>
                      </div>
                      <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                        <svg className="h-6 w-6 text-yellow-600" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.8 9.5H9A3.5 3.5 0 0 0 12.5 6V2.5C12.5 1.67157 11.8284 1 11 1H4C3.17157 1 2.5 1.67157 2.5 2.5V6A3.5 3.5 0 0 0 6 9.5H6.2L4.4 12.2C4.14054 12.5889 4.28184 13.1187 4.67075 13.3782C4.68219 13.3857 4.69402 13.3929 4.7062 13.3998C5.05894 13.599 5.50167 13.4708 5.7 13.1173L8 9.85416L8.35416 10.4C8.6247 10.8 8.6247 11.3 8.35416 11.7L7.15 13.5C6.89037 13.8912 7.02148 14.4218 7.41265 14.6819C7.77539 14.8811 8.21812 14.7529 8.41645 14.3994L9.55228 12.6474C10.0856 11.8481 10.0856 10.7517 9.55228 9.95242L8.8 9.5ZM3.5 6V2.5C3.5 2.22386 3.72386 2 4 2H11C11.2761 2 11.5 2.22386 11.5 2.5V6C11.5 7.38071 10.3807 8.5 9 8.5H6C4.61929 8.5 3.5 7.38071 3.5 6Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Charts */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
                <TabsList className="mb-6">
                  <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
                  <TabsTrigger value="clients">العملاء</TabsTrigger>
                  <TabsTrigger value="content">المحتوى</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>منشورات شهرية</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={monthlyPostData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line 
                              type="monotone" 
                              dataKey="count" 
                              name="عدد المنشورات" 
                              stroke="#22c55e" 
                              activeDot={{ r: 8 }} 
                              strokeWidth={2} 
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>توزيع أنواع المحتوى</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                dataKey="value"
                                nameKey="name"
                                label={(entry) => entry.name}
                              >
                                {categoryData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>نشاط العملاء</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <ReBarChart
                              data={clientActivityData}
                              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="posts" name="منشورات" fill="#8884d8" />
                              <Bar dataKey="designs" name="تصاميم" fill="#82ca9d" />
                              <Bar dataKey="tasks" name="مهام" fill="#ffc658" />
                            </ReBarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="clients">
                  <Card>
                    <CardHeader>
                      <CardTitle>نشاط العملاء التفصيلي</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[500px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <ReBarChart
                            data={clientActivityData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                            layout="vertical"
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis dataKey="name" type="category" width={150} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="posts" name="منشورات" fill="#8884d8" stackId="a" />
                            <Bar dataKey="designs" name="تصاميم" fill="#82ca9d" stackId="a" />
                            <Bar dataKey="tasks" name="مهام" fill="#ffc658" stackId="a" />
                          </ReBarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="content">
                  <Card>
                    <CardHeader>
                      <CardTitle>تطور المحتوى عبر الزمن</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[500px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={[
                              { month: "يناير", posts: 4, designs: 2, tasks: 3 },
                              { month: "فبراير", posts: 7, designs: 5, tasks: 4 },
                              { month: "مارس", posts: 5, designs: 7, tasks: 6 },
                              { month: "أبريل", posts: 10, designs: 8, tasks: 7 },
                              { month: "مايو", posts: 8, designs: 5, tasks: 5 },
                              { month: "يونيو", posts: 12, designs: 10, tasks: 8 },
                            ]}
                            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="posts" name="منشورات" stroke="#8884d8" />
                            <Line type="monotone" dataKey="designs" name="تصاميم" stroke="#82ca9d" />
                            <Line type="monotone" dataKey="tasks" name="مهام" stroke="#ffc658" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default Statistics;

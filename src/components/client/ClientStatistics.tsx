
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent, 
  ChartLegend, 
  ChartLegendContent
} from "@/components/ui/chart";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

interface ClientStatisticsProps {
  clientId: number;
  postsData: any[];
  designsData: any[];
}

export const ClientStatistics = ({ clientId, postsData, designsData }: ClientStatisticsProps) => {
  // تصفية البيانات حسب العميل
  const clientPosts = postsData.filter(post => post.clientId === clientId);
  const clientDesigns = designsData.filter(design => design.clientId === clientId);

  // إحصائيات حسب المنصة
  const platformStats = [
    { name: "انستغرام", value: clientPosts.filter(post => post.platform === "انستغرام").length },
    { name: "تويتر", value: clientPosts.filter(post => post.platform === "تويتر").length },
    { name: "فيسبوك", value: clientPosts.filter(post => post.platform === "فيسبوك").length },
    { name: "لينكد إن", value: clientPosts.filter(post => post.platform === "لينكد إن").length || 0 }
  ].filter(item => item.value > 0);

  // إحصائيات حسب حالة التصميم
  const designStatusStats = [
    { name: "معتمد", value: clientDesigns.filter(design => design.category === "معتمد").length },
    { name: "قيد المراجعة", value: clientDesigns.filter(design => design.category === "قيد المراجعة").length },
    { name: "مسودة", value: clientDesigns.filter(design => design.category === "مسودة").length }
  ];

  // إحصائيات حسب حالة المنشور
  const postStatusStats = [
    { name: "منشور", value: clientPosts.filter(post => post.status === "منشور").length },
    { name: "مجدول", value: clientPosts.filter(post => post.status === "مجدول").length },
    { name: "مسودة", value: clientPosts.filter(post => post.status === "مسودة").length }
  ];

  // إحصائيات التفاعل (الإعجابات والتعليقات)
  const engagementStats = [
    { name: "الإعجابات", التصاميم: clientDesigns.reduce((sum, design) => sum + design.likes, 0), المنشورات: clientPosts.reduce((sum, post) => sum + post.likes, 0) },
    { name: "التعليقات", التصاميم: clientDesigns.reduce((sum, design) => sum + design.comments, 0), المنشورات: clientPosts.reduce((sum, post) => sum + post.comments, 0) },
    { name: "المشاركات", التصاميم: 0, المنشورات: clientPosts.reduce((sum, post) => sum + (post.shares || 0), 0) }
  ];

  // ألوان للرسوم البيانية
  const colors = ["#10b981", "#f59e0b", "#6366f1", "#ef4444", "#8b5cf6"];
  
  // تحويل الأشهر من الإنجليزية إلى العربية
  const getArabicMonth = (date: string) => {
    const months = {
      "01": "يناير",
      "02": "فبراير",
      "03": "مارس",
      "04": "أبريل",
      "05": "مايو",
      "06": "يونيو",
      "07": "يوليو",
      "08": "أغسطس",
      "09": "سبتمبر",
      "10": "أكتوبر",
      "11": "نوفمبر",
      "12": "ديسمبر"
    };
    
    // استخراج الشهر من التاريخ (بتنسيق yyyy/mm/dd)
    const month = date.split("/")[1];
    return months[month as keyof typeof months] || month;
  };

  // تجميع البيانات حسب الشهر للرسم البياني
  const getMonthlyStats = () => {
    const monthlyData: Record<string, { month: string; تصاميم: number; منشورات: number }> = {};
    
    // تجميع التصاميم حسب الشهر
    clientDesigns.forEach(design => {
      const month = design.date.substring(0, 7); // Extract YYYY/MM
      if (!monthlyData[month]) {
        monthlyData[month] = { 
          month: getArabicMonth(design.date), 
          تصاميم: 0, 
          منشورات: 0 
        };
      }
      monthlyData[month].تصاميم++;
    });
    
    // تجميع المنشورات حسب الشهر
    clientPosts.forEach(post => {
      const month = post.date.substring(0, 7); // Extract YYYY/MM
      if (!monthlyData[month]) {
        monthlyData[month] = { 
          month: getArabicMonth(post.date), 
          تصاميم: 0, 
          منشورات: 0 
        };
      }
      monthlyData[month].منشورات++;
    });
    
    // تحويل البيانات إلى مصفوفة
    return Object.values(monthlyData);
  };

  const monthlyStats = getMonthlyStats();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* إحصائيات عامة */}
      <Card>
        <CardHeader>
          <CardTitle>الإحصائيات العامة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-500">إجمالي المنشورات</p>
              <p className="text-3xl font-bold text-blue-700">{clientPosts.length}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-500">إجمالي التصاميم</p>
              <p className="text-3xl font-bold text-purple-700">{clientDesigns.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-500">إجمالي الإعجابات</p>
              <p className="text-3xl font-bold text-green-700">
                {clientPosts.reduce((sum, post) => sum + post.likes, 0) + 
                 clientDesigns.reduce((sum, design) => sum + design.likes, 0)}
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-500">إجمالي التعليقات</p>
              <p className="text-3xl font-bold text-orange-700">
                {clientPosts.reduce((sum, post) => sum + post.comments, 0) + 
                 clientDesigns.reduce((sum, design) => sum + design.comments, 0)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* توزيع المنشورات حسب المنصة */}
      <Card>
        <CardHeader>
          <CardTitle>المنشورات حسب المنصة</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer config={{ primary: { label: "المنصات" } }}>
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie
                data={platformStats}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={(entry) => `${entry.name}: ${entry.value}`}
              >
                {platformStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <ChartLegend content={<ChartLegendContent />} />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* إحصائيات التفاعل */}
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>إحصائيات التفاعل</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer config={{ تصاميم: { label: "التصاميم" }, المنشورات: { label: "المنشورات" } }}>
            <BarChart data={engagementStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="التصاميم" fill="#8b5cf6" />
              <Bar dataKey="المنشورات" fill="#3b82f6" />
              <ChartLegend content={<ChartLegendContent />} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* إحصائيات شهرية */}
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>الإحصائيات الشهرية</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer config={{ تصاميم: { label: "التصاميم" }, منشورات: { label: "المنشورات" } }}>
            <BarChart data={monthlyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="تصاميم" fill="#8b5cf6" />
              <Bar dataKey="منشورات" fill="#3b82f6" />
              <ChartLegend content={<ChartLegendContent />} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* حالة التصاميم */}
      <Card>
        <CardHeader>
          <CardTitle>حالة التصاميم</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer config={{ primary: { label: "الحالة" } }}>
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie
                data={designStatusStats}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={(entry) => `${entry.name}: ${entry.value}`}
              >
                <Cell fill="#10b981" />
                <Cell fill="#f59e0b" />
                <Cell fill="#6b7280" />
              </Pie>
              <ChartLegend content={<ChartLegendContent />} />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* حالة المنشورات */}
      <Card>
        <CardHeader>
          <CardTitle>حالة المنشورات</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer config={{ primary: { label: "الحالة" } }}>
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie
                data={postStatusStats}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={(entry) => `${entry.name}: ${entry.value}`}
              >
                <Cell fill="#10b981" />
                <Cell fill="#3b82f6" />
                <Cell fill="#6b7280" />
              </Pie>
              <ChartLegend content={<ChartLegendContent />} />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

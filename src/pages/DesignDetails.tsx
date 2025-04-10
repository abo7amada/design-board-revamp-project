
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/AppSidebar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Heart, MessageCircle, Download, Share2, Edit } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { designsData } from "@/components/data/mockData";
import { Design } from "@/types/design";

const DesignDetails = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");
  
  // استخدام بيانات التصميم من الحالة أو البحث عنها في البيانات
  const designFromState = location.state?.design as Design;
  const designFromData = designsData.find(d => d.id === parseInt(id || "0"));
  const design = designFromState || designFromData;
  
  useEffect(() => {
    // إذا لم يتم العثور على التصميم
    if (!design) {
      toast.error("لم يتم العثور على التصميم");
      navigate("/designs");
    }
  }, [design, navigate]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-SA", { 
      month: "long", 
      day: "numeric",
      year: "numeric"
    });
  };

  const handleBack = () => {
    navigate(-1);
  };
  
  // اذا لم يتم العثور على التصميم
  if (!design) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">لم يتم العثور على التصميم</h2>
          <Button onClick={() => navigate("/designs")}>العودة إلى التصاميم</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" dir="rtl">
      <SidebarProvider>
        <AppSidebar />
        
        <main className="flex-1 bg-white">
          <header className="bg-white border-b py-4 px-6 flex justify-between items-center">
            <Button 
              variant="ghost" 
              className="flex items-center gap-2" 
              onClick={handleBack}
            >
              <ArrowRight className="h-4 w-4" />
              <span>العودة</span>
            </Button>
            
            <h1 className="text-xl font-bold text-green-700">تفاصيل التصميم</h1>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Share2 className="h-4 w-4 ml-1" />
                <span>مشاركة</span>
              </Button>
              <Button variant="default" className="bg-green-600 hover:bg-green-700" size="sm">
                <Edit className="h-4 w-4 ml-1" />
                <span>تعديل</span>
              </Button>
            </div>
          </header>
          
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">{design.title}</h2>
              <p className="text-sm text-gray-500">
                تم الإنشاء بواسطة <span className="font-medium text-gray-700">{design.author}</span> في {formatDate(design.date)}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-2">
                <div className="bg-gray-100 rounded-lg overflow-hidden h-[400px]">
                  <img 
                    src={design.image || "/placeholder.svg"} 
                    alt={design.title} 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                </div>
              </div>
              
              <div>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">معلومات التصميم</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-gray-500">الحالة</span>
                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                          design.category === "معتمد" ? "bg-green-100 text-green-800" :
                          design.category === "قيد المراجعة" ? "bg-yellow-100 text-yellow-800" :
                          "bg-gray-100 text-gray-800"
                        }`}>{design.category}</span>
                      </div>
                      
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-gray-500">تاريخ الإنشاء</span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 ml-1 text-gray-400" />
                          {formatDate(design.date)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-gray-500">الإعجابات</span>
                        <span className="flex items-center">
                          <Heart className="h-4 w-4 ml-1 text-red-400" />
                          {design.likes}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-gray-500">التعليقات</span>
                        <span className="flex items-center">
                          <MessageCircle className="h-4 w-4 ml-1 text-blue-400" />
                          {design.comments}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-6 space-y-3">
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <Download className="h-4 w-4 ml-2" />
                        تحميل التصميم
                      </Button>
                      
                      <Button variant="outline" className="w-full">
                        <MessageCircle className="h-4 w-4 ml-2" />
                        بدء محادثة
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
              <TabsList className="mb-6">
                <TabsTrigger value="details">تفاصيل</TabsTrigger>
                <TabsTrigger value="comments">التعليقات</TabsTrigger>
                <TabsTrigger value="history">سجل التغييرات</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">وصف التصميم</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {design.description || "لا يوجد وصف للتصميم حاليًا."}
                    </p>
                    
                    <h3 className="text-lg font-semibold mt-6 mb-4">الملاحظات الفنية</h3>
                    <div className="bg-gray-50 rounded-lg p-4 text-gray-600">
                      <p>تم استخدام الألوان الرسمية للشركة في التصميم مع مراعاة توافقها مع معايير العلامة التجارية.</p>
                      <p className="mt-2">أبعاد التصميم: 1200 × 800 بكسل</p>
                      <p className="mt-2">صيغة الملف: JPEG</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="comments">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">التعليقات</h3>
                    <div className="text-center py-6 text-gray-500">
                      لا توجد تعليقات حتى الآن.
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="history">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">سجل التغييرات</h3>
                    <div className="text-center py-6 text-gray-500">
                      لا توجد تغييرات مسجلة.
                    </div>
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

export default DesignDetails;

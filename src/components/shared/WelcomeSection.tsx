
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, Layout, Users, PieChart, Calendar, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const WelcomeSection = () => {
  const navigate = useNavigate();
  
  const quickLinks = [
    { title: "التصاميم", icon: <Layout className="h-5 w-5" />, path: "/designs", color: "bg-blue-50 text-blue-600" },
    { title: "العملاء", icon: <Users className="h-5 w-5" />, path: "/clients", color: "bg-green-50 text-green-600" },
    { title: "الإحصائيات", icon: <PieChart className="h-5 w-5" />, path: "/statistics", color: "bg-purple-50 text-purple-600" },
    { title: "التقويم", icon: <Calendar className="h-5 w-5" />, path: "/calendar", color: "bg-amber-50 text-amber-600" },
    { title: "الإعدادات", icon: <Settings className="h-5 w-5" />, path: "/settings", color: "bg-gray-50 text-gray-600" },
  ];

  return (
    <div className="mb-10">
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-none shadow-sm overflow-hidden">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3">
              <h1 className="text-3xl font-bold text-gray-800 mb-3">مرحبًا بك في نظام إدارة التصاميم والمحتوى</h1>
              <p className="text-gray-600 mb-6">
                منصة متكاملة لإدارة التصاميم والمنشورات لعملائك بكفاءة عالية،
                مع إمكانية النشر مباشرة على منصات التواصل الاجتماعي.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button 
                  size="lg" 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => navigate("/add-design")}
                >
                  إنشاء تصميم جديد
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate("/add-post")}
                >
                  إنشاء منشور جديد
                </Button>
              </div>
            </div>
            <div className="md:w-1/3 mt-6 md:mt-0 flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3" 
                alt="تصميم احترافي" 
                className="rounded-lg shadow-lg max-w-[250px]"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">الوصول السريع</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {quickLinks.map((link, index) => (
            <Card 
              key={index} 
              className="cursor-pointer hover:shadow-md transition-all duration-300"
              onClick={() => navigate(link.path)}
            >
              <CardContent className="p-5 flex flex-col items-center text-center">
                <div className={`p-3 rounded-full ${link.color} mb-3`}>
                  {link.icon}
                </div>
                <h3 className="font-medium mb-1">{link.title}</h3>
                <Button 
                  variant="link" 
                  className="p-0 h-auto flex items-center text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(link.path);
                  }}
                >
                  الانتقال
                  <ChevronLeft className="h-4 w-4 mr-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

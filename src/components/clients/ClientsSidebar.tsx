
import { useNavigate } from "react-router-dom";
import { BarChart, Bell, Calendar, Home, LayoutGrid, PencilRuler, Settings, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const ClientsSidebar = () => {
  const navigate = useNavigate();

  // دالة للتنقل بين الصفحات
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
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
  );
};

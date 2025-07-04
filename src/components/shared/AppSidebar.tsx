
import { useNavigate, useLocation } from "react-router-dom";
import { BarChart, Calendar, Home, Settings, Users, LogOut, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut, user } = useAuth();

  // دالة للتنقل بين الصفحات
  const handleNavigation = (path: string) => {
    console.log("Navigating to:", path);
    navigate(path);
  };

  // التحقق من المسار الحالي لتمييز الزر النشط
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // دالة تسجيل الخروج
  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
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
              <Button 
                variant="link" 
                className={`w-full justify-start gap-2 ${isActive("/") ? "text-green-700" : "text-gray-600 hover:text-green-700"}`} 
                onClick={() => handleNavigation("/")}
              >
                <Home className="h-5 w-5" />
                <span className="text-lg">الرئيسية</span>
              </Button>
            </li>
            <li>
              <Button 
                variant="link" 
                className={`w-full justify-start gap-2 ${isActive("/clients") ? "text-green-700" : "text-gray-600 hover:text-green-700"}`} 
                onClick={() => handleNavigation("/clients")}
              >
                <Users className="h-5 w-5" />
                <span className="text-lg">العملاء</span>
              </Button>
            </li>
            <li>
              <Button 
                variant="link" 
                className={`w-full justify-start gap-2 ${isActive("/calendar") ? "text-green-700" : "text-gray-600 hover:text-green-700"}`} 
                onClick={() => handleNavigation("/calendar")}
              >
                <Calendar className="h-5 w-5" />
                <span className="text-lg">التقويم</span>
              </Button>
            </li>
            <li>
              <Button 
                variant="link" 
                className={`w-full justify-start gap-2 ${isActive("/statistics") ? "text-green-700" : "text-gray-600 hover:text-green-700"}`} 
                onClick={() => handleNavigation("/statistics")}
              >
                <BarChart className="h-5 w-5" />
                <span className="text-lg">الإحصائيات</span>
              </Button>
            </li>
            <li>
              <Button 
                variant="link" 
                className={`w-full justify-start gap-2 ${isActive("/social-integrations") ? "text-green-700" : "text-gray-600 hover:text-green-700"}`} 
                onClick={() => handleNavigation("/social-integrations")}
              >
                <Share2 className="h-5 w-5" />
                <span className="text-lg">المنصات الاجتماعية</span>
              </Button>
            </li>
            <li>
              <Button 
                variant="link" 
                className={`w-full justify-start gap-2 ${isActive("/settings") ? "text-green-700" : "text-gray-600 hover:text-green-700"}`} 
                onClick={() => handleNavigation("/settings")}
              >
                <Settings className="h-5 w-5" />
                <span className="text-lg">الإعدادات</span>
              </Button>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 border-t space-y-2">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-gray-200 relative overflow-hidden">
                <img src="/lovable-uploads/10fc914b-5004-4050-8edd-e2273f4b215d.png" alt="Profile" className="h-full w-full object-cover" />
              </div>
            </div>
            <div className="mr-3">
              <p className="text-sm font-medium">{user?.user_metadata?.full_name || 'مستخدم'}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start gap-2 text-gray-600 hover:text-red-600"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4" />
            <span>تسجيل الخروج</span>
          </Button>
        </div>
      </div>
    </aside>
  );
};

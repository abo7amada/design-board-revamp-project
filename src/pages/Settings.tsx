
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/AppSidebar";
import { UserProfile } from "@/components/auth/UserProfile";

const Settings = () => {
  return (
    <div className="min-h-screen flex w-full" dir="rtl">
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        
        {/* Main content */}
        <main className="flex-1 bg-gray-50">
          {/* Header */}
          <header className="bg-white border-b py-4 px-6">
            <h1 className="text-xl font-bold text-green-700">الإعدادات</h1>
            <p className="text-gray-600 text-sm mt-1">إدارة إعدادات حسابك وتفضيلاتك</p>
          </header>
          
          {/* Content */}
          <div className="p-6">
            <div className="max-w-4xl mx-auto">
              <UserProfile />
            </div>
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default Settings;
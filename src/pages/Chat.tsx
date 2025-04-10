
import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import ChatList from "@/components/chat/ChatList";
import MessagePanel from "@/components/chat/MessagePanel";
import { AppSidebar } from "@/components/shared/AppSidebar";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users } from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";

const Chat = () => {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [activeDesign, setActiveDesign] = useState<{id: number, title: string} | null>(null);
  const location = useLocation();
  
  // Listen for edit request tab events
  useEffect(() => {
    const handleEditRequestTab = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.designId) {
        console.log("Opening edit request tab for design:", customEvent.detail.designId);
        // Handle any additional actions if needed
      }
    };
    
    document.addEventListener('openEditRequestTab', handleEditRequestTab);
    
    return () => {
      document.removeEventListener('openEditRequestTab', handleEditRequestTab);
    };
  }, []);
  
  // Handle location state for design discussions
  useEffect(() => {
    if (location.state && location.state.designId && location.state.designTitle) {
      setActiveDesign({
        id: location.state.designId,
        title: location.state.designTitle
      });
      setIsPanelOpen(true);
    }
  }, [location.state]);
  
  const handleOpenPanel = (designId: number, designTitle: string) => {
    setActiveDesign({id: designId, title: designTitle});
    setIsPanelOpen(true);
  };
  
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex">
        <AppSidebar />
        
        <div className="flex flex-1 overflow-hidden">
          <ChatList />
          
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">نظام المحادثات</h1>
                <div className="flex gap-2">
                  <Button onClick={() => toast.info("عرض المستخدمين النشطين")}>
                    <Users className="h-4 w-4 ml-2" />
                    المستخدمون النشطون
                  </Button>
                  <Button variant="outline" onClick={() => handleOpenPanel(1, "إطلاق منتج جديد")}>
                    <MessageSquare className="h-4 w-4 ml-2" />
                    مناقشة تصميم
                  </Button>
                </div>
              </div>
              
              <div className="grid gap-6">
                <div className="border rounded-lg p-6 bg-card">
                  <h2 className="text-xl font-semibold mb-4">مرحبًا بك في نظام المحادثات</h2>
                  <p className="text-muted-foreground mb-4">
                    يمكنك هنا التواصل مع فريقك ومناقشة التصاميم والمشاريع بكل سهولة.
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="border rounded-md p-4">
                      <h3 className="font-medium mb-2">القنوات العامة</h3>
                      <p className="text-sm text-muted-foreground">
                        انضم إلى القنوات العامة لمناقشة المواضيع المختلفة مع الفريق بأكمله.
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-4"
                        onClick={() => toast.info("تم الانضمام إلى القنوات العامة")}
                      >
                        استعرض القنوات
                      </Button>
                    </div>
                    <div className="border rounded-md p-4">
                      <h3 className="font-medium mb-2">المحادثات الخاصة</h3>
                      <p className="text-sm text-muted-foreground">
                        تواصل مباشرة مع أعضاء الفريق لمناقشة التفاصيل الخاصة بالمشاريع.
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-4"
                        onClick={() => toast.info("تم فتح المحادثات الخاصة")}
                      >
                        بدء محادثة جديدة
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-6 bg-card">
                  <h2 className="text-xl font-semibold mb-4">آخر التصاميم للمناقشة</h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      { id: 1, title: "إطلاق منتج جديد", category: "إعلان" },
                      { id: 2, title: "حملة تسويقية رمضانية", category: "سوشيال ميديا" },
                      { id: 3, title: "واجهة تطبيق المتجر", category: "واجهة مستخدم" },
                      { id: 4, title: "شعار شركة ناشئة", category: "هوية بصرية" }
                    ].map((design) => (
                      <div key={design.id} className="border rounded-md p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{design.title}</h3>
                          <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-md">
                            {design.category}
                          </span>
                        </div>
                        <Button 
                          size="sm" 
                          className="w-full mt-2"
                          onClick={() => handleOpenPanel(design.id, design.title)}
                        >
                          <MessageSquare className="h-4 w-4 ml-2" />
                          بدء مناقشة
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
          
          {activeDesign && (
            <MessagePanel 
              isOpen={isPanelOpen} 
              onClose={() => setIsPanelOpen(false)} 
              designId={activeDesign.id}
              designTitle={activeDesign.title}
            />
          )}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Chat;

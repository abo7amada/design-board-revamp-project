
import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import ChatList from "@/components/chat/ChatList";
import MessagePanel from "@/components/chat/MessagePanel";
import { AppSidebar } from "@/components/shared/AppSidebar";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users } from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";
import WhatsappIntegrationPanel from "@/components/chat/WhatsappIntegrationPanel";
import { ChatChannels } from "@/components/chat/ChatChannels";
import ActiveMembersPanel from "@/components/chat/ActiveMembersPanel";

const Chat = () => {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [activeDesign, setActiveDesign] = useState<{id: string, title: string} | null>(null);
  const [isWhatsappPanelOpen, setIsWhatsappPanelOpen] = useState(false);
  const [showChannels, setShowChannels] = useState(true);
  const [isActiveMembersPanelOpen, setIsActiveMembersPanelOpen] = useState(false);
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
  
  const handleOpenPanel = (designId: string, designTitle: string) => {
    setActiveDesign({id: designId, title: designTitle});
    setIsPanelOpen(true);
  };

  const handleOpenWhatsappPanel = () => {
    setIsWhatsappPanelOpen(true);
  };
  
  const handleShowActiveMembers = () => {
    setIsActiveMembersPanelOpen(true);
  };
  
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex">
        <AppSidebar />
        
        <div className="flex flex-1 overflow-hidden">
          {/* Channels Sidebar */}
          <div className={`md:block ${showChannels ? 'block' : 'hidden'} w-full md:w-64 shrink-0 border-l bg-white overflow-hidden`}>
            <ChatChannels />
          </div>
          
          {/* Chat List */}
          <div className={`md:block ${!showChannels ? 'block' : 'hidden'} md:block w-full md:w-72 shrink-0 border-l bg-white overflow-hidden`}>
            <div className="h-full flex flex-col">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="font-bold text-lg">المحادثات</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="md:hidden"
                  onClick={() => setShowChannels(true)}
                >
                  عرض القنوات
                </Button>
              </div>
              <div className="flex-grow overflow-y-auto">
                <ChatList />
              </div>
            </div>
          </div>
          
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">نظام المحادثات</h1>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="md:hidden ml-2"
                    onClick={() => setShowChannels(!showChannels)}
                  >
                    {showChannels ? 'عرض المحادثات' : 'عرض القنوات'}
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleShowActiveMembers}>
                    <Users className="h-4 w-4 ml-2" />
                    المستخدمون النشطون
                  </Button>
                  <Button variant="outline" onClick={() => handleOpenPanel("1", "إطلاق منتج جديد")}>
                    <MessageSquare className="h-4 w-4 ml-2" />
                    مناقشة تصميم
                  </Button>
                  <Button 
                    variant="default" 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={handleOpenWhatsappPanel}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 ml-2" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                      <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                      <path d="M12 17c3.5 0 5-2 5-5" />
                    </svg>
                    تكامل واتساب
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
                        onClick={() => setShowChannels(true)}
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
                      { id: "1", title: "إطلاق منتج جديد", category: "إعلان" },
                      { id: "2", title: "حملة تسويقية رمضانية", category: "سوشيال ميديا" },
                      { id: "3", title: "واجهة تطبيق المتجر", category: "واجهة مستخدم" },
                      { id: "4", title: "شعار شركة ناشئة", category: "هوية بصرية" }
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

                <div className="border rounded-lg p-6 bg-green-50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-green-600 p-2 rounded-full">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6 text-white" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                        <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                        <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                        <path d="M12 17c3.5 0 5-2 5-5" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-semibold">تكامل الواتساب</h2>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    يمكنك الآن مراقبة واستقبال طلبات تعديل التصاميم من الواتساب مباشرة في المنصة.
                  </p>
                  <Button 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={handleOpenWhatsappPanel}
                  >
                    عرض طلبات الواتساب
                  </Button>
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

          <WhatsappIntegrationPanel 
            isOpen={isWhatsappPanelOpen} 
            onClose={() => setIsWhatsappPanelOpen(false)} 
          />

          <ActiveMembersPanel 
            isOpen={isActiveMembersPanelOpen}
            onClose={() => setIsActiveMembersPanelOpen(false)}
          />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Chat;

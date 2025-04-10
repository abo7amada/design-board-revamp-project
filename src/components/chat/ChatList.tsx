
import { useState } from "react";
import { Search, Plus, MessageSquare, Users, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarInput,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: Date;
  unread: number;
  avatar?: string;
  isChannel: boolean;
}

const ChatList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "channel1",
      name: "# تصاميم-عامة",
      lastMessage: "تم إضافة تصميم جديد للمراجعة",
      timestamp: new Date(Date.now() - 3600000 * 2),
      unread: 3,
      isChannel: true
    },
    {
      id: "channel2",
      name: "# إعلانات-سوشيال",
      lastMessage: "موعد تسليم حملة رمضان الأسبوع القادم",
      timestamp: new Date(Date.now() - 3600000 * 8),
      unread: 0,
      isChannel: true
    },
    {
      id: "dm1",
      name: "أحمد محمد",
      lastMessage: "شكراً لك، سأراجع التصميم قريباً",
      timestamp: new Date(Date.now() - 3600000 * 4),
      unread: 1,
      avatar: "https://i.pravatar.cc/150?img=1",
      isChannel: false
    },
    {
      id: "dm2",
      name: "سارة علي",
      lastMessage: "هل يمكنك إرسال نسخة معدلة من التصميم؟",
      timestamp: new Date(Date.now() - 3600000 * 24),
      unread: 0,
      avatar: "https://i.pravatar.cc/150?img=5",
      isChannel: false
    },
  ]);
  
  const formatChatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const oneDay = 24 * 60 * 60 * 1000;
    
    if (diff < 60 * 60 * 1000) {
      const minutes = Math.floor(diff / (60 * 1000));
      return `${minutes} د`;
    } else if (diff < oneDay) {
      const hours = Math.floor(diff / (60 * 60 * 1000));
      return `${hours} س`;
    } else {
      const days = Math.floor(diff / oneDay);
      return `${days} ي`;
    }
  };
  
  const filteredChats = chats.filter((chat) => 
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleChatClick = (chatId: string) => {
    // Update the unread count
    setChats(chats.map((chat) => 
      chat.id === chatId ? { ...chat, unread: 0 } : chat
    ));
    
    toast.info(`تم فتح المحادثة: ${chats.find(c => c.id === chatId)?.name}`);
  };
  
  const handleCreateChat = () => {
    toast.info("سيتم فتح نافذة إنشاء محادثة جديدة");
  };
  
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center justify-between p-2">
          <h2 className="text-lg font-bold">المحادثات</h2>
          <Button variant="ghost" size="icon" onClick={handleCreateChat}>
            <Plus className="h-5 w-5" />
          </Button>
        </div>
        <div className="px-2 pb-2">
          <SidebarInput 
            placeholder="بحث في المحادثات..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>القنوات</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredChats
                .filter((chat) => chat.isChannel)
                .map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton 
                    onClick={() => handleChatClick(chat.id)}
                    className="w-full justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      <span className="truncate">{chat.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {chat.unread > 0 && (
                        <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">
                          {chat.unread}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {formatChatTime(chat.timestamp)}
                      </span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>الرسائل المباشرة</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredChats
                .filter((chat) => !chat.isChannel)
                .map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton 
                    onClick={() => handleChatClick(chat.id)}
                    className="w-full justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        {chat.avatar && <AvatarImage src={chat.avatar} alt={chat.name} />}
                        <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="truncate">{chat.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {chat.unread > 0 && (
                        <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">
                          {chat.unread}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {formatChatTime(chat.timestamp)}
                      </span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="flex justify-between p-2">
          <Button variant="ghost" size="icon" onClick={() => toast.info("عرض جميع المستخدمين")}>
            <Users className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => toast.info("فتح إعدادات المحادثات")}>
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default ChatList;

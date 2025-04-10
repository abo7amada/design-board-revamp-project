
import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Paperclip, Smile, AtSign } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { arSA } from "date-fns/locale";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: Date;
  reactions?: { emoji: string; count: number }[];
  attachments?: { name: string; url: string; type: string }[];
}

interface MessagePanelProps {
  isOpen: boolean;
  onClose: () => void;
  designId?: number;
  designTitle?: string;
}

const MessagePanel = ({ isOpen, onClose, designId, designTitle }: MessagePanelProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "مرحبًا، ما رأيك في هذا التصميم؟",
      sender: {
        id: "user1",
        name: "أحمد محمد",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      timestamp: new Date(Date.now() - 3600000 * 24),
    },
    {
      id: "2",
      content: "يبدو رائعًا! أحب الألوان المستخدمة.",
      sender: {
        id: "user2",
        name: "سارة علي",
        avatar: "https://i.pravatar.cc/150?img=5",
      },
      timestamp: new Date(Date.now() - 3600000 * 12),
    },
    {
      id: "3",
      content: "هل يمكننا تغيير الخط؟ أعتقد أنه يحتاج إلى تحسين.",
      sender: {
        id: "user3",
        name: "محمد أحمد",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
      timestamp: new Date(Date.now() - 3600000 * 2),
      reactions: [{ emoji: "👍", count: 2 }],
    },
  ]);
  
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: {
        id: "currentUser",
        name: "أنت",
      },
      timestamp: new Date(),
    };
    
    setMessages([...messages, message]);
    setNewMessage("");
    toast.success("تم إرسال الرسالة");
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const formatMessageTime = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true, locale: arSA });
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="w-full md:w-[400px] sm:max-w-full p-0 flex flex-col h-full">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="text-right">محادثة حول: {designTitle}</SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender.id === "currentUser" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex gap-2 max-w-[80%] ${message.sender.id === "currentUser" ? "flex-row-reverse" : "flex-row"}`}>
                <Avatar className="h-8 w-8">
                  {message.sender.avatar && <AvatarImage src={message.sender.avatar} alt={message.sender.name} />}
                  <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div>
                  <div className={`flex items-center gap-2 ${message.sender.id === "currentUser" ? "justify-end" : "justify-start"}`}>
                    <span className="text-sm font-medium">{message.sender.name}</span>
                    <span className="text-xs text-muted-foreground">{formatMessageTime(message.timestamp)}</span>
                  </div>
                  
                  <div className={`mt-1 p-3 rounded-lg ${
                    message.sender.id === "currentUser" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted"
                  }`}>
                    {message.content}
                  </div>
                  
                  {message.reactions && message.reactions.length > 0 && (
                    <div className="flex gap-1 mt-1">
                      {message.reactions.map((reaction, index) => (
                        <div key={index} className="bg-background border rounded-full px-2 py-0.5 text-xs flex items-center gap-1">
                          <span>{reaction.emoji}</span>
                          <span>{reaction.count}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t">
          <div className="flex items-end gap-2">
            <Textarea 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="اكتب رسالة..."
              className="resize-none"
              rows={2}
            />
            <div className="flex flex-col gap-2">
              <Button 
                type="button" 
                size="icon" 
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
              <Button type="button" size="icon" variant="outline">
                <Paperclip className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <AtSign className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Smile className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MessagePanel;

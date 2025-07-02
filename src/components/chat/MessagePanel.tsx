
import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Paperclip, Smile, AtSign, Image } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { arSA } from "date-fns/locale";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
  isDesignRequest?: boolean;
}

interface MessagePanelProps {
  isOpen: boolean;
  onClose: () => void;
  designId?: string;
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
  const [activeTab, setActiveTab] = useState("chat");
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [feedbackDescription, setFeedbackDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const handleSendFeedback = () => {
    if (!feedbackTitle.trim() || !feedbackDescription.trim()) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }
    
    const message: Message = {
      id: Date.now().toString(),
      content: `**طلب تعديل:** ${feedbackTitle}\n\n${feedbackDescription}${selectedFile ? '\n\nتم إرفاق ملف: ' + selectedFile.name : ''}`,
      sender: {
        id: "currentUser",
        name: "أنت",
      },
      timestamp: new Date(),
      isDesignRequest: true,
    };
    
    setMessages([...messages, message]);
    setFeedbackTitle("");
    setFeedbackDescription("");
    setSelectedFile(null);
    setActiveTab("chat");
    toast.success("تم إرسال طلب التعديل بنجاح");
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
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
        
        <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="mx-4 mt-2">
            <TabsTrigger value="chat" className="flex-1">المحادثة</TabsTrigger>
            <TabsTrigger value="edit-request" className="flex-1">طلب تعديل</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="flex-1 flex flex-col">
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
                        message.isDesignRequest 
                          ? "bg-amber-100 text-amber-900 border border-amber-300" 
                          : message.sender.id === "currentUser" 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted"
                      }`}>
                        {message.isDesignRequest ? (
                          <div className="whitespace-pre-wrap">{message.content}</div>
                        ) : (
                          message.content
                        )}
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
          </TabsContent>
          
          <TabsContent value="edit-request" className="p-4 space-y-4 flex-1 overflow-y-auto">
            <div>
              <Label htmlFor="edit-title" className="block text-right mb-2">عنوان التعديل</Label>
              <Input
                id="edit-title"
                value={feedbackTitle}
                onChange={(e) => setFeedbackTitle(e.target.value)}
                placeholder="ملخص قصير للتعديل المطلوب"
                className="text-right"
              />
            </div>
            <div>
              <Label htmlFor="edit-description" className="block text-right mb-2">تفاصيل التعديل المطلوب</Label>
              <Textarea
                id="edit-description"
                value={feedbackDescription}
                onChange={(e) => setFeedbackDescription(e.target.value)}
                placeholder="اشرح بالتفصيل التعديلات التي تحتاجها على التصميم"
                className="resize-none text-right min-h-[150px]"
              />
            </div>
            <div>
              <Label className="block text-right mb-2">ارفاق صورة (اختياري)</Label>
              <div className="flex gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={handleFileSelect}
                >
                  <Image className="h-4 w-4" />
                  {selectedFile ? selectedFile.name : "اختر صورة"}
                </Button>
                {selectedFile && (
                  <Button 
                    type="button" 
                    variant="destructive" 
                    size="icon"
                    onClick={() => setSelectedFile(null)}
                  >
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                      <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  </Button>
                )}
              </div>
            </div>
            
            <Button 
              className="w-full mt-6" 
              onClick={handleSendFeedback}
              disabled={!feedbackTitle.trim() || !feedbackDescription.trim()}
            >
              إرسال طلب التعديل
            </Button>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default MessagePanel;

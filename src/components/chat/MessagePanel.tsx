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
import { useChat } from "@/hooks/useChat";
import { useAuth } from "@/contexts/AuthContext";

interface MessagePanelProps {
  isOpen: boolean;
  onClose: () => void;
  designId?: string;
  designTitle?: string;
}

const MessagePanel = ({ isOpen, onClose, designId, designTitle }: MessagePanelProps) => {
  const { user } = useAuth();
  const { messages, loading, sendMessage, activeChatRoom } = useChat();
  
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
  
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !activeChatRoom) return;
    
    try {
      await sendMessage(activeChatRoom, newMessage);
      setNewMessage("");
      toast.success("تم إرسال الرسالة");
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error("خطأ في إرسال الرسالة");
    }
  };

  const handleSendFeedback = async () => {
    if (!feedbackTitle.trim() || !feedbackDescription.trim() || !activeChatRoom) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }
    
    try {
      const feedbackContent = `**طلب تعديل:** ${feedbackTitle}\n\n${feedbackDescription}${selectedFile ? '\n\nتم إرفاق ملف: ' + selectedFile.name : ''}`;
      
      await sendMessage(activeChatRoom, feedbackContent, 'design_discussion', designId);
      
      setFeedbackTitle("");
      setFeedbackDescription("");
      setSelectedFile(null);
      setActiveTab("chat");
      toast.success("تم إرسال طلب التعديل بنجاح");
    } catch (error) {
      console.error('Error sending feedback:', error);
      toast.error("خطأ في إرسال طلب التعديل");
    }
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
  
  const formatMessageTime = (date: string) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: arSA });
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
              {loading ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">جاري تحميل الرسائل...</p>
                </div>
              ) : messages.length > 0 ? (
                messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.user_id === user?.id ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex gap-2 max-w-[80%] ${message.user_id === user?.id ? "flex-row-reverse" : "flex-row"}`}>
                      <Avatar className="h-8 w-8">
                        {message.user_profile?.avatar_url && <AvatarImage src={message.user_profile.avatar_url} alt={message.user_profile.full_name || 'User'} />}
                        <AvatarFallback>{(message.user_profile?.full_name || 'U').charAt(0)}</AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <div className={`flex items-center gap-2 ${message.user_id === user?.id ? "justify-end" : "justify-start"}`}>
                          <span className="text-sm font-medium">{message.user_profile?.full_name || 'مستخدم'}</span>
                          <span className="text-xs text-muted-foreground">{formatMessageTime(message.created_at)}</span>
                        </div>
                        
                        <div className={`mt-1 p-3 rounded-lg ${
                          message.message_type === 'design_discussion' 
                            ? "bg-amber-100 text-amber-900 border border-amber-300" 
                            : message.user_id === user?.id 
                              ? "bg-primary text-primary-foreground" 
                              : "bg-muted"
                        }`}>
                          {message.message_type === 'design_discussion' ? (
                            <div className="whitespace-pre-wrap">{message.content}</div>
                          ) : (
                            message.content
                          )}
                          
                          {message.design && (
                            <div className="mt-2 p-2 bg-white/10 rounded border">
                              <span className="text-xs">تصميم: {message.design.title}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">لا توجد رسائل بعد</p>
                </div>
              )}
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
                    disabled={!newMessage.trim() || loading}
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
              disabled={!feedbackTitle.trim() || !feedbackDescription.trim() || loading}
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
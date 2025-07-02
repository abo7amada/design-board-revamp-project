
import { useState, useEffect } from "react";
import { X, Search, ChevronRight, Image, Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// Mock data for WhatsApp messages
const mockWhatsappMessages = [
  {
    id: 1,
    designId: 2,
    designTitle: "حملة تسويقية رمضانية",
    clientName: "أحمد محمد",
    phoneNumber: "+966 50 123 4567",
    message: "أريد تغيير ألوان الخلفية للتصميم لتكون أكثر دفئاً وتتماشى مع موضوع رمضان",
    timestamp: "2023-05-10T14:30:00",
    status: "pending", // pending, in-progress, completed
    attachments: [
      {
        id: 1,
        type: "image",
        url: "/placeholder.svg",
        name: "reference.jpg"
      }
    ]
  },
  {
    id: 2,
    designId: 1,
    designTitle: "إطلاق منتج جديد",
    clientName: "سارة أحمد",
    phoneNumber: "+966 55 987 6543",
    message: "هل يمكن إضافة شعار الشركة في الزاوية العلوية وتكبير حجم النص الرئيسي؟",
    timestamp: "2023-05-09T11:15:00",
    status: "in-progress",
    attachments: []
  },
  {
    id: 3,
    designId: 4,
    designTitle: "شعار شركة ناشئة",
    clientName: "محمد خالد",
    phoneNumber: "+966 54 567 8901",
    message: "أعجبني الشعار لكن أريد تجربة ألوان مختلفة. هل يمكن رؤية نسخة باللون الأزرق بدلاً من الأخضر؟",
    timestamp: "2023-05-08T16:45:00",
    status: "completed",
    attachments: []
  },
  {
    id: 4,
    designId: 3,
    designTitle: "واجهة تطبيق المتجر",
    clientName: "فاطمة علي",
    phoneNumber: "+966 56 234 5678",
    message: "أحتاج تعديل على ترتيب الأزرار في الصفحة الرئيسية وتغيير الخط للعناوين",
    timestamp: "2023-05-07T09:20:00",
    status: "pending",
    attachments: [
      {
        id: 2,
        type: "image",
        url: "/placeholder.svg",
        name: "screenshot.png"
      }
    ]
  }
];

interface WhatsappIntegrationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const WhatsappIntegrationPanel = ({ isOpen, onClose }: WhatsappIntegrationPanelProps) => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  // Filter messages based on search query and tab
  const filteredMessages = mockWhatsappMessages.filter(message => {
    const matchesSearch = 
      message.designTitle.includes(searchQuery) || 
      message.clientName.includes(searchQuery) || 
      message.message.includes(searchQuery);
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "pending") return matchesSearch && message.status === "pending";
    if (activeTab === "in-progress") return matchesSearch && message.status === "in-progress";
    if (activeTab === "completed") return matchesSearch && message.status === "completed";
    
    return matchesSearch;
  });

  const handleSelectMessage = (id: number) => {
    setSelectedMessage(id);
    
    // Simulate read status update
    toast.success("تم تحديث حالة الرسالة إلى مقروءة");
  };

  const handleStatusChange = (id: number, newStatus: "pending" | "in-progress" | "completed") => {
    // In a real app, this would make an API call to update the message status
    toast.success(`تم تحديث حالة الطلب إلى ${
      newStatus === "pending" ? "قيد الانتظار" :
      newStatus === "in-progress" ? "قيد التنفيذ" : "مكتمل"
    }`);
  };

  const handleSendReply = () => {
    if (!replyText.trim()) {
      toast.error("الرجاء كتابة رد قبل الإرسال");
      return;
    }
    
    // In a real app, this would make an API call to send the reply via WhatsApp
    toast.success("تم إرسال الرد بنجاح");
    setReplyText("");
  };

  const handleOpenDesignChat = (designId: string, designTitle: string) => {
    // Trigger a custom event to open the design chat with the correct design
    const event = new CustomEvent('openDesignChat', { 
      detail: { designId, designTitle } 
    });
    document.dispatchEvent(event);
    
    // Close the WhatsApp panel and show a toast
    onClose();
    toast.success(`تم فتح محادثة التصميم: ${designTitle}`);
  };

  if (!isOpen) return null;

  const selectedMessageData = selectedMessage 
    ? mockWhatsappMessages.find(msg => msg.id === selectedMessage) 
    : null;

  return (
    <div className="fixed inset-y-0 left-0 z-30 w-full sm:w-[450px] border-r bg-background shadow-lg flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <div className="bg-green-600 p-1.5 rounded-full mr-3">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 text-white" 
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
          <h2 className="text-xl font-bold">طلبات تعديل الواتساب</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex flex-col h-full">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-4 pt-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="البحث عن رسائل..." 
                className="pl-10 pr-4" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1">الكل</TabsTrigger>
              <TabsTrigger value="pending" className="flex-1">قيد الانتظار</TabsTrigger>
              <TabsTrigger value="in-progress" className="flex-1">قيد التنفيذ</TabsTrigger>
              <TabsTrigger value="completed" className="flex-1">مكتمل</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value={activeTab} className="flex-1 overflow-hidden">
            <div className="flex h-full">
              <div className={`${selectedMessage ? 'hidden sm:block sm:w-1/2' : 'w-full'} border-t`}>
                <ScrollArea className="h-[calc(100vh-160px)]">
                  {filteredMessages.length > 0 ? (
                    <div className="divide-y">
                      {filteredMessages.map((message) => (
                        <div 
                          key={message.id}
                          className={`p-4 hover:bg-muted cursor-pointer ${selectedMessage === message.id ? 'bg-muted' : ''}`}
                          onClick={() => handleSelectMessage(message.id)}
                        >
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">{message.clientName}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(message.timestamp).toLocaleDateString('ar-EG')}
                            </span>
                          </div>
                          <div className="text-sm font-medium text-green-700 mb-1">
                            {message.designTitle}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {message.message}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <div>
                              {message.attachments.length > 0 && (
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Paperclip className="h-3 w-3 mr-1" />
                                  <span>{message.attachments.length} مرفقات</span>
                                </div>
                              )}
                            </div>
                            <div className="text-xs">
                              <span className={`px-2 py-0.5 rounded-full ${
                                message.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                                message.status === "in-progress" ? "bg-blue-100 text-blue-800" :
                                "bg-green-100 text-green-800"
                              }`}>
                                {message.status === "pending" ? "قيد الانتظار" :
                                 message.status === "in-progress" ? "قيد التنفيذ" :
                                 "مكتمل"}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full p-8">
                      <div className="text-muted-foreground text-center">
                        <p>لا توجد رسائل تطابق البحث</p>
                        <Button 
                          variant="link" 
                          onClick={() => {
                            setSearchQuery("");
                            setActiveTab("all");
                          }}
                        >
                          عرض كل الرسائل
                        </Button>
                      </div>
                    </div>
                  )}
                </ScrollArea>
              </div>
              
              {selectedMessageData && (
                <div className={`${selectedMessage ? 'w-full sm:w-1/2' : 'hidden'} border-r border-t flex flex-col h-full`}>
                  <div className="flex items-center justify-between p-4 border-b">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="sm:hidden flex items-center" 
                      onClick={() => setSelectedMessage(null)}
                    >
                      <ChevronRight className="h-4 w-4 ml-1" />
                      <span>الرجوع</span>
                    </Button>
                    <span className="font-medium">{selectedMessageData.clientName}</span>
                  </div>
                  
                  <ScrollArea className="flex-1 p-4">
                    <div className="mb-4">
                      <h3 className="font-bold mb-1">التصميم</h3>
                      <Button 
                        variant="outline" 
                        className="w-full text-right justify-between" 
                        onClick={() => handleOpenDesignChat(selectedMessageData.designId.toString(), selectedMessageData.designTitle)}
                      >
                        <span>{selectedMessageData.designTitle}</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="font-bold mb-1">الرسالة</h3>
                      <div className="p-3 rounded-lg bg-muted text-sm">
                        {selectedMessageData.message}
                      </div>
                    </div>
                    
                    {selectedMessageData.attachments.length > 0 && (
                      <div className="mb-4">
                        <h3 className="font-bold mb-1">المرفقات</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {selectedMessageData.attachments.map(attachment => (
                            <div key={attachment.id} className="border rounded-md p-2">
                              <div className="relative h-24 mb-1">
                                <img 
                                  src={attachment.url} 
                                  alt={attachment.name} 
                                  className="h-full w-full object-cover rounded-md"
                                />
                              </div>
                              <div className="text-xs truncate">{attachment.name}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="mb-4">
                      <h3 className="font-bold mb-1">معلومات الاتصال</h3>
                      <div className="text-sm">
                        <div className="mb-1">
                          <span className="text-muted-foreground">الاسم: </span>
                          <span>{selectedMessageData.clientName}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">الهاتف: </span>
                          <span>{selectedMessageData.phoneNumber}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="font-bold mb-1">حالة الطلب</h3>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant={selectedMessageData.status === "pending" ? "default" : "outline"}
                          className={selectedMessageData.status === "pending" ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                          onClick={() => handleStatusChange(selectedMessageData.id, "pending")}
                        >
                          قيد الانتظار
                        </Button>
                        <Button 
                          size="sm" 
                          variant={selectedMessageData.status === "in-progress" ? "default" : "outline"}
                          className={selectedMessageData.status === "in-progress" ? "bg-blue-500 hover:bg-blue-600" : ""}
                          onClick={() => handleStatusChange(selectedMessageData.id, "in-progress")}
                        >
                          قيد التنفيذ
                        </Button>
                        <Button 
                          size="sm" 
                          variant={selectedMessageData.status === "completed" ? "default" : "outline"}
                          className={selectedMessageData.status === "completed" ? "bg-green-500 hover:bg-green-600" : ""}
                          onClick={() => handleStatusChange(selectedMessageData.id, "completed")}
                        >
                          مكتمل
                        </Button>
                      </div>
                    </div>
                  </ScrollArea>
                  
                  <div className="p-4 border-t mt-auto">
                    <h3 className="font-bold mb-2">الرد على واتساب</h3>
                    <div className="flex mb-2">
                      <Textarea 
                        placeholder="اكتب ردك هنا..." 
                        className="resize-none text-right"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-between">
                      <Button variant="outline" size="icon">
                        <Image className="h-4 w-4" />
                      </Button>
                      <Button className="bg-green-600 hover:bg-green-700" onClick={handleSendReply}>
                        <Send className="h-4 w-4 ml-2" />
                        إرسال رد
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WhatsappIntegrationPanel;

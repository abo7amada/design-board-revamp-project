
import { useState } from "react";
import { X, Settings, Plus, Search, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

interface Member {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  status: "online" | "away" | "offline";
  lastSeen?: string;
}

interface ActiveMembersPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ActiveMembersPanel({ isOpen, onClose }: ActiveMembersPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddMemberDialog, setShowAddMemberDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [members, setMembers] = useState<Member[]>([
    {
      id: "1",
      name: "أحمد محمد",
      role: "مصمم جرافيك",
      avatar: "https://i.pravatar.cc/150?img=1",
      status: "online"
    },
    {
      id: "2",
      name: "سارة علي",
      role: "مدير مشروع",
      avatar: "https://i.pravatar.cc/150?img=5",
      status: "online"
    },
    {
      id: "3",
      name: "محمد خالد",
      role: "مدير تسويق",
      avatar: "https://i.pravatar.cc/150?img=3",
      status: "away",
      lastSeen: "منذ 35 دقيقة"
    },
    {
      id: "4",
      name: "فاطمة أحمد",
      role: "مطور واجهات",
      avatar: "https://i.pravatar.cc/150?img=8",
      status: "offline",
      lastSeen: "منذ 3 ساعات"
    },
    {
      id: "5",
      name: "عمر حسن",
      role: "مصمم UX/UI",
      avatar: "https://i.pravatar.cc/150?img=6",
      status: "online"
    }
  ]);

  const addMemberForm = useForm({
    defaultValues: {
      name: "",
      role: "",
      email: ""
    }
  });

  const settingsForm = useForm({
    defaultValues: {
      notifyOfflineMembers: true,
      showOfflineMembers: true,
      autoAddToChannel: false
    }
  });

  const filteredMembers = members.filter(member => 
    member.name.includes(searchQuery) || 
    member.role.includes(searchQuery)
  );

  const handleMessageMember = (memberId: string) => {
    const member = members.find(m => m.id === memberId);
    toast.success(`بدء محادثة مع ${member?.name}`);
  };

  const handleAddMember = (data: { name: string; role: string; email: string }) => {
    const newMember: Member = {
      id: Date.now().toString(),
      name: data.name,
      role: data.role,
      status: "offline",
      lastSeen: "منذ لحظات"
    };
    
    setMembers([...members, newMember]);
    setShowAddMemberDialog(false);
    addMemberForm.reset();
    toast.success(`تم إضافة ${data.name} بنجاح`);
  };

  const handleSaveSettings = (data: any) => {
    console.log("تم حفظ الإعدادات:", data);
    toast.success("تم حفظ إعدادات الأعضاء بنجاح");
    setShowSettingsDialog(false);
  };

  const handleRemoveMember = (memberId: string) => {
    const member = members.find(m => m.id === memberId);
    setMembers(members.filter(m => m.id !== memberId));
    toast.success(`تم إزالة ${member?.name} من الأعضاء`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "away": return "bg-yellow-500";
      case "offline": return "bg-gray-400";
      default: return "bg-gray-400";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/50">
      <div className="h-full w-full max-w-md bg-white shadow-lg flex flex-col overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">الأعضاء النشطون</h2>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowSettingsDialog(true)}
              className="text-gray-600"
            >
              <Settings className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="text-gray-600"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="p-4 border-b">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="البحث عن عضو..." 
                className="pr-10 text-right"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              className="bg-green-600 hover:bg-green-700" 
              size="icon"
              onClick={() => setShowAddMemberDialog(true)}
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <div key={member.id} className="border rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        {member.avatar && <AvatarImage src={member.avatar} alt={member.name} />}
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(member.status)}`}></span>
                    </div>
                    <div>
                      <h3 className="font-medium">{member.name}</h3>
                      <p className="text-xs text-gray-500">{member.role}</p>
                      {member.status !== "online" && (
                        <p className="text-xs text-gray-400">{member.lastSeen}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-gray-500"
                      onClick={() => handleMessageMember(member.id)}
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-gray-500"
                      onClick={() => handleRemoveMember(member.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                لا يوجد أعضاء مطابقين لبحثك
              </div>
            )}
          </div>
        </div>
        
        {/* Add Member Dialog */}
        <Dialog open={showAddMemberDialog} onOpenChange={setShowAddMemberDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>إضافة عضو جديد</DialogTitle>
            </DialogHeader>
            <Form {...addMemberForm}>
              <form onSubmit={addMemberForm.handleSubmit(handleAddMember)} className="space-y-4">
                <FormField
                  control={addMemberForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الاسم</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="أدخل اسم العضو" className="text-right" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={addMemberForm.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>المنصب</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="أدخل منصب العضو" className="text-right" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={addMemberForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>البريد الإلكتروني</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" placeholder="example@example.com" className="text-right" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <DialogFooter className="gap-2 sm:gap-0">
                  <Button type="button" variant="outline" onClick={() => setShowAddMemberDialog(false)}>
                    إلغاء
                  </Button>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    إضافة
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Settings Dialog */}
        <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>إعدادات الأعضاء</DialogTitle>
            </DialogHeader>
            <Form {...settingsForm}>
              <form onSubmit={settingsForm.handleSubmit(handleSaveSettings)} className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>إشعار الأعضاء غير المتصلين</span>
                    <input
                      type="checkbox"
                      {...settingsForm.register("notifyOfflineMembers")}
                      className="toggle"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>عرض الأعضاء غير المتصلين</span>
                    <input
                      type="checkbox"
                      {...settingsForm.register("showOfflineMembers")}
                      className="toggle"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>إضافة تلقائية للقنوات</span>
                    <input
                      type="checkbox"
                      {...settingsForm.register("autoAddToChannel")}
                      className="toggle"
                    />
                  </div>
                </div>
                <DialogFooter className="gap-2 sm:gap-0">
                  <Button type="button" variant="outline" onClick={() => setShowSettingsDialog(false)}>
                    إلغاء
                  </Button>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    حفظ الإعدادات
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

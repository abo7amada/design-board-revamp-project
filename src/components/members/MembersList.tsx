
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { MoreHorizontal, Mail, MessageSquare, ShieldAlert, Edit, Trash2, User, UserX } from "lucide-react";
import { toast } from "sonner";

interface Member {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "designer" | "publisher" | "member";
  status: "online" | "offline" | "away";
  lastActive: string;
}

interface MembersListProps {
  searchQuery: string;
}

// بيانات وهمية للأعضاء
const mockMembers: Member[] = [
  {
    id: "1",
    name: "أحمد محمد",
    email: "ahmed@example.com",
    avatar: "",
    role: "admin",
    status: "online",
    lastActive: "الآن"
  },
  {
    id: "2",
    name: "سارة علي",
    email: "sara@example.com",
    avatar: "",
    role: "designer",
    status: "online",
    lastActive: "الآن"
  },
  {
    id: "3",
    name: "محمد عبدالله",
    email: "mohamed@example.com",
    avatar: "",
    role: "publisher",
    status: "away",
    lastActive: "منذ 20 دقيقة"
  },
  {
    id: "4",
    name: "فاطمة حسن",
    email: "fatima@example.com",
    avatar: "",
    role: "designer",
    status: "offline",
    lastActive: "اليوم 10:30 ص"
  },
  {
    id: "5",
    name: "خالد إبراهيم",
    email: "khaled@example.com",
    avatar: "",
    role: "member",
    status: "offline",
    lastActive: "الأمس"
  }
];

const MembersList = ({ searchQuery }: MembersListProps) => {
  const [confirmDeleteMember, setConfirmDeleteMember] = useState<Member | null>(null);
  
  // تصفية الأعضاء حسب البحث
  const filteredMembers = mockMembers.filter(member => 
    member.name.includes(searchQuery) || 
    member.email.includes(searchQuery) || 
    getRoleLabel(member.role).includes(searchQuery)
  );
  
  // الحصول على تسمية الدور
  const getRoleLabel = (role: string) => {
    switch (role) {
      case "admin": return "مدير";
      case "designer": return "مصمم";
      case "publisher": return "ناشر";
      case "member": return "عضو";
      default: return role;
    }
  };
  
  // الحصول على لون حالة العضو
  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "away": return "bg-yellow-500";
      case "offline": return "bg-gray-400";
      default: return "bg-gray-400";
    }
  };
  
  // الحصول على لون وستايل بادج الدور
  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case "admin": 
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "designer": 
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "publisher": 
        return "bg-green-100 text-green-800 border-green-200";
      case "member": 
        return "bg-gray-100 text-gray-800 border-gray-200";
      default: 
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  
  // الحصول على أحرف الأفاتار
  const getAvatarFallback = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };
  
  // معالجة تعديل العضو
  const handleEditMember = (member: Member) => {
    toast.info(`تعديل بيانات العضو: ${member.name}`);
  };
  
  // معالجة حذف العضو
  const handleDeleteMember = (member: Member) => {
    setConfirmDeleteMember(member);
  };
  
  // تأكيد حذف العضو
  const confirmDelete = () => {
    if (confirmDeleteMember) {
      toast.success(`تم حذف العضو ${confirmDeleteMember.name} بنجاح`);
      setConfirmDeleteMember(null);
    }
  };
  
  // إرسال رسالة للعضو
  const handleSendMessage = (member: Member) => {
    toast.info(`فتح محادثة مع ${member.name}`);
  };
  
  // إرسال بريد إلكتروني للعضو
  const handleSendEmail = (member: Member) => {
    toast.info(`إرسال بريد إلكتروني إلى ${member.name}`);
  };
  
  // تعديل صلاحيات العضو
  const handleEditPermissions = (member: Member) => {
    toast.info(`تعديل صلاحيات العضو: ${member.name}`);
  };
  
  return (
    <>
      <div className="space-y-1">
        {filteredMembers.length > 0 ? (
          filteredMembers.map(member => (
            <div 
              key={member.id} 
              className="border rounded-md p-3 hover:bg-gray-50 transition-all flex justify-between items-center"
            >
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{getAvatarFallback(member.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium">{member.name}</h3>
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(member.status)} ml-2`} />
                  </div>
                  <p className="text-sm text-gray-500">{member.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge variant="outline" className={getRoleBadgeStyle(member.role)}>
                  {getRoleLabel(member.role)}
                </Badge>
                <div className="text-xs text-gray-500">
                  {member.status === "online" ? "متصل الآن" : `آخر نشاط: ${member.lastActive}`}
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>إدارة العضو</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleSendMessage(member)}>
                      <MessageSquare className="h-4 w-4 ml-2" />
                      إرسال رسالة
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSendEmail(member)}>
                      <Mail className="h-4 w-4 ml-2" />
                      إرسال بريد إلكتروني
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleEditMember(member)}>
                      <Edit className="h-4 w-4 ml-2" />
                      تعديل البيانات
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEditPermissions(member)}>
                      <ShieldAlert className="h-4 w-4 ml-2" />
                      تعديل الصلاحيات
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => handleDeleteMember(member)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="h-4 w-4 ml-2" />
                      حذف العضو
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 border rounded-md">
            <User className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">لا يوجد أعضاء مطابقون لمعايير البحث</p>
          </div>
        )}
      </div>
      
      {/* تأكيد حذف العضو */}
      <Dialog open={!!confirmDeleteMember} onOpenChange={() => setConfirmDeleteMember(null)}>
        <DialogContent dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-2">
              <UserX className="h-5 w-5 text-red-600" />
              تأكيد حذف العضو
            </DialogTitle>
            <DialogDescription>
              هل أنت متأكد من حذف العضو "{confirmDeleteMember?.name}"؟ لا يمكن التراجع عن هذا الإجراء.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setConfirmDeleteMember(null)}>
              إلغاء
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
            >
              تأكيد الحذف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MembersList;

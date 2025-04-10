
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, ChevronDown, Plus, UserCog, Shield, Pencil, Trash2, Search, X } from "lucide-react";
import { toast } from "sonner";
import MembersList from "./MembersList";

interface MembersManagementProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MemberFormData {
  name: string;
  email: string;
  phone: string;
  role: string;
  permissions: {
    designs: boolean;
    publish: boolean;
    users: boolean;
    clients: boolean;
    settings: boolean;
  }
}

const MembersManagement = ({ isOpen, onClose }: MembersManagementProps) => {
  const [activeTab, setActiveTab] = useState("members");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<MemberFormData>({
    name: "",
    email: "",
    phone: "",
    role: "member",
    permissions: {
      designs: true,
      publish: true,
      users: false,
      clients: true,
      settings: false
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (permission: keyof MemberFormData['permissions'], checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: checked
      }
    }));
  };

  const handleRoleChange = (role: string) => {
    let permissions = { ...formData.permissions };
    
    // تعيين الصلاحيات حسب الدور
    if (role === "admin") {
      permissions = {
        designs: true,
        publish: true,
        users: true,
        clients: true,
        settings: true
      };
    } else if (role === "publisher") {
      permissions = {
        designs: true,
        publish: true,
        users: false,
        clients: true,
        settings: false
      };
    } else if (role === "designer") {
      permissions = {
        designs: true,
        publish: false,
        users: false,
        clients: false,
        settings: false
      };
    }
    
    setFormData(prev => ({
      ...prev,
      role,
      permissions
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // التحقق من صحة البيانات
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }
    
    // إرسال بيانات العضو الجديد
    console.log("بيانات العضو الجديد:", formData);
    toast.success(`تمت إضافة العضو ${formData.name} بنجاح`);
    
    // إعادة تعيين النموذج
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "member",
      permissions: {
        designs: true,
        publish: true,
        users: false,
        clients: true,
        settings: false
      }
    });
    
    // إغلاق نموذج الإضافة
    setShowAddForm(false);
  };

  const handleSettingsSave = () => {
    toast.success("تم حفظ إعدادات الأعضاء بنجاح");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="md:max-w-3xl overflow-hidden" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <User className="h-5 w-5 text-green-600" />
            إدارة الأعضاء
          </DialogTitle>
          <DialogDescription>
            إدارة أعضاء الفريق والمصممين وصلاحياتهم في النظام
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="members" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full">
            <TabsTrigger value="members">قائمة الأعضاء</TabsTrigger>
            <TabsTrigger value="add">إضافة عضو</TabsTrigger>
            <TabsTrigger value="settings">إعدادات الأعضاء</TabsTrigger>
          </TabsList>
          
          <TabsContent value="members" className="space-y-4 pt-4">
            <div className="flex justify-between items-center">
              <div className="relative w-full max-w-sm">
                <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="البحث عن عضو..."
                  className="pr-10 pl-4 py-2 w-full text-right"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-2 h-6 w-6"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <Button
                className="bg-green-600 hover:bg-green-700 gap-2"
                onClick={() => {
                  setActiveTab("add");
                  setShowAddForm(true);
                }}
              >
                <Plus className="h-4 w-4" />
                إضافة عضو
              </Button>
            </div>
            
            <MembersList searchQuery={searchQuery} />
          </TabsContent>
          
          <TabsContent value="add" className="pt-4">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-right block mb-2">الاسم <span className="text-red-500">*</span></Label>
                    <div className="relative">
                      <Input
                        id="name"
                        name="name"
                        placeholder="أدخل اسم العضو"
                        className="text-right pr-10"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                      <User className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-right block mb-2">البريد الإلكتروني <span className="text-red-500">*</span></Label>
                    <div className="relative">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="name@example.com"
                        className="text-right pr-10"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                      <Mail className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-right block mb-2">رقم الهاتف</Label>
                    <div className="relative">
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="+123456789"
                        className="text-right pr-10"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                      <Phone className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="role" className="text-right block mb-2">الدور <span className="text-red-500">*</span></Label>
                    <Select
                      value={formData.role}
                      onValueChange={handleRoleChange}
                    >
                      <SelectTrigger className="w-full text-right">
                        <SelectValue placeholder="اختر دور العضو" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">مدير</SelectItem>
                        <SelectItem value="designer">مصمم</SelectItem>
                        <SelectItem value="publisher">ناشر</SelectItem>
                        <SelectItem value="member">عضو</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">الصلاحيات</h3>
                  <div className="space-y-3 border rounded-md p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox 
                          id="designs" 
                          checked={formData.permissions.designs}
                          onCheckedChange={(checked) => handlePermissionChange("designs", checked as boolean)}
                        />
                        <Label htmlFor="designs" className="cursor-pointer">إدارة التصاميم</Label>
                      </div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">أساسي</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox 
                          id="publish" 
                          checked={formData.permissions.publish}
                          onCheckedChange={(checked) => handlePermissionChange("publish", checked as boolean)}
                        />
                        <Label htmlFor="publish" className="cursor-pointer">نشر المحتوى</Label>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">ناشر</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox 
                          id="users" 
                          checked={formData.permissions.users}
                          onCheckedChange={(checked) => handlePermissionChange("users", checked as boolean)}
                        />
                        <Label htmlFor="users" className="cursor-pointer">إدارة المستخدمين</Label>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">متقدم</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox 
                          id="clients" 
                          checked={formData.permissions.clients}
                          onCheckedChange={(checked) => handlePermissionChange("clients", checked as boolean)}
                        />
                        <Label htmlFor="clients" className="cursor-pointer">إدارة العملاء</Label>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">موظف</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox 
                          id="settings" 
                          checked={formData.permissions.settings}
                          onCheckedChange={(checked) => handlePermissionChange("settings", checked as boolean)}
                        />
                        <Label htmlFor="settings" className="cursor-pointer">إعدادات النظام</Label>
                      </div>
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-100">مدير</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setActiveTab("members");
                      setShowAddForm(false);
                    }}
                  >
                    إلغاء
                  </Button>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    إضافة العضو
                  </Button>
                </div>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6 pt-4">
            <div className="border rounded-md p-4">
              <h3 className="text-lg font-medium mb-3">إعدادات عامة</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-notification">إرسال إشعارات تلقائية للأعضاء الجدد</Label>
                  <Checkbox id="auto-notification" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="member-approval">طلب موافقة المدير قبل إضافة أعضاء جدد</Label>
                  <Checkbox id="member-approval" />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="activity-tracking">تتبع نشاط المستخدمين</Label>
                  <Checkbox id="activity-tracking" defaultChecked />
                </div>
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="text-lg font-medium mb-3">إعدادات متقدمة</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="default-role" className="block mb-2">الدور الافتراضي للأعضاء الجدد</Label>
                  <Select defaultValue="member">
                    <SelectTrigger id="default-role" className="w-full">
                      <SelectValue placeholder="اختر الدور الافتراضي" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="designer">مصمم</SelectItem>
                      <SelectItem value="publisher">ناشر</SelectItem>
                      <SelectItem value="member">عضو</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="session-timeout" className="block mb-2">مدة انتهاء جلسة العضو (بالدقائق)</Label>
                  <Input id="session-timeout" type="number" defaultValue="60" className="text-right" />
                </div>
                
                <div>
                  <Label htmlFor="login-attempts" className="block mb-2">عدد محاولات تسجيل الدخول المسموح بها</Label>
                  <Input id="login-attempts" type="number" defaultValue="5" className="text-right" />
                </div>
              </div>
            </div>
            
            <Button onClick={handleSettingsSave} className="bg-green-600 hover:bg-green-700 w-full mt-4">
              حفظ الإعدادات
            </Button>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            إغلاق
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MembersManagement;

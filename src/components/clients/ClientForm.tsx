
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, Plus } from "lucide-react";

interface ClientData {
  id?: number;
  name: string;
  email: string;
  phone: string;
  sector: string;
  contact: string;
}

interface ClientFormProps {
  isEdit?: boolean;
  clientData?: ClientData;
  onSuccess?: (updatedClient: ClientData) => void;
  trigger?: React.ReactNode;
}

export const ClientForm = ({ isEdit = false, clientData: initialClientData, onSuccess, trigger }: ClientFormProps) => {
  const [open, setOpen] = useState(false);
  const [clientData, setClientData] = useState<ClientData>({
    name: "",
    email: "",
    phone: "",
    sector: "",
    contact: ""
  });

  // تحميل بيانات العميل عند فتح النموذج في وضع التعديل
  useEffect(() => {
    if (initialClientData && isEdit) {
      setClientData(initialClientData);
    }
  }, [initialClientData, isEdit, open]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setClientData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = () => {
    // التحقق من صحة النموذج
    if (!clientData.name || !clientData.email) {
      toast.error("يرجى إدخال اسم العميل والبريد الإلكتروني على الأقل");
      return;
    }

    // إرسال بيانات النموذج (في التطبيق الحقيقي، سيتم استدعاء API)
    if (isEdit) {
      toast.success(`تم تحديث بيانات العميل "${clientData.name}" بنجاح`);
      if (onSuccess) onSuccess(clientData);
    } else {
      toast.success(`تم إضافة العميل "${clientData.name}" بنجاح`);
    }
    
    setOpen(false);
    
    // إعادة تعيين النموذج إذا كنا في وضع الإضافة فقط
    if (!isEdit) {
      setClientData({
        name: "",
        email: "",
        phone: "",
        sector: "",
        contact: ""
      });
    }
  };

  const handleCancel = () => {
    setOpen(false);
    
    // إعادة تعيين النموذج إذا كنا في وضع الإضافة فقط
    if (!isEdit && !initialClientData) {
      toast.error("تم إلغاء إضافة العميل");
      setClientData({
        name: "",
        email: "",
        phone: "",
        sector: "",
        contact: ""
      });
    } else if (isEdit && initialClientData) {
      // إعادة البيانات الأصلية إذا كنا في وضع التعديل
      setClientData(initialClientData);
    }
  };

  // تعيين المحتوى التلقائي للزر بناءً على الوضع
  const defaultTrigger = isEdit ? (
    <Button variant="ghost" size="icon" className="h-8 w-8">
      <Edit className="h-4 w-4" />
    </Button>
  ) : (
    <Button className="bg-green-600 hover:bg-green-700 gap-2">
      <span>إضافة عميل</span>
      <Plus className="h-4 w-4" />
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]" dir="rtl">
        <DialogHeader>
          <DialogTitle>{isEdit ? "تعديل بيانات العميل" : "إضافة عميل جديد"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "قم بتعديل معلومات العميل في النموذج أدناه." : "أدخل معلومات العميل الجديد في النموذج أدناه."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">اسم العميل</label>
            <Input 
              id="name" 
              className="col-span-3" 
              value={clientData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="email" className="text-right">البريد الإلكتروني</label>
            <Input 
              id="email" 
              className="col-span-3" 
              value={clientData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="phone" className="text-right">رقم الهاتف</label>
            <Input 
              id="phone" 
              className="col-span-3" 
              value={clientData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="sector" className="text-right">القطاع</label>
            <Input 
              id="sector" 
              className="col-span-3" 
              value={clientData.sector}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="contact" className="text-right">جهة الاتصال</label>
            <Input 
              id="contact" 
              className="col-span-3" 
              value={clientData.contact}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <DialogFooter className="flex justify-start">
          <Button type="button" variant="outline" onClick={handleCancel}>
            إلغاء
          </Button>
          <Button type="button" onClick={handleSubmit}>
            {isEdit ? "حفظ التغييرات" : "إضافة"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

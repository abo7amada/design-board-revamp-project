
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
import { useClients } from "@/hooks/useClients";

interface ClientData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
}

interface ClientFormProps {
  isEdit?: boolean;
  clientData?: ClientData;
  onSuccess?: (updatedClient: ClientData) => void;
  trigger?: React.ReactNode;
}

export const ClientForm = ({ isEdit = false, clientData: initialClientData, onSuccess, trigger }: ClientFormProps) => {
  const [open, setOpen] = useState(false);
  const { addClient, updateClient, loading } = useClients();
  const [clientData, setClientData] = useState<ClientData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    industry: ""
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

  const handleSubmit = async () => {
    // التحقق من صحة النموذج
    if (!clientData.name || !clientData.email) {
      toast.error("يرجى إدخال اسم العميل والبريد الإلكتروني على الأقل");
      return;
    }

    try {
      if (isEdit && initialClientData?.id) {
        const result = await updateClient(initialClientData.id, {
          name: clientData.name,
          email: clientData.email || null,
          phone: clientData.phone || null,
          company: clientData.company || null,
          industry: clientData.industry || null
        });
        if (result && onSuccess) onSuccess(clientData);
      } else {
        const result = await addClient({
          name: clientData.name,
          email: clientData.email || null,
          phone: clientData.phone || null,
          company: clientData.company || null,
          industry: clientData.industry || null,
          status: 'نشط'
        });
        if (result) {
          toast.success(`تم إضافة العميل "${clientData.name}" بنجاح`);
        }
      }
      
      setOpen(false);
      
      // إعادة تعيين النموذج إذا كنا في وضع الإضافة فقط
      if (!isEdit) {
        setClientData({
          name: "",
          email: "",
          phone: "",
          company: "",
          industry: ""
        });
      }
    } catch (error) {
      console.error('Error submitting client form:', error);
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
        company: "",
        industry: ""
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
            <label htmlFor="company" className="text-right">الشركة</label>
            <Input 
              id="company" 
              className="col-span-3" 
              value={clientData.company}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="industry" className="text-right">الصناعة</label>
            <Input 
              id="industry" 
              className="col-span-3" 
              value={clientData.industry}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <DialogFooter className="flex justify-start">
          <Button type="button" variant="outline" onClick={handleCancel}>
            إلغاء
          </Button>
          <Button type="button" onClick={handleSubmit} disabled={loading}>
            {loading ? "جاري الحفظ..." : (isEdit ? "حفظ التغييرات" : "إضافة")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

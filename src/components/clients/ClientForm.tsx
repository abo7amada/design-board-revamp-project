
import { useState } from "react";
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
import { Plus } from "lucide-react";

export const ClientForm = () => {
  const [open, setOpen] = useState(false);
  const [clientData, setClientData] = useState({
    name: "",
    email: "",
    phone: "",
    sector: "",
    contact: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setClientData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = () => {
    // Validate form
    if (!clientData.name || !clientData.email) {
      toast.error("يرجى إدخال اسم العميل والبريد الإلكتروني على الأقل");
      return;
    }

    // Submit form data (in real app, this would call an API)
    toast.success("تم إضافة العميل بنجاح");
    setOpen(false);
    
    // Reset form
    setClientData({
      name: "",
      email: "",
      phone: "",
      sector: "",
      contact: ""
    });
  };

  const handleCancel = () => {
    setOpen(false);
    toast.error("تم إلغاء إضافة العميل");
    
    // Reset form
    setClientData({
      name: "",
      email: "",
      phone: "",
      sector: "",
      contact: ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700 gap-2">
          <span>إضافة عميل</span>
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]" dir="rtl">
        <DialogHeader>
          <DialogTitle>إضافة عميل جديد</DialogTitle>
          <DialogDescription>
            أدخل معلومات العميل الجديد في النموذج أدناه.
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
            إضافة
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

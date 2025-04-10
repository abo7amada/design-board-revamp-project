
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { ClientForm } from "@/components/clients/ClientForm";
import { SocialMediaIntegration } from "@/components/social/SocialMediaIntegration";

interface ClientInfoProps {
  currentClient: any;
}

export const ClientInfo = ({ currentClient }: ClientInfoProps) => {
  return (
    <div className="mb-8">
      {/* عرض معلومات العميل */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
        <h2 className="text-xl font-bold mb-4">معلومات العميل</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-500 mb-1">الاسم</p>
            <p className="font-semibold">{currentClient?.name}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">البريد الإلكتروني</p>
            <p className="font-semibold">{currentClient?.email}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">رقم الهاتف</p>
            <p className="font-semibold">{currentClient?.phone || "غير متوفر"}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">القطاع</p>
            <p className="font-semibold">{currentClient?.sector || "غير متوفر"}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">عدد المشاريع</p>
            <p className="font-semibold">{currentClient?.projectsCount || 0}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">آخر نشاط</p>
            <p className="font-semibold">{currentClient?.lastActivity || "غير متوفر"}</p>
          </div>
        </div>
        
        <SocialMediaIntegration clientId={currentClient?.id} />
        
        <div className="mt-6 flex gap-4">
          <ClientForm 
            isEdit={true} 
            clientData={{
              id: currentClient?.id || 0,
              name: currentClient?.name || "",
              email: currentClient?.email || "",
              phone: currentClient?.phone || "",
              sector: currentClient?.sector || "",
              contact: currentClient?.contact || ""
            }}
            onSuccess={(data) => toast.success(`تم تحديث بيانات العميل: ${data.name}`)}
          />
          
          <Button variant="outline" className="gap-2">
            <span>إضافة ملاحظة</span>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

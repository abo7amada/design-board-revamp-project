import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlatformIcon } from "./PlatformIcon";
import { getPlatformName } from "./utils";

interface ConnectAccountDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConnectAccountDialog = ({ isOpen, onClose }: ConnectAccountDialogProps) => {
  const [activeTab, setActiveTab] = useState<string>("facebook");
  const [newAccountUrl, setNewAccountUrl] = useState("");
  
  const handleConnectAccount = () => {
    if (!newAccountUrl.trim()) {
      toast.error("الرجاء إدخال رابط الحساب");
      return;
    }

    // Simulate connecting an account
    toast.success(`تم ربط حساب ${getPlatformName(activeTab)} بنجاح`);
    onClose();
    setNewAccountUrl("");
  };

  const platforms = ["facebook", "instagram", "twitter", "tiktok", "snapchat"];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle>ربط حساب تواصل اجتماعي</DialogTitle>
          <DialogDescription>
            اختر المنصة وأدخل رابط الحساب لربطه بحساب العميل
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="facebook">فيسبوك</TabsTrigger>
            <TabsTrigger value="instagram">انستغرام</TabsTrigger>
            <TabsTrigger value="twitter">تويتر</TabsTrigger>
            <TabsTrigger value="tiktok">تيك توك</TabsTrigger>
            <TabsTrigger value="snapchat">سناب شات</TabsTrigger>
          </TabsList>

          {platforms.map((platform) => (
            <TabsContent key={platform} value={platform} className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <PlatformIcon platform={platform} className="h-6 w-6" />
                  <h4 className="font-medium">ربط حساب {getPlatformName(platform)}</h4>
                </div>
                
                <div className="text-sm text-gray-500 mb-4">
                  أدخل رابط حساب {getPlatformName(platform)} الخاص بالعميل للربط مع النظام
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`${platform}-url`}>رابط الحساب</Label>
                  <Input
                    id={`${platform}-url`}
                    placeholder={`مثال: https://${platform}.com/username`}
                    dir="ltr"
                    value={newAccountUrl}
                    onChange={(e) => setNewAccountUrl(e.target.value)}
                  />
                </div>
                
                <div className="text-xs text-gray-500 p-3 bg-gray-50 rounded-md">
                  ملاحظة: يجب أن يكون لديك صلاحيات إدارة الصفحة لتتمكن من الربط والنشر.
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>
          <Button onClick={handleConnectAccount}>
            ربط الحساب
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
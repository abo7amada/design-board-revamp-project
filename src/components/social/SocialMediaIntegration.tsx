
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Facebook, Instagram, Twitter, Share2, ExternalLink, Check, Plus } from "lucide-react";
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
import { Card, CardContent } from "@/components/ui/card";

interface SocialMediaIntegrationProps {
  clientId?: number;
}

// This would come from your database in a real application
const socialMediaAccounts = {
  1: {
    facebook: { connected: true, name: "@شركة_الوفق_الأصفر", url: "https://facebook.com/company1" },
    instagram: { connected: true, name: "@company1", url: "https://instagram.com/company1" },
    twitter: { connected: false, name: "", url: "" },
  },
  2: {
    facebook: { connected: true, name: "@مؤسسة_نجمة_الشمال", url: "https://facebook.com/company2" },
    instagram: { connected: false, name: "", url: "" },
    twitter: { connected: true, name: "@company2", url: "https://twitter.com/company2" },
  }
};

export const SocialMediaIntegration = ({ clientId }: SocialMediaIntegrationProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("facebook");
  const [newAccountUrl, setNewAccountUrl] = useState("");
  const [selectedClientId, setSelectedClientId] = useState(clientId);
  
  const handleConnectAccount = () => {
    if (!newAccountUrl.trim()) {
      toast.error("الرجاء إدخال رابط الحساب");
      return;
    }

    // Simulate connecting an account
    toast.success(`تم ربط حساب ${getPlatformName(activeTab)} بنجاح`);
    setIsDialogOpen(false);
    setNewAccountUrl("");
  };

  const getPlatformName = (platform: string): string => {
    switch (platform) {
      case "facebook": return "فيسبوك";
      case "instagram": return "انستغرام";
      case "twitter": return "تويتر";
      default: return platform;
    }
  };

  const getPlatformIcon = (platform: string, className: string = "h-5 w-5") => {
    switch (platform) {
      case "facebook":
        return <Facebook className={`${className} text-blue-600`} />;
      case "instagram":
        return <Instagram className={`${className} text-pink-600`} />;
      case "twitter":
        return <Twitter className={`${className} text-blue-400`} />;
      default:
        return <Share2 className={className} />;
    }
  };

  const getClientAccounts = () => {
    if (!selectedClientId || !socialMediaAccounts[selectedClientId as keyof typeof socialMediaAccounts]) {
      return {
        facebook: { connected: false, name: "", url: "" },
        instagram: { connected: false, name: "", url: "" },
        twitter: { connected: false, name: "", url: "" },
      };
    }
    return socialMediaAccounts[selectedClientId as keyof typeof socialMediaAccounts];
  };

  const accounts = getClientAccounts();

  return (
    <div className="mt-6 border-t pt-6">
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => {
            setSelectedClientId(clientId);
            setIsDialogOpen(true);
          }}
        >
          <Plus className="h-4 w-4" />
          <span>ربط حساب جديد</span>
        </Button>
        <h3 className="font-bold text-lg">منصات التواصل الاجتماعي</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {["facebook", "instagram", "twitter"].map((platform) => (
          <Card 
            key={platform} 
            className={`border ${accounts[platform as keyof typeof accounts].connected ? "border-green-200" : "border-gray-200"}`}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {getPlatformIcon(platform)}
                  <span className="font-medium">{getPlatformName(platform)}</span>
                </div>
                {accounts[platform as keyof typeof accounts].connected ? (
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 flex items-center gap-1">
                    <Check className="h-3 w-3" />
                    متصل
                  </span>
                ) : (
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                    غير متصل
                  </span>
                )}
              </div>
              
              {accounts[platform as keyof typeof accounts].connected && (
                <div className="mt-2 text-sm text-gray-600 flex justify-between items-center">
                  <a
                    href={accounts[platform as keyof typeof accounts].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline flex items-center gap-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    فتح
                  </a>
                  <span dir="ltr">{accounts[platform as keyof typeof accounts].name}</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle>ربط حساب تواصل اجتماعي</DialogTitle>
            <DialogDescription>
              اختر المنصة وأدخل رابط الحساب لربطه بحساب العميل
            </DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="facebook">فيسبوك</TabsTrigger>
              <TabsTrigger value="instagram">انستغرام</TabsTrigger>
              <TabsTrigger value="twitter">تويتر</TabsTrigger>
            </TabsList>

            {["facebook", "instagram", "twitter"].map((platform) => (
              <TabsContent key={platform} value={platform} className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {getPlatformIcon(platform, "h-6 w-6")}
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
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleConnectAccount}>
              ربط الحساب
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

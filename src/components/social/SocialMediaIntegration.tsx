
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Facebook, Instagram, Twitter, Share2, ExternalLink, Check, Plus, Smartphone } from "lucide-react";
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
    tiktok: { connected: true, name: "@company1_tiktok", url: "https://tiktok.com/@company1" },
    snapchat: { connected: false, name: "", url: "" },
  },
  2: {
    facebook: { connected: true, name: "@مؤسسة_نجمة_الشمال", url: "https://facebook.com/company2" },
    instagram: { connected: false, name: "", url: "" },
    twitter: { connected: true, name: "@company2", url: "https://twitter.com/company2" },
    tiktok: { connected: false, name: "", url: "" },
    snapchat: { connected: true, name: "@north_star", url: "https://snapchat.com/add/north_star" },
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
      case "tiktok": return "تيك توك";
      case "snapchat": return "سناب شات";
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
      case "tiktok":
        return (
          <svg className={`${className} text-black`} viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.321 5.562a5.122 5.122 0 01-.443-.258 6.228 6.228 0 01-1.137-.92c-1.409-1.4-1.363-3.345-1.35-3.623L16.38.75h-3.126v14.287c0 1.323-.952 2.415-2.254 2.601-1.59.228-2.947-.896-2.947-2.394 0-1.32 1.09-2.417 2.43-2.417.265 0 .52.04.76.116v-3.19a6.077 6.077 0 00-3.65 1.073c-1.942 1.29-2.985 3.8-2.483 6.346.572 2.887 3.016 4.993 5.902 5.076 3.256.094 5.98-2.53 5.98-5.719V9.406c1.622 1.12 3.575 1.802 5.657 1.802V8.055c-.985 0-2.836-.732-3.327-2.493" />
          </svg>
        );
      case "snapchat":
        return (
          <svg className={`${className} text-yellow-400`} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.206 1c.119 0 .774.019 1.197.019.922 0 2.1-.075 3.327.595 1.016.55 1.8 1.541 2.268 2.938.361 1.084.343 2.124.343 3.293 0 .144-.012.289-.012.444.012.087.099.519.593.816.313.193.677.271 1.016.271.439 0 .877-.167 1.214-.382v.666c-.175.139-.49.354-.958.485-.3.083-.663.16-1.098.16-.462 0-.964-.073-1.435-.319-.91-.479-1.615-1.444-1.993-2.808-.115-.41-.14-.834-.14-1.068 0-.167.012-.319.012-.444 0-1.73-.011-3.856-2.519-3.831-.211 0-.44.020-.663.020-.222 0-.452-.016-.663-.016-.517 0-1.031.065-1.388.176C9.125 2.951 7.787 4.646 7.787 7.448c0 .39.025.785.074 1.175-.182.031-.388.062-.6.062-.365 0-.731-.062-1.047-.185-.325-.129-.638-.308-.9-.535v.741a4.87 4.87 0 001.534.764c.318.087.65.128 1.047.128.175 0 .351-.012.517-.034.329.822.964 1.454 1.847 1.847.829.37 1.85.535 3.077.535.06 0 .113-.004.175-.004.761 0 2.436.066.61.087a.858.858 0 01.77.572c.05.154.037.337.025.515-.084 1.166-2.11 1.722-2.642 1.845-.139.034-.54.124-.554.35-.008.175-.008.347.112.531.271.401 1.206.859 2.969.859.886 0 1.771-.113 2.642-.344 1.147-.296 2.147-.82 2.969-1.555v.7c-1.016 1.138-2.383 1.58-3.531 1.889-.775.205-1.572.314-2.396.314-2.295 0-3.782-.672-4.558-1.21a2.221 2.221 0 01-.774-.928c-.107-.286-.132-.592-.083-.887a.58.58 0 01.013-.033c.38-1.483 2.235-1.821 2.972-1.97.088-.016.171-.034.255-.05.562-.111.75-.258.764-.319.025-.103.037-.23.05-.356.025-.388-.19-.775-.513-.941-.3-.158-.624-.193-.996-.219-.11-.012-.221-.018-.325-.018-1.098 0-1.881.12-2.532.385-1.032.422-1.553 1.136-1.665 1.32-.05.087-.075.173-.075.268a.372.372 0 00.175.305.56.56 0 00.367.116c.211 0 .451-.087.451-.087l.025.05s-.137.294-.137.6c0 .074 0 .15.012.217.075.388.289.684.652.9.578.337 1.565.53 2.928.53 1.377 0 2.507-.243 3.372-.734l.013-.01c.649-.367 1.009-.853 1.071-1.427.05-.519-.189-.943-.34-1.141-.325-.443-.812-.542-1.201-.585-.187-.02-.436-.02-.677-.02-1.047 0-1.7-.063-2.047-.099-1.098-.116-1.184-.294-1.209-.393-.025-.13-.025-.26-.025-.39 0-1.233.025-2.593-.688-3.637C12.72 4.7 11.648 4.233 10.575 4.233h-.037c-1.073 0-2.146.466-2.93 1.32-.713 1.044-.688 2.404-.688 3.637 0 .13 0 .26-.025.39-.025.098-.111.277-1.21.393-.346.036-1 .099-2.046.099-.242 0-.49 0-.677.02-.39.043-.876.141-1.202.585-.15.198-.39.622-.34 1.141.063.574.423 1.06 1.072 1.427l.013.01c.864.491 1.994.734 3.371.734 1.364 0 2.351-.193 2.93-.53.363-.216.577-.512.651-.9a1.25 1.25 0 00.013-.218c0-.305-.138-.6-.138-.6l.026-.05s.24.087.45.087a.567.567 0 00.369-.116.372.372 0 00.174-.305c0-.095-.025-.18-.075-.268-.112-.184-.632-.898-1.664-1.32-.651-.266-1.435-.385-2.532-.385-.105 0-.215.006-.326.018a6.77 6.77 0 00-.995.219c-.321.166-.538.553-.513.941.12.127.025.254.05.356.013.06.202.208.764.32.084.015.167.033.255.05.737.148 2.592.486 2.97 1.969a.577.577 0 01.14.033c.05.295.024.6-.083.887-.152.39-.431.715-.775.928-.776.538-2.263 1.21-4.558 1.21-.824 0-1.622-.109-2.396-.314-1.147-.31-2.514-.751-3.53-1.889v-.7c.822.736 1.821 1.259 2.969 1.555.87.231 1.756.344 2.642.344 1.763 0 2.698-.458 2.969-.86.119-.184.119-.355.112-.53-.014-.225-.415-.316-.555-.35-.53-.123-2.558-.679-2.642-1.845-.013-.177-.025-.36.025-.515a.858.858 0 01.77-.572 596.51 596.51 0 01.609-.087c.063 0 .115.004.176.004 1.226 0 2.248-.165 3.077-.535.883-.393 1.518-1.025 1.847-1.847.166.022.343.034.517.034.396 0 .73-.04 1.047-.128a4.87 4.87 0 001.535-.764v-.74c-.264.226-.575.405-.901.534-.316.123-.682.185-1.047.185-.212 0-.418-.031-.6-.062a9.49 9.49 0 00.075-1.175c0-2.802-1.338-4.497-4.095-5.534-.357-.11-.87-.175-1.388-.175-.211 0-.44.015-.663.015-.224 0-.452-.019-.661-.019-2.509-.025-2.521 2.1-2.521 3.83 0 .126.013.278.013.445 0 .234-.025.659-.139 1.068-.378 1.363-1.083 2.329-1.993 2.808-.471.246-.974.32-1.436.32-.435 0-.798-.078-1.097-.161-.468-.131-.782-.346-.959-.485v-.667c.338.215.775.383 1.215.383.34 0 .702-.078 1.016-.271.493-.298.58-.729.593-.817 0-.155-.013-.3-.013-.443 0-1.17-.018-2.21.343-3.294.468-1.397 1.252-2.388 2.268-2.938 1.228-.67 2.405-.595 3.327-.595.423 0 1.078-.019 1.198-.019m0-1c-.22 0-.83.02-1.203.02-.979 0-2.295-.09-3.705.66-1.212.66-2.129 1.783-2.672 3.416C4.184 5.51 4.235 6.751 4.235 8c-1.093-.232-2.042-.832-2.042-.832S2 8.069 3.402 8.66c-.015-.25-.025-.497-.025-.75 0-3.117 1.602-5.191 4.711-6.336.463-.147 1.073-.205 1.665-.205.214 0 .44.016.654.016.214 0 .44-.016.654-.016C13.683 1.37 14 1.97 14 3c0 .103-.012.158-.012.158.37-.168.78-.158 1.123-.158 1.099 0 1.996.613 1.996.613S16.934 5.572 15 5.572c0-1.232-.012-2.323-.389-3.362-.512-1.382-1.382-2.53-2.598-3.187-1.221-.622-2.648-.668-3.723-.668-.282 0-.93.02-1.118.02-.209 0-.882.019-1.154.019-1.22 0-2.785.09-4.12.784C.597.001 0 .966 0 2.003v6.654c.597.338 1.55.678 2.55.678 1.232 0 2.402-.593 2.402-.593v-.59c-.75.333-1.647.218-2.293-.084 1.232.254 2.304-.338 2.304-.338.009 0 .018-.2.018-.032-.1-.16-.013-.3-.013-.444 0-1.14.012-3.437 2.044-3.416.213 0 .434.018.647.018.214 0 .434-.02.646-.02.596 0 1.017.047 1.24.156-.87.5-1.324 1.26-1.324 2.45 0 .427.032.854.089 1.28-.087.015-.18.03-.283.03-.328 0-.65-.05-.934-.15.341.144.724.21 1.135.21.191 0 .383-.017.574-.04.37.835.941 1.486 1.73 1.884.75.33 1.673.5 2.752.5.06 0 .12-.3.18-.3.77 0 2.332.07.581.088.163.017.293.113.348.258.045.138.024.305.012.472-.045.602-.919 1.077-2.054 1.255-.085.014-.163.029-.235.046-.594.118-.618.259-.604.352 0 .169.024.338.129.498.17.25.533.553 1.651.782.386.079.847.128 1.371.128 1.305 0 2.936-.315 2.936-.315v-.626c-.836.186-1.683.291-2.532.291-1.652 0-2.397-.407-2.579-.677-.031-.046-.048-.092-.048-.132 0-.53.047-.66.059-.08.333-.136.76-.204 1.196-.255.223-.026.4-.044.532-.06.718-.144.895-.35.895-.35s-.053-.257-.053-.494c0-.11.008-.215.019-.296.12-.596-.237-1.193-.795-1.474-.371-.194-.775-.237-1.22-.268-.104-.009-.21-.017-.316-.017-.96 0-1.668.082-2.238.31-.507.206-.87.486-1.119.757 0-.33.002-.67.002-.101 0-.271-.102-.508-.102-.508s.148.057.297.057c.07 0 .142-.15.201-.042-.133-.035-.271-.125-.27-.339 0-.05-.011-.089-.028-.124-.114-.184-.514-.682-1.283-1.029-.535-.218-1.205-.318-2.225-.318a9.37 9.37 0 00-.281.005c-.095.002-.19.006-.282.012-.282.019-.635.07-.914.17-.496.255-.817.853-.782 1.438.12.16.037.32.064.48.001 0 .106.069.486.166 0 0 .088.017.193.037.48.097 1.776.361 2.159 1.443.3.085.9.173-.58.674-.134.322-.376.586-.662.777-.72.5-2.119 1.11-4.39 1.11-.757 0-1.528-.093-2.287-.296-1.181-.32-2.613-.804-3.67-1.965V20.1c.833.846 1.909 1.373 3.074 1.682.89.237 1.797.35 2.731.35 1.959 0 3.518-.413 4.475-1.194.274-.22.638-.626.638-1.326 0-.167-.028-.348-.083-.535-.042-.143-.024-.3.049-.423.085-.145.239-.24.415-.259.051-.5.104-.1.158-.016.506-.093 1.326-.33 1.858-.87.254-.262.368-.581.33-.957-.032-.311-.195-.605-.481-.875-.292-.271-.703-.407-1.238-.453-.182-.018-.443-.018-.704-.018-1.067 0-1.729-.064-2.078-.1-1.133-.12-1.134-.304-1.134-.314v-.012c-.02-1.276-.049-2.696.694-3.837.837-.917 1.998-1.417 3.172-1.417h.042c1.176 0 2.336.5 3.173 1.417.742 1.14.713 2.56.694 3.837v.012c0 .01 0 .195-1.135.315-.35.036-1.01.1-2.078.1-.26 0-.521 0-.704.018-.535.046-.945.182-1.238.453-.285.27-.449.564-.48.875-.038.376.075.695.33.957.531.539 1.351.777 1.858.87.054.01.106.011.158.016.175.02.329.114.414.26.073.123.092.28.05.422-.055.187-.084.368-.084.535 0 .7.365 1.106.638 1.326.958.78 2.517 1.194 4.475 1.194.933 0 1.84-.113 2.732-.35 1.164-.31 2.24-.836 3.074-1.682v-1.874c-1.058 1.161-2.49 1.646-3.67 1.965-.759.203-1.53.296-2.288.296-2.27 0-3.67-.608-4.39-1.11a1.789 1.789 0 01-.663-.777c-.067-.161-.091-.329-.058-.674.384-1.082 1.68-1.346 2.16-1.443.103-.2.193-.037.193-.037.38-.097.485-.166.485-.167.028-.16.053-.32.065-.479.035-.585-.286-1.183-.782-1.438-.28-.1-.632-.151-.914-.17a9.14 9.14 0 00-.282-.012 9.068 9.068 0 00-.282-.005c-1.019 0-1.69.099-2.224.318-.77.347-1.17.845-1.283 1.03-.018.034-.029.073-.029.123 0 .214-.137.304-.27.339.06.027.13.042.2.042.15 0 .298-.057.298-.057s-.102.237-.102.508c0 .34.002.068.003.1-.249-.271-.612-.55-1.12-.756-.57-.228-1.277-.31-2.237-.31-.106 0-.213.008-.316.017-.446.031-.85.074-1.22.268-.558.28-.916.877-.795 1.474.1.081.018.186.018.296 0 .237-.052.494-.052.494s.176.206.895.35c.132.016.308.034.531.06.435.05.863.118 1.196.255.012.014.06.027.06.08 0 .04-.018.086-.049.132-.183.27-.926.677-2.579.677-.849 0-1.696-.105-2.532-.29v.626s1.631.314 2.936.314c.524 0 .986-.49 1.371-.128 1.118-.229 1.481-.532 1.651-.781.105-.16.129-.33.129-.499.014-.092-.01-.234-.604-.352-.071-.017-.15-.032-.235-.046-1.135-.178-2.01-.653-2.054-1.255-.012-.167-.033-.334.012-.472.055-.145.185-.241.348-.258.58-.18 2.142-.088 2.912-.088.06 0 .12.003.18.003 1.079 0 2.002-.17 2.752-.5.79-.398 1.36-1.05 1.73-1.883.192.023.384.04.575.04.41 0 .794-.066 1.135-.21-.285.1-.606.15-.934.15-.104 0-.197-.016-.283-.031.056-.426.088-.853.088-1.28 0-1.19-.453-1.95-1.324-2.45.222-.109.644-.156 1.24-.156.212 0 .433.02.646.02.213 0 .434-.018.647-.018 2.031-.022 2.044 2.275 2.044 3.416 0 .146-.004.284-.013.444 0 .012.01.031.018.031 0 0 1.072.593 2.304.339-.646.302-1.544.417-2.293.084v.59s1.17.593 2.402.593c1 0 1.953-.34 2.55-.678V2.003c0-1.038-.597-2.002-1.897-2.826-1.336-.694-2.9-.784-4.12-.784-.272 0-.947-.02-1.155-.02z" />
          </svg>
        );
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
        tiktok: { connected: false, name: "", url: "" },
        snapchat: { connected: false, name: "", url: "" },
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
        {["facebook", "instagram", "twitter", "tiktok", "snapchat"].map((platform) => (
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
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="facebook">فيسبوك</TabsTrigger>
              <TabsTrigger value="instagram">انستغرام</TabsTrigger>
              <TabsTrigger value="twitter">تويتر</TabsTrigger>
              <TabsTrigger value="tiktok">تيك توك</TabsTrigger>
              <TabsTrigger value="snapchat">سناب شات</TabsTrigger>
            </TabsList>

            {["facebook", "instagram", "twitter", "tiktok", "snapchat"].map((platform) => (
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

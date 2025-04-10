
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, X } from "lucide-react";
import { toast } from "sonner";

interface SocialPlatformCardProps {
  platform: {
    id: string;
    name: string;
    icon: string;
    connected: boolean;
    lastPost?: string;
    audience?: number;
  };
  onToggle: (id: string, enabled: boolean) => void;
}

export const SocialPlatformCard = ({ platform, onToggle }: SocialPlatformCardProps) => {
  const handleConnect = () => {
    toast.success(`تم الاتصال بمنصة ${platform.name}`);
    onToggle(platform.id, true);
  };

  const handleDisconnect = () => {
    toast.info(`تم قطع الاتصال بمنصة ${platform.name}`);
    onToggle(platform.id, false);
  };

  const formatAudience = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="bg-gray-50 p-4 pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 shrink-0 rounded-full overflow-hidden">
            <img 
              src={platform.icon} 
              alt={platform.name} 
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium text-lg">{platform.name}</h3>
            {platform.connected && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                متصل
              </Badge>
            )}
          </div>
        </div>
        <Switch 
          checked={platform.connected} 
          onCheckedChange={(checked) => onToggle(platform.id, checked)}
        />
      </CardHeader>
      <CardContent className="p-4 pt-2">
        {platform.connected ? (
          <div className="space-y-3">
            {platform.audience !== undefined && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">الجمهور</span>
                <span className="font-medium">{formatAudience(platform.audience)}</span>
              </div>
            )}
            {platform.lastPost && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">آخر منشور</span>
                <span className="text-sm">{platform.lastPost}</span>
              </div>
            )}
            <div className="flex justify-between gap-2 mt-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => toast.info("تم فتح إحصائيات المنصة")}
              >
                إحصائيات
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleDisconnect}
              >
                <X className="h-4 w-4 ml-1" />
                فصل
              </Button>
            </div>
          </div>
        ) : (
          <div className="py-2">
            <p className="text-gray-500 text-sm mb-4">
              قم بتوصيل حساب {platform.name} لجدولة ونشر المحتوى والحصول على التحليلات.
            </p>
            <Button 
              className="w-full bg-green-600 hover:bg-green-700 gap-2"
              onClick={handleConnect}
            >
              <Check className="h-4 w-4" />
              <span>اتصال</span>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

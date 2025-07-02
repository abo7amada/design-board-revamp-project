import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useSocialMedia } from "@/hooks/useSocialMedia";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

interface ConnectedPlatformsSelectorProps {
  selectedPlatforms: string[];
  onPlatformToggle: (platform: string, enabled: boolean) => void;
}

export const ConnectedPlatformsSelector = ({ 
  selectedPlatforms, 
  onPlatformToggle 
}: ConnectedPlatformsSelectorProps) => {
  const { socialAccounts } = useSocialMedia();

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <Facebook className="h-4 w-4 text-blue-600" />;
      case 'instagram':
        return <Instagram className="h-4 w-4 text-pink-600" />;
      case 'twitter':
        return <Twitter className="h-4 w-4 text-blue-400" />;
      case 'linkedin':
        return <Linkedin className="h-4 w-4 text-blue-700" />;
      default:
        return null;
    }
  };

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case 'facebook': return 'فيسبوك';
      case 'instagram': return 'إنستغرام';
      case 'twitter': return 'تويتر';
      case 'linkedin': return 'لينكد إن';
      case 'tiktok': return 'تيك توك';
      default: return platform;
    }
  };

  if (socialAccounts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>اختيار المنصات</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-4">
            لا توجد حسابات متصلة. قم بربط حساباتك أولاً من صفحة إدارة المنصات الاجتماعية.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>اختيار المنصات للنشر</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {socialAccounts.map((account) => (
            <div 
              key={account.id} 
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={selectedPlatforms.includes(account.platform)}
                  onCheckedChange={(checked) => 
                    onPlatformToggle(account.platform, checked as boolean)
                  }
                />
                {getPlatformIcon(account.platform)}
                <div>
                  <p className="font-medium">{getPlatformName(account.platform)}</p>
                  <p className="text-sm text-gray-500">
                    {account.account_name || account.platform_username}
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                متصل
              </Badge>
            </div>
          ))}
        </div>
        
        {selectedPlatforms.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              سيتم النشر على {selectedPlatforms.length} منصة: {
                selectedPlatforms.map(p => getPlatformName(p)).join(', ')
              }
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
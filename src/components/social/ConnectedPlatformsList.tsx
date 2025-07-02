import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Settings, TrendingUp } from "lucide-react";
import { useSocialMedia } from "@/hooks/useSocialMedia";
import { toast } from "sonner";

export const ConnectedPlatformsList = () => {
  const { socialAccounts, publishingHistory } = useSocialMedia();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-700';
      case 'failed': return 'bg-red-100 text-red-700';
      case 'scheduled': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (socialAccounts.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-500 mb-4">لا توجد حسابات متصلة</p>
          <p className="text-sm text-gray-400">قم بربط حساباتك من تبويب المنصات أعلاه</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {socialAccounts.map((account) => {
        const accountHistory = publishingHistory.filter(h => h.social_account_id === account.id);
        
        return (
          <Card key={account.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-sm font-medium">
                      {account.platform.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium">{account.account_name || account.platform_username}</h3>
                    <p className="text-sm text-gray-500">{account.platform}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast.info("ستتم إضافة هذه الميزة قريباً")}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast.info("ستتم إضافة هذه الميزة قريباً")}
                  >
                    <TrendingUp className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {accountHistory.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">آخر المنشورات</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {accountHistory.slice(0, 3).map((history) => (
                      <div key={history.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(history.status)}>
                            {history.status === 'published' ? 'منشور' : 
                             history.status === 'failed' ? 'فشل' :
                             history.status === 'scheduled' ? 'مجدول' : 'معلق'}
                          </Badge>
                          <span className="text-sm text-gray-600">
                            {history.published_at ? formatDate(history.published_at) : 'غير محدد'}
                          </span>
                        </div>
                        {history.platform_post_id && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toast.info("سيتم فتح المنشور في المنصة")}
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  {accountHistory.length > 3 && (
                    <p className="text-xs text-gray-500">وعدد {accountHistory.length - 3} منشورات أخرى...</p>
                  )}
                </div>
              )}

              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">حالة الاتصال</span>
                  <Badge className="bg-green-100 text-green-700">متصل</Badge>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  آخر تحديث: {formatDate(account.updated_at)}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
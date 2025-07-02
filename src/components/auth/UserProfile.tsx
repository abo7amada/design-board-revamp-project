import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Mail, Key } from 'lucide-react';

interface ProfileData {
  full_name: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const UserProfile = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<ProfileData>({
    full_name: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Update user metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          full_name: profileData.full_name
        }
      });

      if (updateError) throw updateError;

      toast.success('تم تحديث بيانات الملف الشخصي بنجاح');
    } catch (error: any) {
      setError(error.message);
      toast.error('فشل في تحديث بيانات الملف الشخصي');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (profileData.newPassword !== profileData.confirmPassword) {
      setError('كلمة المرور الجديدة وتأكيدها غير متطابقين');
      setIsLoading(false);
      return;
    }

    if (profileData.newPassword.length < 6) {
      setError('يجب أن تكون كلمة المرور الجديدة 6 أحرف على الأقل');
      setIsLoading(false);
      return;
    }

    try {
      const { error: passwordError } = await supabase.auth.updateUser({
        password: profileData.newPassword
      });

      if (passwordError) throw passwordError;

      setProfileData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));

      toast.success('تم تحديث كلمة المرور بنجاح');
    } catch (error: any) {
      setError(error.message);
      toast.error('فشل في تحديث كلمة المرور');
    } finally {
      setIsLoading(false);
    }
  };

  const getUserInitials = (name: string | undefined) => {
    if (!name) return "مـ";
    const words = name.split(" ");
    if (words.length >= 2) {
      return words[0][0] + words[1][0];
    }
    return name[0];
  };

  return (
    <div className="space-y-6">
      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            معلومات الملف الشخصي
          </CardTitle>
          <CardDescription>
            قم بتحديث معلومات حسابك الشخصي
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-green-100 text-green-600 text-lg">
                  {getUserInitials(user?.user_metadata?.full_name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-medium">{user?.user_metadata?.full_name || "المستخدم"}</h3>
                <p className="text-sm text-gray-500">{user?.email}</p>
                <p className="text-xs text-gray-400">
                  تاريخ الانضمام: {user?.created_at ? new Date(user.created_at).toLocaleDateString('ar-SA') : ''}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">الاسم الكامل</Label>
              <Input
                id="fullName"
                type="text"
                value={profileData.full_name}
                onChange={(e) => setProfileData(prev => ({ ...prev, full_name: e.target.value }))}
                placeholder="أدخل اسمك الكامل"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                disabled
                className="bg-gray-50"
              />
              <p className="text-xs text-gray-500">
                لا يمكن تغيير البريد الإلكتروني حالياً
              </p>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'جاري التحديث...' : 'تحديث البيانات'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Password Change */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            تغيير كلمة المرور
          </CardTitle>
          <CardDescription>
            قم بتحديث كلمة مرور حسابك
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">كلمة المرور الجديدة</Label>
              <Input
                id="newPassword"
                type="password"
                value={profileData.newPassword}
                onChange={(e) => setProfileData(prev => ({ ...prev, newPassword: e.target.value }))}
                placeholder="أدخل كلمة المرور الجديدة"
                minLength={6}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">تأكيد كلمة المرور الجديدة</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={profileData.confirmPassword}
                onChange={(e) => setProfileData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                placeholder="أكد كلمة المرور الجديدة"
                minLength={6}
              />
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'جاري التحديث...' : 'تحديث كلمة المرور'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            معلومات الحساب
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">معرف المستخدم:</span>
              <span className="text-sm font-mono">{user?.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">حالة التحقق:</span>
              <span className={`text-sm ${user?.email_confirmed_at ? 'text-green-600' : 'text-yellow-600'}`}>
                {user?.email_confirmed_at ? 'تم التحقق' : 'في انتظار التحقق'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">آخر تسجيل دخول:</span>
              <span className="text-sm">
                {user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString('ar-SA') : 'غير متوفر'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
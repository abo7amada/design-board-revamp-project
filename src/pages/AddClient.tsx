import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/AppSidebar";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useClients } from '@/hooks/useClients';
import { toast } from 'sonner';

const AddClient = () => {
  const navigate = useNavigate();
  const { addClient, loading } = useClients();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    status: 'نشط'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('الرجاء إدخال اسم العميل');
      return;
    }
    
    if (!formData.email.trim()) {
      toast.error('الرجاء إدخال البريد الإلكتروني');
      return;
    }
    
    const result = await addClient({
      name: formData.name,
      email: formData.email || null,
      phone: formData.phone || null,
      company: formData.company || null,
      industry: formData.industry || null,
      status: formData.status
    });

    if (result) {
      navigate('/clients');
    }
  };

  return (
    <div className="min-h-screen flex w-full" dir="rtl">
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        
        {/* Main content */}
        <main className="flex-1 bg-white">
          {/* Header */}
          <header className="bg-white border-b py-4 px-6 flex justify-between items-center">
            <Button 
              variant="ghost" 
              className="flex items-center gap-2" 
              onClick={() => navigate("/clients")}
            >
              <ArrowRight className="h-4 w-4" />
              <span>العودة لقائمة العملاء</span>
            </Button>
            
            <h1 className="text-xl font-bold text-green-700">إضافة عميل جديد</h1>
            
            <div></div>
          </header>
          
          {/* Content */}
          <div className="p-6">
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>معلومات العميل</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">اسم العميل *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="أدخل اسم العميل"
                          className="text-right"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">البريد الإلكتروني *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="أدخل البريد الإلكتروني"
                          className="text-right"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">رقم الهاتف</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="أدخل رقم الهاتف"
                          className="text-right"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="company">الشركة</Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="أدخل اسم الشركة"
                          className="text-right"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="industry">الصناعة</Label>
                        <Input
                          id="industry"
                          name="industry"
                          value={formData.industry}
                          onChange={handleChange}
                          placeholder="أدخل نوع الصناعة"
                          className="text-right"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="status">الحالة</Label>
                        <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                          <SelectTrigger className="text-right">
                            <SelectValue placeholder="اختر الحالة" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="نشط">نشط</SelectItem>
                            <SelectItem value="غير نشط">غير نشط</SelectItem>
                            <SelectItem value="محتمل">محتمل</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-4 space-x-reverse pt-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => navigate('/clients')}
                      >
                        إلغاء
                      </Button>
                      <Button 
                        type="submit" 
                        className="bg-green-600 hover:bg-green-700" 
                        disabled={loading}
                      >
                        {loading ? 'جاري الحفظ...' : 'إضافة العميل'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default AddClient;
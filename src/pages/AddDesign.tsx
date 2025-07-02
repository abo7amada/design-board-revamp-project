
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell, ArrowRight, X, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDesigns } from "@/hooks/useDesigns";
import { useClients } from "@/hooks/useClients";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AddDesign = () => {
  const navigate = useNavigate();
  const { addDesign, uploadImage, loading } = useDesigns();
  const { clients } = useClients();
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "ترويجي",
    description: "",
    image_url: null as string | null,
    client_id: null as string | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const imageUrl = await uploadImage(file);
      if (imageUrl) {
        setFormData(prev => ({ ...prev, image_url: imageUrl }));
        toast.success("تم رفع الصورة بنجاح");
      }
    } catch (error) {
      toast.error("فشل في رفع الصورة");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      toast.error("الرجاء إدخال عنوان للتصميم");
      return;
    }
    
    // Submit form
    const result = await addDesign({
      title: formData.title,
      category: formData.category,
      description: formData.description,
      image_url: formData.image_url,
      client_id: formData.client_id,
      status: 'مسودة'
    });

    if (result) {
      toast.success("تم إضافة التصميم بنجاح");
      navigate("/designs");
    }
  };

  const handleCancel = () => {
    navigate("/designs");
  };

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b py-3 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={() => toast.info("لديك إشعاران جديدان")}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">2</span>
          </Button>
        </div>
        
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-green-700 mr-2">إضافة تصميم جديد</h1>
          <Button 
            variant="ghost" 
            size="icon" 
            className="ml-2"
            onClick={handleCancel}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </header>
      
      {/* Content */}
      <div className="p-6 max-w-4xl mx-auto">
        <Card className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">عنوان التصميم *</label>
                <Input 
                  id="title" 
                  name="title" 
                  placeholder="أدخل عنوان التصميم" 
                  value={formData.title}
                  onChange={handleChange}
                  className="text-right"
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-2">الفئة *</label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger className="text-right">
                    <SelectValue placeholder="اختر الفئة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ترويجي">ترويجي</SelectItem>
                    <SelectItem value="هوية بصرية">هوية بصرية</SelectItem>
                    <SelectItem value="وسائل تواصل">وسائل تواصل</SelectItem>
                    <SelectItem value="طباعة">طباعة</SelectItem>
                    <SelectItem value="ويب">ويب</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="client_id" className="block text-sm font-medium mb-2">العميل</label>
                <Select value={formData.client_id || ""} onValueChange={(value) => setFormData(prev => ({ ...prev, client_id: value || null }))}>
                  <SelectTrigger className="text-right">
                    <SelectValue placeholder="اختر العميل (اختياري)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">بدون عميل</SelectItem>
                    {clients.map(client => (
                      <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2">وصف التصميم</label>
                <Textarea 
                  id="description" 
                  name="description" 
                  placeholder="أدخل وصف التصميم" 
                  value={formData.description}
                  onChange={handleChange}
                  className="text-right min-h-[120px]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">صورة التصميم</label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                  <div className="mx-auto h-32 w-32 overflow-hidden bg-gray-100 rounded-lg">
                    <img 
                      src={formData.image_url || "/placeholder.svg"} 
                      alt="Design preview" 
                      className="h-full w-full object-cover" 
                    />
                  </div>
                  <div className="mt-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="mx-auto" 
                      onClick={() => document.getElementById('image-upload')?.click()}
                      disabled={uploading}
                    >
                      <Upload className="h-4 w-4 ml-2" />
                      {uploading ? "جاري الرفع..." : "رفع صورة"}
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 space-x-reverse">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  إلغاء
                </Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={loading}>
                  <span>{loading ? "جاري الحفظ..." : "إضافة التصميم"}</span>
                  <ArrowRight className="mr-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AddDesign;

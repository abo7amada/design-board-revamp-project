
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell, ArrowRight, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "منشور",
    content: "",
    image: "/placeholder.svg",
    hasDesign: true,
    status: "مسودة",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      toast.error("الرجاء إدخال عنوان المنشور");
      return;
    }
    
    // Submit form
    toast.success("تم إضافة المنشور بنجاح");
    setTimeout(() => navigate("/"), 1500);
  };

  const handleCancel = () => {
    navigate("/");
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
          <h1 className="text-xl font-bold text-green-700 mr-2">إضافة منشور جديد</h1>
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
                <label htmlFor="title" className="block text-sm font-medium mb-2">عنوان المنشور *</label>
                <Input 
                  id="title" 
                  name="title" 
                  placeholder="أدخل عنوان المنشور" 
                  value={formData.title}
                  onChange={handleChange}
                  className="text-right"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium mb-2">الفئة *</label>
                  <select 
                    id="category" 
                    name="category" 
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 text-right"
                  >
                    <option value="منشور">منشور</option>
                    <option value="مجدول">مجدول</option>
                    <option value="مسودة">مسودة</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="status" className="block text-sm font-medium mb-2">الحالة *</label>
                  <select 
                    id="status" 
                    name="status" 
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 text-right"
                  >
                    <option value="مسودة">مسودة</option>
                    <option value="قيد المراجعة">قيد المراجعة</option>
                    <option value="معتمد">معتمد</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="content" className="block text-sm font-medium mb-2">محتوى المنشور</label>
                <Textarea 
                  id="content" 
                  name="content" 
                  placeholder="أدخل محتوى المنشور" 
                  value={formData.content}
                  onChange={handleChange}
                  className="text-right min-h-[150px]"
                />
              </div>
              
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="hasDesign" 
                  name="hasDesign"
                  checked={formData.hasDesign}
                  onChange={handleCheckboxChange}
                  className="ml-2"
                />
                <label htmlFor="hasDesign" className="text-sm">إضافة تصميم للمنشور</label>
              </div>
              
              {formData.hasDesign && (
                <div>
                  <label className="block text-sm font-medium mb-2">صورة المنشور</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                    <div className="mx-auto h-32 w-32 overflow-hidden bg-gray-100">
                      <img src={formData.image} alt="Post preview" className="h-full w-full object-cover" />
                    </div>
                    <div className="mt-4">
                      <Button type="button" variant="outline" className="mx-auto" onClick={() => toast.info("سيتم فتح نافذة اختيار الصورة")}>
                        رفع صورة
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end space-x-4 space-x-reverse">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  إلغاء
                </Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  <span>إضافة المنشور</span>
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

export default AddPost;

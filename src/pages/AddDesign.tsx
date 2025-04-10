
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell, ArrowRight, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AddDesign = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "ترويجي",
    description: "",
    image: "/placeholder.svg",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      toast.error("الرجاء إدخال عنوان للتصميم");
      return;
    }
    
    // Submit form
    toast.success("تم إضافة التصميم بنجاح");
    setTimeout(() => navigate("/designs"), 1500);
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
                <select 
                  id="category" 
                  name="category" 
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 text-right"
                >
                  <option value="ترويجي">ترويجي</option>
                  <option value="هوية بصرية">هوية بصرية</option>
                  <option value="وسائل تواصل">وسائل تواصل</option>
                  <option value="طباعة">طباعة</option>
                  <option value="ويب">ويب</option>
                </select>
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
                  <div className="mx-auto h-32 w-32 overflow-hidden bg-gray-100">
                    <img src={formData.image} alt="Design preview" className="h-full w-full object-cover" />
                  </div>
                  <div className="mt-4">
                    <Button type="button" variant="outline" className="mx-auto" onClick={() => toast.info("سيتم فتح نافذة اختيار الصورة")}>
                      رفع صورة
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 space-x-reverse">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  إلغاء
                </Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  <span>إضافة التصميم</span>
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

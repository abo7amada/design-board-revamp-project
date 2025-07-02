
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bell, ArrowRight, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { SocialPreview } from "@/components/social/SocialPreview";
import { PostScheduler } from "@/components/post/PostScheduler";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePosts } from "@/hooks/usePosts";
import { useClients } from "@/hooks/useClients";
import { useDesigns } from "@/hooks/useDesigns";

const AddPost = () => {
  const navigate = useNavigate();
  const { addPost, loading: postsLoading } = usePosts();
  const { clients, loading: clientsLoading } = useClients();
  const { designs, loading: designsLoading } = useDesigns();
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    status: "draft",
    client_id: "",
    design_id: "",
    platforms: [] as string[],
    scheduled_at: "",
    hasDesign: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      toast.error("الرجاء إدخال عنوان المنشور");
      return;
    }
    
    // Prepare data for submission
    const postData = {
      title: formData.title,
      content: formData.content || null,
      status: formData.status,
      client_id: formData.client_id || null,
      design_id: formData.hasDesign && formData.design_id ? formData.design_id : null,
      platforms: formData.platforms.length > 0 ? formData.platforms : null,
      scheduled_at: formData.scheduled_at || null,
      published_at: null,
    };
    
    const result = await addPost(postData);
    if (result) {
      setTimeout(() => navigate("/"), 1500);
    }
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
      <div className="p-6 max-w-6xl mx-auto">
        <Tabs defaultValue="editor" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="editor">تحرير المنشور</TabsTrigger>
            <TabsTrigger value="preview">معاينة المنصات</TabsTrigger>
            <TabsTrigger value="schedule">جدولة النشر</TabsTrigger>
          </TabsList>
          
          <TabsContent value="editor">
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
                        <label htmlFor="client_id" className="block text-sm font-medium mb-2">العميل</label>
                        <Select value={formData.client_id} onValueChange={(value) => setFormData(prev => ({ ...prev, client_id: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر العميل" />
                          </SelectTrigger>
                          <SelectContent>
                            {clients.map((client) => (
                              <SelectItem key={client.id} value={client.id}>
                                {client.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label htmlFor="status" className="block text-sm font-medium mb-2">الحالة *</label>
                        <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">مسودة</SelectItem>
                            <SelectItem value="review">قيد المراجعة</SelectItem>
                            <SelectItem value="approved">معتمد</SelectItem>
                            <SelectItem value="published">منشور</SelectItem>
                          </SelectContent>
                        </Select>
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
                      <label htmlFor="hasDesign" className="text-sm">ربط تصميم بالمنشور</label>
                    </div>
                    
                    {formData.hasDesign && (
                      <div>
                        <label htmlFor="design_id" className="block text-sm font-medium mb-2">اختر التصميم</label>
                        <Select value={formData.design_id} onValueChange={(value) => setFormData(prev => ({ ...prev, design_id: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر التصميم" />
                          </SelectTrigger>
                          <SelectContent>
                            {designs.map((design) => (
                              <SelectItem key={design.id} value={design.id}>
                                {design.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">المنصات</label>
                      <div className="flex flex-wrap gap-2">
                        {['facebook', 'instagram', 'twitter', 'linkedin'].map((platform) => (
                          <div key={platform} className="flex items-center">
                            <input 
                              type="checkbox" 
                              id={platform}
                              checked={formData.platforms.includes(platform)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFormData(prev => ({ ...prev, platforms: [...prev.platforms, platform] }));
                                } else {
                                  setFormData(prev => ({ ...prev, platforms: prev.platforms.filter(p => p !== platform) }));
                                }
                              }}
                              className="ml-2"
                            />
                            <label htmlFor={platform} className="text-sm capitalize">{platform}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="scheduled_at" className="block text-sm font-medium mb-2">وقت النشر المجدول (اختياري)</label>
                      <Input 
                        id="scheduled_at" 
                        name="scheduled_at" 
                        type="datetime-local"
                        value={formData.scheduled_at}
                        onChange={handleChange}
                        className="text-right"
                      />
                    </div>
                  
                  <div className="flex justify-end space-x-4 space-x-reverse">
                    <Button type="button" variant="outline" onClick={handleCancel}>
                      إلغاء
                    </Button>
                    <Button type="submit" disabled={postsLoading} className="bg-green-600 hover:bg-green-700">
                      <span>{postsLoading ? "جاري الإضافة..." : "إضافة المنشور"}</span>
                      <ArrowRight className="mr-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="preview">
            <SocialPreview post={formData} />
          </TabsContent>
          
          <TabsContent value="schedule">
            <PostScheduler />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AddPost;

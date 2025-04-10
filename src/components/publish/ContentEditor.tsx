
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageSquare, ExternalLink } from "lucide-react";

interface ContentEditorProps {
  caption: string;
  setCaption: (caption: string) => void;
  linkUrl: string;
  setLinkUrl: (url: string) => void;
  selectedPlatform: string | null;
  designTitle: string;
  designImage: string;
  getSelectedPlatformsCount: () => number;
  onBack: () => void;
  onContinue: () => void;
}

const ContentEditor = ({
  caption,
  setCaption,
  linkUrl,
  setLinkUrl,
  selectedPlatform,
  designTitle,
  designImage,
  getSelectedPlatformsCount,
  onBack,
  onContinue
}: ContentEditorProps) => {
  const getPlatformNameInArabic = (platform: string) => {
    switch (platform) {
      case "facebook": return "فيسبوك";
      case "instagram": return "انستغرام";
      case "twitter": return "تويتر";
      case "linkedin": return "لينكد إن";
      case "website": return "الموقع";
      case "tiktok": return "تيك توك";
      default: return platform;
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">{caption.length}/2200 حرف</span>
          <Label htmlFor="caption" className="font-medium flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            التعليق
          </Label>
        </div>
        <Textarea 
          id="caption" 
          placeholder="أضف تعليقًا للمنشور..." 
          className="resize-none text-right" 
          rows={4}
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          maxLength={2200}
        />
      </div>
      
      <div>
        <Label htmlFor="link" className="flex items-center justify-end gap-2 mb-2">
          <ExternalLink className="h-4 w-4" />
          رابط خارجي (اختياري)
        </Label>
        <Input 
          id="link" 
          placeholder="أدخل الرابط الذي تريد مشاركته..." 
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
          className="text-right"
        />
        <p className="text-xs text-muted-foreground mt-1 text-right">
          سيتم تقصير الرابط تلقائيًا وتتبع النقرات عليه
        </p>
      </div>
      
      <div className="rounded-md bg-gray-50 p-3 flex justify-between items-center">
        <Button 
          size="sm" 
          variant="outline"
          onClick={onContinue}
        >
          اقتراحات الذكاء الاصطناعي
        </Button>
        <div className="flex items-center gap-2">
          <img src={designImage} alt={designTitle} className="h-10 w-10 rounded-md object-cover" />
          <div className="text-right">
            <p className="text-sm font-medium">{designTitle}</p>
            <p className="text-xs text-gray-500">
              {selectedPlatform ? getPlatformNameInArabic(selectedPlatform) : `${getSelectedPlatformsCount()} منصات محددة`}
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={onBack}
        >
          الرجوع للمنصات
        </Button>
        <Button 
          size="sm"
          onClick={onContinue}
        >
          متابعة للجدولة
        </Button>
      </div>
    </div>
  );
};

export default ContentEditor;

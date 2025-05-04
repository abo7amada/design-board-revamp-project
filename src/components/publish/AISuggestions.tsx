
import { Button } from "@/components/ui/button";
import { User, CheckCircle, Instagram, Facebook, Twitter, Linkedin } from "lucide-react";
import { useAISuggestions } from "@/hooks/useAISuggestions";

interface AISuggestion {
  text: string;
  platform: string;
}

interface AISuggestionsProps {
  selectedPlatform: string | null;
  targetAudience: string;
  onSelectSuggestion: (suggestion: AISuggestion) => void;
  onBack: () => void;
  trends: string[];
  designTitle: string;
  designAuthor: string;
}

const AISuggestions = ({
  selectedPlatform,
  targetAudience,
  onSelectSuggestion,
  onBack,
  trends,
  designTitle,
  designAuthor
}: AISuggestionsProps) => {
  // Use our custom AI suggestions hook
  const {
    isAiGenerating,
    aiSuggestions,
    handleGenerateAISuggestions
  } = useAISuggestions(true, designTitle, designAuthor);

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <Button 
          onClick={handleGenerateAISuggestions}
          disabled={isAiGenerating}
        >
          {isAiGenerating ? "جاري التوليد..." : "توليد اقتراحات ذكية"}
        </Button>
        <h3 className="font-medium">مساعد الذكاء الاصطناعي</h3>
      </div>
      
      <p className="text-sm text-gray-500 mb-4 text-right">
        يمكن للذكاء الاصطناعي اقتراح محتوى مناسب لمنشورك بناءً على نوع التصميم والجمهور المستهدف والمنصة المختارة
      </p>
      
      {isAiGenerating ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-green-600"></div>
        </div>
      ) : (
        <div className="space-y-3">
          {aiSuggestions.length > 0 ? (
            aiSuggestions
              .filter(s => s.platform === "all" || !selectedPlatform || s.platform === selectedPlatform)
              .map((suggestion, index) => (
                <div 
                  key={index} 
                  className={`border rounded-md p-3 hover:bg-gray-50 cursor-pointer ${suggestion.platform !== "all" ? 
                    suggestion.platform === "instagram" ? "border-pink-200" : 
                    suggestion.platform === "facebook" ? "border-blue-200" : 
                    suggestion.platform === "twitter" ? "border-blue-100" : 
                    suggestion.platform === "linkedin" ? "border-blue-300" : "" : ""}`}
                  onClick={() => onSelectSuggestion(suggestion)}
                >
                  <p className="text-sm text-right">{suggestion.text}</p>
                  <div className="flex justify-between items-center mt-2">
                    <Button variant="ghost" size="sm" onClick={(e) => {
                      e.stopPropagation();
                      onSelectSuggestion(suggestion);
                    }}>
                      <CheckCircle className="h-4 w-4 ml-1" />
                      استخدام
                    </Button>
                    <div className="text-xs text-gray-500 flex items-center">
                      {suggestion.platform !== "all" && (
                        <>
                          {suggestion.platform === "instagram" && <Instagram className="h-3 w-3 ml-1 text-pink-600" />}
                          {suggestion.platform === "facebook" && <Facebook className="h-3 w-3 ml-1 text-blue-600" />}
                          {suggestion.platform === "twitter" && <Twitter className="h-3 w-3 ml-1 text-blue-400" />}
                          {suggestion.platform === "linkedin" && <Linkedin className="h-3 w-3 ml-1 text-blue-700" />}
                          مخصص لـ 
                          {suggestion.platform === "instagram" ? " انستغرام" : 
                           suggestion.platform === "facebook" ? " فيسبوك" : 
                           suggestion.platform === "twitter" ? " تويتر" : 
                           suggestion.platform === "linkedin" ? " لينكد إن" : ""}
                        </>
                      )}
                      {suggestion.platform === "all" && "مناسب لجميع المنصات"}
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <div className="border rounded-md p-4 text-center">
              <p className="text-gray-500">
                انقر على "توليد اقتراحات ذكية" لعرض اقتراحات لمحتوى منشورك
              </p>
            </div>
          )}
          
          {aiSuggestions.length > 0 && (
            <div className="pt-2">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleGenerateAISuggestions}
              >
                توليد المزيد من الاقتراحات
              </Button>
            </div>
          )}
        </div>
      )}
      
      <div className="mt-6 rounded-md bg-blue-50 p-3">
        <h4 className="font-medium text-right mb-2">نصائح لتحسين المحتوى</h4>
        <ul className="text-sm text-gray-600 space-y-1 list-disc pr-5 text-right">
          <li>استخدم هاشتاغات مناسبة لزيادة الوصول</li>
          <li>أضف دعوة واضحة للتفاعل مع المنشور</li>
          <li>اجعل النص قصيرًا ومباشرًا وجذابًا</li>
          <li>وجه سؤالًا للجمهور لتشجيع التفاعل</li>
          {selectedPlatform === "instagram" && <li>استخدم الرموز التعبيرية بشكل مناسب لجذب الانتباه</li>}
          {selectedPlatform === "facebook" && <li>اذكر الأشخاص المرتبطين بالتصميم لزيادة المشاركة</li>}
          {selectedPlatform === "twitter" && <li>الالتزام بعدد محدود من الأحرف يزيد من فعالية التغريدة</li>}
          {selectedPlatform === "linkedin" && <li>استخدم لغة احترافية تناسب طبيعة المنصة</li>}
        </ul>
      </div>

      <div className="flex justify-between items-center mt-4">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onBack}
        >
          العودة للمحتوى
        </Button>
        <div className="flex items-center text-xs text-gray-500">
          <span>هذه الاقتراحات تستند على تحليل {trends.length} ترند حالي</span>
        </div>
      </div>
    </div>
  );
};

export default AISuggestions;


import { useState, useEffect } from "react";
import { toast } from "sonner";

interface AISuggestion {
  text: string;
  platform: string;
}

export function useAISuggestions(isOpen: boolean, designTitle: string, designAuthor: string) {
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<AISuggestion[]>([]);
  const [trends, setTrends] = useState<string[]>([]);

  // Load current trends (simulation)
  useEffect(() => {
    if (isOpen) {
      setTrends([
        "#تصميم_الجرافيك",
        "#التسويق_الرقمي",
        "#تصميم_المواقع",
        "#محتوى_إبداعي",
        "#تصميم_هوية_بصرية",
        "#ريادة_أعمال"
      ]);
    }
  }, [isOpen]);

  const handleGenerateAISuggestions = () => {
    setIsAiGenerating(true);
    
    // محاكاة استجابة من خدمة الذكاء الاصطناعي
    setTimeout(() => {
      const suggestions = [
        {
          text: `استعدوا لتجربة لا مثيل لها مع ${designTitle}! تصميم فريد يعكس رؤيتنا المبتكرة ويلبي احتياجاتكم بأسلوب عصري. اكتشفوا الفرق الآن! #تصميم_ابداعي #حلول_مبتكرة ${trends[0]} ${trends[1]}`,
          platform: "all"
        },
        {
          text: `نفخر بتقديم ${designTitle} - نتاج شغف وإبداع فريقنا المتميز. صُمم خصيصاً لكم بعناية فائقة للتفاصيل. شاركونا آراءكم وانطباعاتكم! #تصميم_احترافي #خبرة_عالية`,
          platform: "all"
        },
        {
          text: `أطلقنا اليوم ${designTitle} بمزايا جديدة ومبتكرة. تصميم عصري يجمع بين الأناقة والعملية. تابعونا للمزيد من التفاصيل المثيرة! #إطلاق_جديد #تصميم_مبتكر`,
          platform: "all"
        },
        {
          text: `✨ شاهدوا أحدث تصاميمنا: ${designTitle}. من #تصميم: ${designAuthor}. أخبرونا برأيكم في التعليقات 👇 ${trends[2]} ${trends[3]}`,
          platform: "instagram"
        },
        {
          text: `مع ${designTitle} نقدم لكم تجربة مميزة تجمع بين الابتكار والإبداع. اضغط على الرابط في البايو للمزيد من المعلومات! 🎨✨ ${trends[0]}`,
          platform: "instagram"
        },
        {
          text: `أطلقنا للتو ${designTitle}! تصميم يجمع بين الوظائف العملية والمظهر الجذاب ليناسب احتياجاتكم. شاركوا المنشور مع من يهتم! ${trends[2]}`,
          platform: "facebook"
        },
        {
          text: `تصميم جديد يضاف لسلسلة أعمالنا المميزة: ${designTitle}. صمم خصيصاً ليلبي احتياجات عملائنا ويتجاوز توقعاتهم. ماذا تعتقدون؟ ${trends[4]}`,
          platform: "facebook"
        },
        {
          text: `تصميم ${designTitle} متاح الآن! 🚀 إبداع وابتكار في تصميم واحد. للاستفسار والطلب: اضغط على الرابط أدناه. ${trends[0]} ${trends[5]}`,
          platform: "twitter"
        },
        {
          text: `نقدم لكم: ${designTitle} - أحدث إضافة لمجموعة تصاميمنا الاحترافية. نسعد بمشاركتكم ملاحظاتكم وآرائكم! ${trends[1]}`,
          platform: "linkedin"
        }
      ];
      
      setAiSuggestions(suggestions);
      setIsAiGenerating(false);
    }, 2000);
  };

  const handleSelectAISuggestion = (suggestion: AISuggestion) => {
    toast.success("تم اختيار الاقتراح بنجاح");
    return suggestion;
  };

  return {
    isAiGenerating,
    aiSuggestions,
    trends,
    handleGenerateAISuggestions,
    handleSelectAISuggestion
  };
}

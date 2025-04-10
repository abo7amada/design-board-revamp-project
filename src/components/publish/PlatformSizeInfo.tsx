
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PlatformSizeInfoProps {
  selectedPlatform: string | null;
  targetAudience: string;
  setTargetAudience: (audience: string) => void;
}

const PlatformSizeInfo = ({
  selectedPlatform,
  targetAudience,
  setTargetAudience
}: PlatformSizeInfoProps) => {
  return (
    <>
      <div className="mb-4">
        <Label htmlFor="targetAudience" className="mb-2 block">الجمهور المستهدف (يساعد في اقتراحات المحتوى)</Label>
        <Input 
          id="targetAudience" 
          placeholder="مثال: مصممين، رواد أعمال، مسوقين..." 
          value={targetAudience}
          onChange={(e) => setTargetAudience(e.target.value)}
        />
      </div>
      
      <div className="rounded-md bg-gray-50 p-4">
        <h4 className="font-medium mb-2">معلومات المنصة المختارة</h4>
        {selectedPlatform === "instagram" && (
          <p className="text-sm text-gray-600">
            منصة انستغرام مثالية للمحتوى البصري. يُفضل استخدام الصور عالية الجودة والتصاميم الجذابة مع هاشتاغات مناسبة للوصول لجمهور أكبر.
          </p>
        )}
        {selectedPlatform === "facebook" && (
          <p className="text-sm text-gray-600">
            يتيح فيسبوك مشاركة تصاميم متنوعة. يُفضل إضافة نص تفصيلي للمنشور واستخدام روابط لتوجيه المستخدمين نحو المزيد من المعلومات.
          </p>
        )}
        {selectedPlatform === "twitter" && (
          <p className="text-sm text-gray-600">
            تويتر يناسب المحتوى القصير والمباشر. استخدم جمل مختصرة وهاشتاغات رائجة لزيادة انتشار تغريداتك.
          </p>
        )}
        {selectedPlatform === "linkedin" && (
          <p className="text-sm text-gray-600">
            لينكد إن منصة مهنية تناسب المحتوى الاحترافي. ركز على القيمة المهنية التي يقدمها التصميم واستخدم لغة رسمية.
          </p>
        )}
        {selectedPlatform === "website" && (
          <p className="text-sm text-gray-600">
            نشر التصميم على موقعك الإلكتروني يتيح لك حرية أكبر في العرض والتنسيق. يمكنك إضافة تفاصيل أكثر ومعلومات إضافية.
          </p>
        )}
        {selectedPlatform === "tiktok" && (
          <p className="text-sm text-gray-600">
            تيك توك منصة مخصصة للفيديو القصير. يمكنك استخدام التصميم كمقدمة أو خلفية لفيديو قصير جذاب.
          </p>
        )}
      </div>
    </>
  );
};

export default PlatformSizeInfo;

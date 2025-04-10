
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Crop, AlertTriangle } from "lucide-react";

interface PlatformSize {
  width: number;
  height: number;
  label: string;
}

interface PlatformSizes {
  [platform: string]: {
    [size: string]: PlatformSize;
  };
}

interface SizeSelectorProps {
  platformSizes: PlatformSizes;
  selectedPlatform: string | null;
  selectedSize: string;
  autoResizeEnabled: boolean;
  onSizeSelect: (size: string) => void;
  onAutoResizeToggle: (enabled: boolean) => void;
}

const SizeSelector = ({
  platformSizes,
  selectedPlatform,
  selectedSize,
  autoResizeEnabled,
  onSizeSelect,
  onAutoResizeToggle
}: SizeSelectorProps) => {
  if (!selectedPlatform || selectedPlatform === "website") {
    return null;
  }

  return (
    <div className="border rounded-md p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 space-x-reverse">
          <Switch 
            id="auto-resize" 
            checked={autoResizeEnabled}
            onCheckedChange={onAutoResizeToggle}
          />
          <Label htmlFor="auto-resize">ضبط حجم التصميم تلقائياً للمنصة</Label>
        </div>
        <div className="flex items-center">
          <Crop className="h-4 w-4 ml-2 text-gray-500" />
          <span className="text-sm text-gray-500">ضبط حجم التصميم</span>
        </div>
      </div>
      
      <h4 className="font-medium mb-4 text-right">اختر حجم المنشور:</h4>
      <div className="grid grid-cols-2 gap-3">
        {selectedPlatform === "instagram" && (
          <>
            <Button 
              variant="outline" 
              className={`p-3 h-auto flex-col items-center justify-center ${selectedSize === "instagram.feed" ? "bg-pink-50 border-pink-500" : ""}`}
              onClick={() => onSizeSelect("instagram.feed")}
            >
              <div className="w-16 h-16 bg-pink-100 rounded-md mb-2 flex items-center justify-center">
                <div className="w-12 h-12 bg-pink-200 rounded-sm"></div>
              </div>
              <span className="text-xs">مربع 1:1</span>
              <span className="text-xs text-gray-500">{platformSizes.instagram.feed.width}x{platformSizes.instagram.feed.height}</span>
            </Button>
            <Button 
              variant="outline" 
              className={`p-3 h-auto flex-col items-center justify-center ${selectedSize === "instagram.portrait" ? "bg-pink-50 border-pink-500" : ""}`}
              onClick={() => onSizeSelect("instagram.portrait")}
            >
              <div className="w-12 h-16 bg-pink-100 rounded-md mb-2 flex items-center justify-center">
                <div className="w-8 h-10 bg-pink-200 rounded-sm"></div>
              </div>
              <span className="text-xs">عمودي 4:5</span>
              <span className="text-xs text-gray-500">{platformSizes.instagram.portrait.width}x{platformSizes.instagram.portrait.height}</span>
            </Button>
            <Button 
              variant="outline" 
              className={`p-3 h-auto flex-col items-center justify-center ${selectedSize === "instagram.landscape" ? "bg-pink-50 border-pink-500" : ""}`}
              onClick={() => onSizeSelect("instagram.landscape")}
            >
              <div className="w-16 h-10 bg-pink-100 rounded-md mb-2 flex items-center justify-center">
                <div className="w-12 h-6 bg-pink-200 rounded-sm"></div>
              </div>
              <span className="text-xs">أفقي 1.91:1</span>
              <span className="text-xs text-gray-500">{platformSizes.instagram.landscape.width}x{platformSizes.instagram.landscape.height}</span>
            </Button>
            <Button 
              variant="outline" 
              className={`p-3 h-auto flex-col items-center justify-center ${selectedSize === "instagram.story" ? "bg-pink-50 border-pink-500" : ""}`}
              onClick={() => onSizeSelect("instagram.story")}
            >
              <div className="w-10 h-16 bg-pink-100 rounded-md mb-2 flex items-center justify-center">
                <div className="w-6 h-10 bg-pink-200 rounded-sm"></div>
              </div>
              <span className="text-xs">ستوري 9:16</span>
              <span className="text-xs text-gray-500">{platformSizes.instagram.story.width}x{platformSizes.instagram.story.height}</span>
            </Button>
          </>
        )}
        
        {selectedPlatform === "facebook" && (
          <>
            <Button 
              variant="outline" 
              className={`p-3 h-auto flex-col items-center justify-center ${selectedSize === "facebook.post" ? "bg-blue-50 border-blue-500" : ""}`}
              onClick={() => onSizeSelect("facebook.post")}
            >
              <div className="w-16 h-10 bg-blue-100 rounded-md mb-2 flex items-center justify-center">
                <div className="w-12 h-6 bg-blue-200 rounded-sm"></div>
              </div>
              <span className="text-xs">منشور 1.91:1</span>
              <span className="text-xs text-gray-500">{platformSizes.facebook.post.width}x{platformSizes.facebook.post.height}</span>
            </Button>
            <Button 
              variant="outline" 
              className={`p-3 h-auto flex-col items-center justify-center ${selectedSize === "facebook.cover" ? "bg-blue-50 border-blue-500" : ""}`}
              onClick={() => onSizeSelect("facebook.cover")}
            >
              <div className="w-16 h-8 bg-blue-100 rounded-md mb-2 flex items-center justify-center">
                <div className="w-12 h-5 bg-blue-200 rounded-sm"></div>
              </div>
              <span className="text-xs">صورة الغلاف</span>
              <span className="text-xs text-gray-500">{platformSizes.facebook.cover.width}x{platformSizes.facebook.cover.height}</span>
            </Button>
          </>
        )}
        
        {selectedPlatform === "twitter" && (
          <>
            <Button 
              variant="outline" 
              className={`p-3 h-auto flex-col items-center justify-center ${selectedSize === "twitter.post" ? "bg-blue-50 border-blue-400" : ""}`}
              onClick={() => onSizeSelect("twitter.post")}
            >
              <div className="w-16 h-10 bg-blue-100 rounded-md mb-2 flex items-center justify-center">
                <div className="w-12 h-7 bg-blue-200 rounded-sm"></div>
              </div>
              <span className="text-xs">تغريدة 16:9</span>
              <span className="text-xs text-gray-500">{platformSizes.twitter.post.width}x{platformSizes.twitter.post.height}</span>
            </Button>
            <Button 
              variant="outline" 
              className={`p-3 h-auto flex-col items-center justify-center ${selectedSize === "twitter.header" ? "bg-blue-50 border-blue-400" : ""}`}
              onClick={() => onSizeSelect("twitter.header")}
            >
              <div className="w-16 h-6 bg-blue-100 rounded-md mb-2 flex items-center justify-center">
                <div className="w-12 h-4 bg-blue-200 rounded-sm"></div>
              </div>
              <span className="text-xs">رأس الصفحة</span>
              <span className="text-xs text-gray-500">{platformSizes.twitter.header.width}x{platformSizes.twitter.header.height}</span>
            </Button>
          </>
        )}
        
        {(selectedPlatform === "linkedin" || selectedPlatform === "tiktok" || selectedPlatform === "pinterest") && (
          <Button 
            variant="outline" 
            className={`p-3 h-auto flex-col items-center justify-center ${selectedSize.startsWith(selectedPlatform) ? "bg-gray-100 border-gray-400" : ""}`}
            onClick={() => onSizeSelect(`${selectedPlatform}.post`)}
          >
            <div className="w-16 h-12 bg-gray-100 rounded-md mb-2 flex items-center justify-center">
              <div className="w-12 h-8 bg-gray-200 rounded-sm"></div>
            </div>
            <span className="text-xs">
              {selectedPlatform === "linkedin" && "منشور لينكد إن"}
              {selectedPlatform === "tiktok" && "فيديو تيك توك"}
              {selectedPlatform === "pinterest" && "بين"}
            </span>
            <span className="text-xs text-gray-500">
              {selectedPlatform === "linkedin" && `${platformSizes.linkedin.post.width}x${platformSizes.linkedin.post.height}`}
              {selectedPlatform === "tiktok" && `${platformSizes.tiktok.video.width}x${platformSizes.tiktok.video.height}`}
              {selectedPlatform === "pinterest" && `${platformSizes.pinterest.pin.width}x${platformSizes.pinterest.pin.height}`}
            </span>
          </Button>
        )}
      </div>
      
      {!autoResizeEnabled && (
        <div className="mt-4 p-3 bg-yellow-50 rounded-md flex items-start">
          <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 ml-2 flex-shrink-0" />
          <div>
            <p className="text-sm text-yellow-700">
              عند تعطيل ضبط الحجم التلقائي، سيتم نشر التصميم بحجمه الأصلي دون معالجة، وقد يؤدي ذلك إلى اقتصاص أجزاء من التصميم على بعض المنصات.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SizeSelector;

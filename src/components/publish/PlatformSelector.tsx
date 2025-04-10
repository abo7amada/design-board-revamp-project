
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Facebook, Instagram, Twitter, Linkedin, Globe } from "lucide-react";

interface PlatformSelectorProps {
  selectedPlatform: string | null;
  onSelectPlatform: (platform: string) => void;
  onContinue: () => void;
  platformSpecificStep: number;
  onBack: () => void;
}

const PlatformSelector = ({
  selectedPlatform,
  onSelectPlatform,
  onContinue,
  platformSpecificStep,
  onBack
}: PlatformSelectorProps) => {
  
  if (platformSpecificStep === 2) {
    return (
      <div className="flex justify-between items-center">
        <Button variant="outline" size="sm" onClick={onBack}>
          رجوع للمنصات
        </Button>
        <h3 className="font-medium">
          {selectedPlatform === "facebook" && "إعدادات النشر على فيسبوك"}
          {selectedPlatform === "instagram" && "إعدادات النشر على انستغرام"}
          {selectedPlatform === "twitter" && "إعدادات النشر على تويتر"}
          {selectedPlatform === "linkedin" && "إعدادات النشر على لينكد إن"}
          {selectedPlatform === "website" && "إعدادات النشر على الموقع"}
          {selectedPlatform === "tiktok" && "إعدادات النشر على تيك توك"}
        </h3>
        <Button size="sm" onClick={onContinue}>
          متابعة
          <ArrowRight className="mr-2 h-4 w-4" />
        </Button>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <Button 
        variant="outline" 
        className={`flex flex-col items-center p-6 h-auto ${selectedPlatform === "facebook" ? "border-blue-500 bg-blue-50" : ""}`}
        onClick={() => onSelectPlatform("facebook")}
      >
        <Facebook className="h-8 w-8 text-blue-600 mb-2" />
        <span>فيسبوك</span>
      </Button>
      
      <Button 
        variant="outline" 
        className={`flex flex-col items-center p-6 h-auto ${selectedPlatform === "instagram" ? "border-pink-500 bg-pink-50" : ""}`}
        onClick={() => onSelectPlatform("instagram")}
      >
        <Instagram className="h-8 w-8 text-pink-600 mb-2" />
        <span>انستغرام</span>
      </Button>
      
      <Button 
        variant="outline" 
        className={`flex flex-col items-center p-6 h-auto ${selectedPlatform === "twitter" ? "border-blue-400 bg-blue-50" : ""}`}
        onClick={() => onSelectPlatform("twitter")}
      >
        <Twitter className="h-8 w-8 text-blue-400 mb-2" />
        <span>تويتر</span>
      </Button>
      
      <Button 
        variant="outline" 
        className={`flex flex-col items-center p-6 h-auto ${selectedPlatform === "linkedin" ? "border-blue-700 bg-blue-50" : ""}`}
        onClick={() => onSelectPlatform("linkedin")}
      >
        <Linkedin className="h-8 w-8 text-blue-700 mb-2" />
        <span>لينكد إن</span>
      </Button>
      
      <Button 
        variant="outline" 
        className={`flex flex-col items-center p-6 h-auto ${selectedPlatform === "website" ? "border-green-600 bg-green-50" : ""}`}
        onClick={() => onSelectPlatform("website")}
      >
        <Globe className="h-8 w-8 text-green-600 mb-2" />
        <span>الموقع الإلكتروني</span>
      </Button>
      
      <Button 
        variant="outline" 
        className={`flex flex-col items-center p-6 h-auto ${selectedPlatform === "tiktok" ? "border-black bg-gray-50" : ""}`}
        onClick={() => onSelectPlatform("tiktok")}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-8 w-8 mb-2" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/>
          <path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
          <path d="M15 8v8a4 4 0 0 1-4 4"/>
          <line x1="9" x2="9" y1="12" y2="20"/>
          <path d="M12 16h8a4 4 0 0 0 4-4V4"/>
        </svg>
        <span>تيك توك</span>
      </Button>
    </div>
  );
};

export default PlatformSelector;

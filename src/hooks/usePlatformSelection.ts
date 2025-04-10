
import { useState, useEffect } from "react";
import { platformSizes } from "@/components/publish/platformSizes";

export interface PlatformSelectionState {
  selectedPlatform: string | null;
  platforms: {
    facebook: boolean;
    instagram: boolean;
    twitter: boolean;
    linkedin: boolean;
    website: boolean;
    tiktok: boolean;
    pinterest: boolean;
  };
  selectedSize: string;
  autoResizeEnabled: boolean;
  platformSpecificStep: number;
}

export function usePlatformSelection(isOpen: boolean) {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [platforms, setPlatforms] = useState({
    facebook: false,
    instagram: false,
    twitter: false,
    linkedin: false,
    website: false,
    tiktok: false,
    pinterest: false,
  });
  const [selectedSize, setSelectedSize] = useState<string>("default");
  const [autoResizeEnabled, setAutoResizeEnabled] = useState(true);
  const [platformSpecificStep, setPlatformSpecificStep] = useState(1);

  // Reset state when modal reopens
  useEffect(() => {
    if (isOpen) {
      setPlatformSpecificStep(1);
      setSelectedPlatform(null);
    }
  }, [isOpen]);

  const handleSelectPlatform = (platform: string) => {
    setSelectedPlatform(platform);
    setPlatforms({
      facebook: platform === "facebook",
      instagram: platform === "instagram",
      twitter: platform === "twitter",
      linkedin: platform === "linkedin",
      website: platform === "website",
      tiktok: platform === "tiktok",
      pinterest: platform === "pinterest"
    });
    setPlatformSpecificStep(2);
    
    // Set default size for the selected platform
    switch (platform) {
      case "instagram":
        setSelectedSize("instagram.feed");
        break;
      case "facebook":
        setSelectedSize("facebook.post");
        break;
      case "twitter":
        setSelectedSize("twitter.post");
        break;
      case "linkedin":
        setSelectedSize("linkedin.post");
        break;
      case "tiktok":
        setSelectedSize("tiktok.video");
        break;
      case "pinterest":
        setSelectedSize("pinterest.pin");
        break;
      default:
        setSelectedSize("default");
    }
  };

  const getSelectedPlatformsCount = () => {
    return Object.values(platforms).filter(Boolean).length;
  };

  return {
    selectedPlatform,
    platforms,
    selectedSize,
    autoResizeEnabled,
    platformSpecificStep,
    setSelectedPlatform,
    setPlatforms,
    setSelectedSize,
    setAutoResizeEnabled,
    setPlatformSpecificStep,
    handleSelectPlatform,
    getSelectedPlatformsCount
  };
}

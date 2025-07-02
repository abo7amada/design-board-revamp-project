export const getPlatformName = (platform: string): string => {
  switch (platform) {
    case "facebook": return "فيسبوك";
    case "instagram": return "انستغرام";
    case "twitter": return "تويتر";
    case "tiktok": return "تيك توك";
    case "snapchat": return "سناب شات";
    default: return platform;
  }
};
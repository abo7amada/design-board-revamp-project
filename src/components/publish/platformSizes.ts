
export interface PlatformSize {
  width: number;
  height: number;
  label: string;
}

export interface PlatformSizes {
  [platform: string]: {
    [size: string]: PlatformSize;
  };
}

// مقاسات المنصات
export const platformSizes: PlatformSizes = {
  instagram: {
    feed: { width: 1080, height: 1080, label: "منشور مربع" },
    story: { width: 1080, height: 1920, label: "ستوري" },
    portrait: { width: 1080, height: 1350, label: "صورة عمودية" },
    landscape: { width: 1080, height: 566, label: "صورة أفقية" }
  },
  facebook: {
    post: { width: 1200, height: 630, label: "منشور فيسبوك" },
    cover: { width: 820, height: 312, label: "صورة غلاف" },
    profile: { width: 170, height: 170, label: "صورة شخصية" }
  },
  twitter: {
    post: { width: 1200, height: 675, label: "تغريدة" },
    header: { width: 1500, height: 500, label: "رأس الصفحة" }
  },
  linkedin: {
    post: { width: 1200, height: 627, label: "منشور لينكد إن" }
  },
  tiktok: {
    video: { width: 1080, height: 1920, label: "فيديو تيك توك" }
  },
  pinterest: {
    pin: { width: 1000, height: 1500, label: "بين" }
  }
};


// بيانات افتراضية للتصاميم
export const designsData = [
  {
    id: 1,
    title: "إطلاق منتج جديد",
    category: "معتمد",
    image: "/placeholder.svg",
    date: "2023/05/02",
    author: "شركة الوفق الأصفر",
    likes: 24,
    comments: 8,
    description: "تم تصميم الإعلان بألوان العلامة التجارية",
    clientId: 1
  },
  {
    id: 2,
    title: "ورشة عمل تقنية",
    category: "قيد المراجعة",
    image: "/placeholder.svg",
    date: "2023/06/05",
    author: "شركة الوفق الأصفر",
    likes: 43,
    comments: 12,
    description: "أضفت تفاصيل الورشة كما طلبتم",
    clientId: 1
  },
  {
    id: 3,
    title: "إعلان توظيف",
    category: "مسودة",
    image: "/placeholder.svg",
    date: "2023/09/01",
    author: "مؤسسة نجمة الشمال",
    likes: 18,
    comments: 5,
    description: "بانتظار تعليقاتكم على التصميم",
    clientId: 2
  }
];

// بيانات افتراضية للمنشورات
export const postsData = [
  {
    id: 1,
    title: "منشور عن إطلاق منتج جديد",
    status: "منشور",
    platform: "انستغرام",
    scheduledDate: "2023/05/15",
    image: "/placeholder.svg",
    likes: 45,
    comments: 12,
    shares: 8,
    clientId: 1,
    date: "2023/05/05",
    author: "شركة الوفق الأصفر",
    hasDesign: true
  },
  {
    id: 2,
    title: "منشور عن ورشة عمل",
    status: "مجدول",
    platform: "تويتر",
    scheduledDate: "2023/06/20",
    image: "/placeholder.svg",
    likes: 32,
    comments: 5,
    shares: 15,
    clientId: 1,
    date: "2023/06/10",
    author: "شركة الوفق الأصفر",
    hasDesign: true
  },
  {
    id: 3,
    title: "منشور تهنئة عيد الفطر",
    status: "مسودة",
    platform: "فيسبوك",
    scheduledDate: "2023/04/20",
    image: "/placeholder.svg",
    likes: 0,
    comments: 0,
    shares: 0,
    clientId: 2,
    date: "2023/04/10",
    author: "مؤسسة نجمة الشمال",
    hasDesign: false
  }
];

// تصنيف التصاميم حسب الحالة
export const designStatuses = {
  "معتمد": { color: "bg-green-100", textColor: "text-green-800", borderColor: "border-green-500" },
  "قيد المراجعة": { color: "bg-yellow-100", textColor: "text-yellow-800", borderColor: "border-yellow-500" },
  "مسودة": { color: "bg-gray-100", textColor: "text-gray-800", borderColor: "border-gray-500" }
};

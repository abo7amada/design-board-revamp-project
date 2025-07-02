
// بيانات افتراضية للتصاميم
export const designsData = [
  {
    id: "1",
    title: "إطلاق منتج جديد",
    category: "معتمد",
    image: "/lovable-uploads/10fc914b-5004-4050-8edd-e2273f4b215d.png",
    date: "2023/05/02",
    author: "شركة الوفق الأصفر",
    likes: 24,
    comments: 8,
    description: "تم تصميم الإعلان بألوان العلامة التجارية",
    clientId: 1
  },
  {
    id: "2",
    title: "ورشة عمل تقنية",
    category: "قيد المراجعة",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaCUyMHdvcmtzaG9wfGVufDB8fDB8fHww",
    date: "2023/06/05",
    author: "شركة الوفق الأصفر",
    likes: 43,
    comments: 12,
    description: "أضفت تفاصيل الورشة كما طلبتم",
    clientId: 1
  },
  {
    id: "3",
    title: "إعلان توظيف",
    category: "مسودة",
    image: "https://images.unsplash.com/photo-1575089976121-8ed7b2a54265?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNhcmVlcnxlbnwwfHwwfHx8MA%3D%3D",
    date: "2023/09/01",
    author: "مؤسسة نجمة الشمال",
    likes: 18,
    comments: 5,
    description: "بانتظار تعليقاتكم على التصميم",
    clientId: 2
  },
  {
    id: "4",
    title: "عرض خاص لرمضان",
    category: "معتمد",
    image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8UmFtYWRhbnxlbnwwfHwwfHx8MA%3D%3D",
    date: "2023/03/15",
    author: "شركة الوفق الأصفر",
    likes: 76,
    comments: 32,
    description: "تصميم خاص بمناسبة شهر رمضان المبارك",
    clientId: 1
  },
  {
    id: "5",
    title: "حملة ترويجية للربع الأول",
    category: "قيد المراجعة",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1hcmtldGluZyUyMGNhbXBhaWdufGVufDB8fDB8fHww",
    date: "2023/01/10",
    author: "مؤسسة نجمة الشمال",
    likes: 15,
    comments: 7,
    description: "مقترح تصميم للحملة الترويجية للربع الأول من السنة",
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
    image: "https://images.unsplash.com/photo-1664575601786-b00156752b61?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bmV3JTIwcHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
    likes: 45,
    comments: 12,
    shares: 8,
    clientId: 1,
    date: "2023/05/05",
    author: "شركة الوفق الأصفر",
    hasDesign: true,
    content: "نحن متحمسون للإعلان عن إطلاق منتجنا الجديد! ترقبوا المزيد من التفاصيل قريبًا."
  },
  {
    id: 2,
    title: "منشور عن ورشة عمل",
    status: "مجدول",
    platform: "تويتر",
    scheduledDate: "2023/06/20",
    image: "https://images.unsplash.com/photo-1544531585-9847b68c8c86?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fHdvcmtzaG9wfGVufDB8fDB8fHww",
    likes: 32,
    comments: 5,
    shares: 15,
    clientId: 1,
    date: "2023/06/10",
    author: "شركة الوفق الأصفر",
    hasDesign: true,
    content: "نتشرف بدعوتكم لحضور ورشة العمل التقنية القادمة. سجل الآن لتأمين مقعدك!"
  },
  {
    id: 3,
    title: "منشور تهنئة عيد الفطر",
    status: "مسودة",
    platform: "فيسبوك",
    scheduledDate: "2023/04/20",
    image: "https://images.unsplash.com/photo-1558486012-817176f84c6d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWlkJTIwbXViYXJha3xlbnwwfHwwfHx8MA%3D%3D",
    likes: 0,
    comments: 0,
    shares: 0,
    clientId: 2,
    date: "2023/04/10",
    author: "مؤسسة نجمة الشمال",
    hasDesign: false,
    content: "كل عام وأنتم بخير بمناسبة قدوم عيد الفطر المبارك. تقبل الله منا ومنكم صالح الأعمال."
  },
  {
    id: 4,
    title: "عروض خاصة بمناسبة العودة للمدارس",
    status: "منشور",
    platform: "انستغرام",
    scheduledDate: "2023/08/25",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFjayUyMHRvJTIwc2Nob29sfGVufDB8fDB8fHww",
    likes: 65,
    comments: 18,
    shares: 22,
    clientId: 1,
    date: "2023/08/20",
    author: "شركة الوفق الأصفر",
    hasDesign: true,
    content: "استعدوا للعام الدراسي الجديد مع عروضنا الحصرية! خصومات تصل إلى 30% على جميع المستلزمات المدرسية."
  },
  {
    id: 5,
    title: "إطلاق موقعنا الإلكتروني الجديد",
    status: "مجدول",
    platform: "فيسبوك",
    scheduledDate: "2023/07/10",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdlYnNpdGUlMjBsYXVuY2h8ZW58MHx8MHx8fDA%3D",
    likes: 0,
    comments: 0,
    shares: 0,
    clientId: 2,
    date: "2023/07/05",
    author: "مؤسسة نجمة الشمال",
    hasDesign: true,
    content: "يسرنا الإعلان عن إطلاق موقعنا الإلكتروني الجديد! تصفح الآن واكتشف خدماتنا المتنوعة ومنتجاتنا المميزة."
  },
  {
    id: 6,
    title: "نصائح للعناية بالبشرة في الصيف",
    status: "مسودة",
    platform: "تيك توك",
    scheduledDate: "2023/06/15",
    image: "https://images.unsplash.com/photo-1556228841-a3c527ebefe5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2tpbmNhcmV8ZW58MHx8MHx8fDA%3D",
    likes: 0,
    comments: 0,
    shares: 0,
    clientId: 1,
    date: "2023/06/10",
    author: "شركة الوفق الأصفر",
    hasDesign: false,
    content: "إليكم أهم النصائح للعناية ببشرتكم خلال فصل الصيف! احموا بشرتكم من أشعة الشمس واستمتعوا بصيف صحي."
  }
];

// تصنيف التصاميم حسب الحالة
export const designStatuses = {
  "معتمد": { color: "bg-green-100", textColor: "text-green-800", borderColor: "border-green-500" },
  "قيد المراجعة": { color: "bg-yellow-100", textColor: "text-yellow-800", borderColor: "border-yellow-500" },
  "مسودة": { color: "bg-gray-100", textColor: "text-gray-800", borderColor: "border-gray-500" }
};

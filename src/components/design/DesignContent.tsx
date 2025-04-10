
import { toast } from "sonner";

interface DesignContentProps {
  author: string;
  date: string;
}

const DesignContent = ({ author, date }: DesignContentProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-SA", { 
      month: "short", 
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <p className="text-sm text-gray-500">
      تم الإنشاء بواسطة{" "}
      <span 
        className="font-medium text-gray-700 cursor-pointer hover:underline" 
        onClick={(e) => {
          e.stopPropagation();
          toast.info(`عرض ملف المستخدم: ${author}`);
        }}
      >
        {author}
      </span>
      {" "}في {formatDate(date)}
    </p>
  );
};

export default DesignContent;

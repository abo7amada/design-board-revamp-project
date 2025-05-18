
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface PublishModalHeaderProps {
  designTitle: string;
}

const PublishModalHeader = ({ designTitle }: PublishModalHeaderProps) => {
  return (
    <DialogHeader>
      <DialogTitle className="text-xl">نشر التصميم</DialogTitle>
      <DialogDescription>
        اختر المنصات وأضف التفاصيل لنشر التصميم "{designTitle}"
      </DialogDescription>
    </DialogHeader>
  );
};

export default PublishModalHeader;

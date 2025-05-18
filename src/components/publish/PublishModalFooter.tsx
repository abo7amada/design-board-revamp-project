
import { Button } from "@/components/ui/button";

interface PublishModalFooterProps {
  onClose: () => void;
  onPublish: () => void;
  isScheduled: boolean;
  isDisabled: boolean;
}

const PublishModalFooter = ({
  onClose,
  onPublish,
  isScheduled,
  isDisabled
}: PublishModalFooterProps) => {
  return (
    <div className="flex justify-between">
      <Button variant="outline" onClick={onClose}>
        إلغاء
      </Button>
      <Button 
        className="bg-green-600 hover:bg-green-700" 
        onClick={onPublish}
        disabled={isDisabled}
      >
        {isScheduled ? "جدولة النشر" : "نشر الآن"}
      </Button>
    </div>
  );
};

export default PublishModalFooter;


import { Button } from "@/components/ui/button";

interface PublishModalFooterProps {
  onClose: () => void;
  onPublish: () => void;
  isScheduled: boolean;
  isDisabled: boolean;
  isLoading?: boolean;
}

const PublishModalFooter = ({
  onClose,
  onPublish,
  isScheduled,
  isDisabled,
  isLoading = false
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
        {isLoading ? "جاري النشر..." : isScheduled ? "جدولة النشر" : "نشر الآن"}
      </Button>
    </div>
  );
};

export default PublishModalFooter;

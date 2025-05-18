
import { TabsContent } from "@/components/ui/tabs";
import ScheduleSection from "./ScheduleSection";

interface ScheduleTabContentProps {
  isScheduled: boolean;
  setIsScheduled: (isScheduled: boolean) => void;
  publishDate: Date | undefined;
  setPublishDate: (date: Date | undefined) => void;
  publishTime: string;
  setPublishTime: (time: string) => void;
  onBack: () => void;
  onPublish: () => void;
}

const ScheduleTabContent = (props: ScheduleTabContentProps) => {
  return (
    <TabsContent value="schedule" className="space-y-4 pt-4">
      <ScheduleSection {...props} />
    </TabsContent>
  );
};

export default ScheduleTabContent;

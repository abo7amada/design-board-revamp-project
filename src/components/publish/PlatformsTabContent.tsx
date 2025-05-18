
import { TabsContent } from "@/components/ui/tabs";

interface PlatformsTabContentProps {
  children: React.ReactNode;
}

const PlatformsTabContent = ({ children }: PlatformsTabContentProps) => {
  return (
    <TabsContent value="platforms" className="space-y-4 pt-4">
      {children}
    </TabsContent>
  );
};

export default PlatformsTabContent;


import { TabsContent } from "@/components/ui/tabs";
import ContentEditor from "./ContentEditor";

interface ContentTabContentProps {
  caption: string;
  setCaption: (caption: string) => void;
  linkUrl: string;
  setLinkUrl: (url: string) => void;
  selectedPlatform: string | null;
  designTitle: string;
  designImage: string;
  getSelectedPlatformsCount: () => number;
  onBack: () => void;
  onContinue: () => void;
}

const ContentTabContent = (props: ContentTabContentProps) => {
  return (
    <TabsContent value="content" className="space-y-4 pt-4">
      <ContentEditor {...props} />
    </TabsContent>
  );
};

export default ContentTabContent;

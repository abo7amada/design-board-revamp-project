
import { TabsContent } from "@/components/ui/tabs";
import AISuggestions from "./AISuggestions";

interface AITabContentProps {
  selectedPlatform: string | null;
  targetAudience: string;
  onSelectSuggestion: (suggestion: { text: string, platform: string }) => void;
  onBack: () => void;
  trends: string[];
  designTitle: string;
  designAuthor: string;
}

const AITabContent = (props: AITabContentProps) => {
  return (
    <TabsContent value="ai" className="space-y-4 pt-4">
      <AISuggestions {...props} />
    </TabsContent>
  );
};

export default AITabContent;

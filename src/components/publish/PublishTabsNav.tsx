
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PublishTabsNavProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  children: React.ReactNode;
}

const PublishTabsNav = ({
  activeTab,
  onTabChange,
  children
}: PublishTabsNavProps) => {
  return (
    <Tabs defaultValue="platforms" value={activeTab} onValueChange={onTabChange}>
      <TabsList className="w-full">
        <TabsTrigger value="platforms">المنصات</TabsTrigger>
        <TabsTrigger value="content">المحتوى</TabsTrigger>
        <TabsTrigger value="schedule">الجدولة</TabsTrigger>
        <TabsTrigger value="ai">مساعد الذكاء</TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};

export default PublishTabsNav;

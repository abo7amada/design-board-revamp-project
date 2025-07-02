import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PlatformCard } from "./PlatformCard";
import { ConnectAccountDialog } from "./ConnectAccountDialog";
import { socialMediaAccounts } from "./mockData";
import { getPlatformName } from "./utils";

interface SocialMediaIntegrationProps {
  clientId?: number;
}

export const SocialMediaIntegration = ({ clientId }: SocialMediaIntegrationProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(clientId);

  const getClientAccounts = () => {
    if (!selectedClientId || !socialMediaAccounts[selectedClientId as keyof typeof socialMediaAccounts]) {
      return {
        facebook: { connected: false, name: "", url: "" },
        instagram: { connected: false, name: "", url: "" },
        twitter: { connected: false, name: "", url: "" },
        tiktok: { connected: false, name: "", url: "" },
        snapchat: { connected: false, name: "", url: "" },
      };
    }
    return socialMediaAccounts[selectedClientId as keyof typeof socialMediaAccounts];
  };

  const accounts = getClientAccounts();
  const platforms = ["facebook", "instagram", "twitter", "tiktok", "snapchat"];

  return (
    <div className="mt-6 border-t pt-6">
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => {
            setSelectedClientId(clientId);
            setIsDialogOpen(true);
          }}
        >
          <Plus className="h-4 w-4" />
          <span>ربط حساب جديد</span>
        </Button>
        <h3 className="font-bold text-lg">منصات التواصل الاجتماعي</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {platforms.map((platform) => (
          <PlatformCard
            key={platform}
            platform={platform}
            account={accounts[platform as keyof typeof accounts]}
            platformName={getPlatformName(platform)}
          />
        ))}
      </div>

      <ConnectAccountDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

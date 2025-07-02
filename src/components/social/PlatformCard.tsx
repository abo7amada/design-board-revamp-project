import { Card, CardContent } from "@/components/ui/card";
import { Check, ExternalLink } from "lucide-react";
import { PlatformIcon } from "./PlatformIcon";

interface Account {
  connected: boolean;
  name: string;
  url: string;
}

interface PlatformCardProps {
  platform: string;
  account: Account;
  platformName: string;
}

export const PlatformCard = ({ platform, account, platformName }: PlatformCardProps) => {
  return (
    <Card 
      className={`border ${account.connected ? "border-green-200" : "border-gray-200"}`}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <PlatformIcon platform={platform} />
            <span className="font-medium">{platformName}</span>
          </div>
          {account.connected ? (
            <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 flex items-center gap-1">
              <Check className="h-3 w-3" />
              متصل
            </span>
          ) : (
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
              غير متصل
            </span>
          )}
        </div>
        
        {account.connected && (
          <div className="mt-2 text-sm text-gray-600 flex justify-between items-center">
            <a
              href={account.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline flex items-center gap-1"
            >
              <ExternalLink className="h-3 w-3" />
              فتح
            </a>
            <span dir="ltr">{account.name}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
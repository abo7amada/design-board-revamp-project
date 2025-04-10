
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle, Hash, Lock, MessageSquare, Users, Bell, BellOff } from "lucide-react";
import { toast } from "sonner";

interface Channel {
  id: string;
  name: string;
  type: "public" | "private";
  unread: number;
  members: number;
  isActive: boolean;
  muted: boolean;
}

const initialChannels: Channel[] = [
  { id: "general", name: "عام", type: "public", unread: 0, members: 32, isActive: true, muted: false },
  { id: "announcements", name: "الإعلانات", type: "public", unread: 3, members: 30, isActive: false, muted: false },
  { id: "design-team", name: "فريق التصميم", type: "private", unread: 12, members: 8, isActive: false, muted: false },
  { id: "marketing", name: "التسويق", type: "public", unread: 0, members: 15, isActive: false, muted: true },
  { id: "client-feedback", name: "ملاحظات العملاء", type: "private", unread: 5, members: 10, isActive: false, muted: false },
];

export const ChatChannels = () => {
  const [channels, setChannels] = useState<Channel[]>(initialChannels);
  const [searchTerm, setSearchTerm] = useState("");
  const [newChannelName, setNewChannelName] = useState("");
  const [newChannelType, setNewChannelType] = useState<"public" | "private">("public");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredChannels = channels.filter(channel => 
    channel.name.includes(searchTerm)
  );

  const handleChannelClick = (channelId: string) => {
    setChannels(channels.map(channel => ({
      ...channel,
      isActive: channel.id === channelId,
      unread: channel.id === channelId ? 0 : channel.unread
    })));
  };

  const handleCreateChannel = () => {
    if (!newChannelName.trim()) {
      toast.error("الرجاء إدخال اسم القناة");
      return;
    }
    
    const newChannel: Channel = {
      id: `channel-${Date.now()}`,
      name: newChannelName.trim(),
      type: newChannelType,
      unread: 0,
      members: 1,
      isActive: false,
      muted: false
    };
    
    setChannels([...channels, newChannel]);
    setNewChannelName("");
    setNewChannelType("public");
    setIsDialogOpen(false);
    toast.success(`تم إنشاء قناة ${newChannelName} بنجاح`);
  };

  const toggleMuteChannel = (channelId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setChannels(channels.map(channel => 
      channel.id === channelId 
        ? { ...channel, muted: !channel.muted } 
        : channel
    ));
    
    const channel = channels.find(c => c.id === channelId);
    if (channel) {
      toast.success(`تم ${channel.muted ? 'تفعيل' : 'كتم'} الإشعارات لقناة ${channel.name}`);
    }
  };

  return (
    <div className="w-full h-full flex flex-col border-l">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg">القنوات</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <PlusCircle className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>إنشاء قناة جديدة</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="channelName" className="text-sm font-medium">
                    اسم القناة
                  </label>
                  <Input
                    id="channelName"
                    placeholder="أدخل اسم القناة"
                    value={newChannelName}
                    onChange={(e) => setNewChannelName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">نوع القناة</label>
                  <div className="flex space-x-4 space-x-reverse">
                    <Button
                      type="button"
                      variant={newChannelType === "public" ? "default" : "outline"}
                      onClick={() => setNewChannelType("public")}
                      className="flex items-center gap-2 flex-1"
                    >
                      <Hash className="h-4 w-4" />
                      <span>عامة</span>
                    </Button>
                    <Button
                      type="button"
                      variant={newChannelType === "private" ? "default" : "outline"}
                      onClick={() => setNewChannelType("private")}
                      className="flex items-center gap-2 flex-1"
                    >
                      <Lock className="h-4 w-4" />
                      <span>خاصة</span>
                    </Button>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  إلغاء
                </Button>
                <Button type="button" onClick={handleCreateChannel}>
                  إنشاء
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="relative">
          <Input
            placeholder="بحث في القنوات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-8"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 absolute top-3 right-2.5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      
      <Separator />
      
      <div className="flex-1 overflow-y-auto py-2">
        <div className="px-2">
          <div className="text-xs font-medium text-gray-500 px-3 py-2">القنوات العامة</div>
          {filteredChannels
            .filter(channel => channel.type === "public")
            .map(channel => (
              <button
                key={channel.id}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm ${
                  channel.isActive
                    ? "bg-green-50 text-green-700 font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
                onClick={() => handleChannelClick(channel.id)}
              >
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 shrink-0" />
                  <span className="truncate">{channel.name}</span>
                  {channel.unread > 0 && (
                    <span className="mr-auto bg-green-600 text-white text-xs font-medium rounded-full px-2 py-0.5">
                      {channel.unread}
                    </span>
                  )}
                </div>
                <div className="flex items-center text-gray-400">
                  <button
                    onClick={(e) => toggleMuteChannel(channel.id, e)}
                    className="p-1 hover:bg-gray-200 rounded-full"
                  >
                    {channel.muted ? (
                      <BellOff className="h-3.5 w-3.5" />
                    ) : (
                      <Bell className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </button>
            ))}
        </div>
        
        <div className="px-2 mt-4">
          <div className="text-xs font-medium text-gray-500 px-3 py-2">القنوات الخاصة</div>
          {filteredChannels
            .filter(channel => channel.type === "private")
            .map(channel => (
              <button
                key={channel.id}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm ${
                  channel.isActive
                    ? "bg-green-50 text-green-700 font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
                onClick={() => handleChannelClick(channel.id)}
              >
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 shrink-0" />
                  <span className="truncate">{channel.name}</span>
                  {channel.unread > 0 && (
                    <span className="mr-auto bg-green-600 text-white text-xs font-medium rounded-full px-2 py-0.5">
                      {channel.unread}
                    </span>
                  )}
                </div>
                <div className="flex items-center text-gray-400">
                  <button
                    onClick={(e) => toggleMuteChannel(channel.id, e)}
                    className="p-1 hover:bg-gray-200 rounded-full"
                  >
                    {channel.muted ? (
                      <BellOff className="h-3.5 w-3.5" />
                    ) : (
                      <Bell className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </button>
            ))}
        </div>
      </div>
      
      <Separator />
      
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">الرسائل المباشرة</span>
          </div>
          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">الأعضاء النشطون</span>
            <span className="bg-green-100 text-green-800 text-xs rounded-full px-2">12</span>
          </div>
          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

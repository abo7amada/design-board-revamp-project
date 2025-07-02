import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle, Hash, Lock, MessageSquare, Users, Bell, BellOff } from "lucide-react";
import { toast } from "sonner";
import { useChat } from "@/hooks/useChat";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

export const ChatChannels = () => {
  const { user } = useAuth();
  const { chatRooms, loading, fetchChatRooms, joinChatRoom, setActiveChat, activeChatRoom } = useChat();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [newChannelName, setNewChannelName] = useState("");
  const [newChannelType, setNewChannelType] = useState<"channel" | "direct">("channel");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Load chat rooms on component mount
  useEffect(() => {
    if (user) {
      fetchChatRooms();
    }
  }, [user, fetchChatRooms]);

  const filteredChannels = chatRooms.filter(room => 
    room.name.includes(searchTerm)
  );

  const handleChannelClick = (channelId: string) => {
    setActiveChat(channelId);
    joinChatRoom(channelId);
  };

  const handleCreateChannel = async () => {
    if (!newChannelName.trim()) {
      toast.error("الرجاء إدخال اسم القناة");
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('chat_rooms')
        .insert([
          {
            name: newChannelName.trim(),
            type: newChannelType,
            created_by: user?.id,
            description: `قناة ${newChannelName}`
          }
        ])
        .select()
        .single();

      if (error) throw error;

      // Join the new room
      await joinChatRoom(data.id);
      
      setNewChannelName("");
      setNewChannelType("channel");
      setIsDialogOpen(false);
      toast.success(`تم إنشاء قناة ${newChannelName} بنجاح`);
      
      // Refresh chat rooms
      fetchChatRooms();
    } catch (error) {
      console.error('Error creating channel:', error);
      toast.error('خطأ في إنشاء القناة');
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full flex flex-col border-l">
        <div className="p-4 text-center">
          <p className="text-gray-500">جاري تحميل القنوات...</p>
        </div>
      </div>
    );
  }

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
                      variant={newChannelType === "channel" ? "default" : "outline"}
                      onClick={() => setNewChannelType("channel")}
                      className="flex items-center gap-2 flex-1"
                    >
                      <Hash className="h-4 w-4" />
                      <span>عامة</span>
                    </Button>
                    <Button
                      type="button"
                      variant={newChannelType === "direct" ? "default" : "outline"}
                      onClick={() => setNewChannelType("direct")}
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
          <div className="text-xs font-medium text-gray-500 px-3 py-2">القنوات المتاحة</div>
          {filteredChannels.length > 0 ? (
            filteredChannels.map(channel => (
              <button
                key={channel.id}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm ${
                  activeChatRoom === channel.id
                    ? "bg-green-50 text-green-700 font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
                onClick={() => handleChannelClick(channel.id)}
              >
                <div className="flex items-center gap-2">
                  {channel.type === 'direct' ? (
                    <Lock className="h-4 w-4 shrink-0" />
                  ) : (
                    <Hash className="h-4 w-4 shrink-0" />
                  )}
                  <span className="truncate">{channel.name}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <span className="text-xs">{channel.type === 'direct' ? 'خاصة' : 'عامة'}</span>
                </div>
              </button>
            ))
          ) : (
            <div className="px-3 py-4 text-center text-gray-500 text-sm">
              لا توجد قنوات متاحة
            </div>
          )}
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
            <span className="bg-green-100 text-green-800 text-xs rounded-full px-2">
              {filteredChannels.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
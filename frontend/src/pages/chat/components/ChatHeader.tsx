import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChatStore } from "@/stores/useChatStore";
import { MessageSquare } from 'lucide-react';

const ChatHeader = () => {
  const { selectedUser, onlineUsers } = useChatStore();

  if (!selectedUser) return null;

  const isOnline = onlineUsers.has(selectedUser.clerkId);

  return (
    <div className='p-4 border-b border-zinc-800/50 bg-gradient-to-b from-zinc-800/50 to-transparent backdrop-blur-sm'>
      <div className='flex items-center gap-4'>
        <div className="relative">
          <Avatar className="size-10 ring-2 ring-zinc-700/50 ring-offset-2 ring-offset-zinc-900 transition-shadow duration-300 hover:ring-zinc-600">
            <AvatarImage src={selectedUser.imageUrl} />
            <AvatarFallback className="bg-zinc-700 text-zinc-100">
              {selectedUser.fullName[0]}
            </AvatarFallback>
          </Avatar>
          <div className={`
            absolute bottom-0 right-0
            size-2 rounded-full
            ring-2 ring-zinc-900
            transition-all duration-500 ease-in-out
            ${isOnline
              ? 'bg-green-500 animate-pulse'
              : 'bg-zinc-500'
            }
          `} />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className='font-semibold text-lg tracking-tight text-zinc-100'>
              {selectedUser.fullName}
            </h2>
            <MessageSquare className="size-4 text-zinc-400" />
          </div>
          <div className="flex items-center gap-2">
            <div className={`
              size-1.5 rounded-full
              transition-all duration-300
              ${isOnline ? 'bg-green-500' : 'bg-zinc-500'}
            `} />
            <p className='text-sm text-zinc-400 font-medium'>
              {isOnline ? "Active now" : "Offline"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;

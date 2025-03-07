import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { HeadphonesIcon, Music, Users, Search, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FriendsActivity = () => {
  const { users, fetchUsers, onlineUsers, userActivities } = useChatStore();
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOnline, setFilterOnline] = useState(false);

  useEffect(() => {
    if (user) fetchUsers();
  }, [fetchUsers, user]);

  // Filter users based on search term and online filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesOnlineFilter = filterOnline ? onlineUsers.has(user.clerkId) : true
    return matchesSearch && matchesOnlineFilter
  })

  return (
    <div className="h-full bg-[#0F0F13] border-l border-white/5 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/5 flex items-center justify-between">
  <Link
    to="/friends"
    className={cn(
      buttonVariants({
        variant: "ghost",
        className: "w-full justify-start text-white hover:bg-white/[0.05] transition-all duration-300 rounded-xl",
      }),
    )}
  >
    <div className="mr-2 size-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
      <Users className="size-4 text-white" />
    </div>
    <span className="font-medium md:inline">Friend Activity</span>
  </Link>
  <Link
    to="/chat"
    className={cn(
      buttonVariants({
        variant: "ghost",
        className: "p-1 rounded-xl hover:bg-white/[0.05] text-zinc-400 hover:text-white transition-all duration-300",
      }),
    )}
  >
    <div className="size-8 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
      <MessageCircle className="size-4 text-white" />
    </div>
  </Link>
</div>

      {!user ? (
        <LoginPrompt />
      ) : (
        <>
          {/* Search friends */}
          <div className="p-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search friends"
                className="w-full bg-white/5 border border-transparent focus:border-white/20 rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder:text-zinc-500 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Online filter */}
          <div className="px-3 py-2 flex gap-2">
            <div
              className={`px-3 py-1 ${filterOnline ? 'bg-white/10' : 'bg-white/5'} hover:bg-white/10 rounded-full text-sm text-white whitespace-nowrap cursor-pointer flex items-center gap-1.5`}
              onClick={() => setFilterOnline(true)}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Online
            </div>
            <div
              className={`px-3 py-1 ${!filterOnline ? 'bg-white/10' : 'bg-white/5'} hover:bg-white/10 rounded-full text-sm text-white whitespace-nowrap cursor-pointer`}
              onClick={() => setFilterOnline(false)}
            >
              All Friends
            </div>
          </div>

          {/* Friends list */}
          <ScrollArea className="flex-1">
            <div className="p-3 space-y-2">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => {
                  const activity = userActivities.get(user.clerkId)
                  const isPlaying = activity && activity !== "Idle"
                  const isOnline = onlineUsers.has(user.clerkId)

                  return (
                    <Link
                      key={user._id}
                      to={`/chat/${user.clerkId}`}
                      className="flex items-start gap-3 p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer block"
                    >
                      <div className="relative">
                        <Avatar className="size-10 border border-white/10">
                          <AvatarImage src={user.imageUrl} alt={user.fullName} />
                          <AvatarFallback className="bg-white/5 text-white">{user.fullName[0]}</AvatarFallback>
                        </Avatar>
                        {isOnline && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0F0F13]"></div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm text-white">{user.fullName}</span>
                          {isPlaying && (
                            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full uppercase font-medium tracking-wide">
                              Live
                            </span>
                          )}
                        </div>

                        {isPlaying ? (
                          <div className="mt-0.5">
                            <div className="flex items-center gap-1.5">
                              <Music className="size-3 text-emerald-400 shrink-0" />
                              <div className="text-xs text-white font-medium truncate">
                                {activity.replace("Playing ", "").split(" by ")[0]}
                              </div>
                            </div>
                            <div className="text-xs text-zinc-400 truncate pl-4.5">{activity.split(" by ")[1]}</div>
                          </div>
                        ) : (
                          <div className="mt-1 text-xs text-zinc-400">{isOnline ? 'Online' : 'Offline'}</div>
                        )}
                      </div>
                    </Link>
                  )
                })
              ) : (
                <div className="text-center py-4 text-zinc-400">No friends found</div>
              )}
            </div>
          </ScrollArea>
        </>
      )}
    </div>
  );
};

export default FriendsActivity;

const LoginPrompt = () => (
  <div className="h-full flex flex-col items-center justify-center p-6 text-center">
    <div className="bg-white/5 rounded-full p-4 mb-4">
      <HeadphonesIcon className="size-8 text-white" />
    </div>

    <div className="space-y-2 max-w-[220px]">
      <h3 className="text-lg font-semibold text-white">Connect With Friends</h3>
      <p className="text-sm text-zinc-400">See what your friends are listening to and share your favorite tracks</p>
      <button className="mt-4 w-full py-2 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-colors">
        Sign In
      </button>
    </div>
  </div>
);

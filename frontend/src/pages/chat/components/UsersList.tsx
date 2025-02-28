import UsersListSkeleton from "@/components/skeletons/UsersListSkeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useChatStore } from "@/stores/useChatStore"

const UsersList = () => {
  const { users, selectedUser, isLoading, setSelectedUser, onlineUsers } = useChatStore()

  return (
    <div className="border-r border-zinc-800/50 bg-gradient-to-r from-zinc-900 to-zinc-800/50">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-zinc-800/50">
          <h2 className="text-zinc-100 font-semibold px-2">Messages</h2>
        </div>

        <ScrollArea className="h-[calc(100vh-280px)]">
          <div className="space-y-1 p-2">
            {isLoading ? (
              <UsersListSkeleton />
            ) : (
              users.map((user) => {
                const isSelected = selectedUser?.clerkId === user.clerkId
                const isOnline = onlineUsers.has(user.clerkId)

                return (
                  <div
                    key={user._id}
                    onClick={() => setSelectedUser(user)}
                    className={`
                      relative group
                      flex items-center justify-center lg:justify-start gap-4
                      p-3 mx-1 rounded-xl cursor-pointer
                      transition-all duration-300 ease-in-out
                      ${isSelected ? "bg-zinc-800/90 shadow-lg" : "hover:bg-zinc-800/50 hover:shadow-md"}
                    `}
                  >
                    <div className="relative">
                      <Avatar
                        className={`
                        size-10 md:size-12
                        transition-all duration-300
                        ${isSelected
                            ? "ring-2 ring-green-500/50 ring-offset-2 ring-offset-zinc-900"
                            : "group-hover:ring-2 group-hover:ring-zinc-600/50 group-hover:ring-offset-2 group-hover:ring-offset-zinc-900"
                          }
                      `}
                      >
                        <AvatarImage src={user.imageUrl} />
                        <AvatarFallback className="bg-zinc-700 text-zinc-100">{user.fullName[0]}</AvatarFallback>
                      </Avatar>

                      <div
                        className={`
                        absolute bottom-0 right-0
                        size-3.5 rounded-full
                        transition-all duration-500
                        ring-2 ring-zinc-900
                        ${isOnline ? "bg-green-500 animate-pulse" : "bg-zinc-500"}
                      `}
                      />
                    </div>

                    <div className="flex-1 min-w-0 lg:block hidden">
                      <div className="flex flex-col">
                        <span className="font-medium text-zinc-100 truncate">{user.fullName}</span>
                        <span
                          className={`
                          text-xs font-medium truncate
                          ${isOnline ? "text-green-500" : "text-zinc-500"}
                        `}
                        >
                          {isOnline ? "Active now" : "Offline"}
                        </span>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-green-500 rounded-full" />
                    )}
                  </div>
                )
              })
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default UsersList

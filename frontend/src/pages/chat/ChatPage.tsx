import Topbar from "@/components/TopBar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ChatHeader from "./components/ChatHeader";
import MessageInput from "./components/MessageInput";
import UsersList from "./components/UsersList";

const formatTime = (date: string) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const ChatPage = () => {
  const { user } = useUser();
  const { userId } = useParams();
  const { messages, selectedUser, fetchUsers, fetchMessages, users, setSelectedUser } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) fetchUsers();
  }, [fetchUsers, user]);

  // Handle URL param user ID
  useEffect(() => {
    if (userId && users.length > 0) {
      const userFromParam = users.find(user => user.clerkId === userId);
      if (userFromParam) {
        setSelectedUser(userFromParam);
      }
    }
  }, [userId, users, setSelectedUser]);

  useEffect(() => {
    if (selectedUser) fetchMessages(selectedUser.clerkId);
  }, [selectedUser, fetchMessages]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden">
      <Topbar />

      <div className="grid lg:grid-cols-[300px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]">
        <UsersList />

        {/* chat message */}
        <div className="flex flex-col h-full">
          {selectedUser ? (
            <>
              <ChatHeader />

              {/* Messages */}
              <ScrollArea className="h-[calc(100vh-340px)]">
                <div className="p-4 space-y-6">
                  {messages.map((message, index) => {
                    const isUser = message.senderId === user?.id
                    const showAvatar = index === 0 || messages[index - 1]?.senderId !== message.senderId

                    return (
                      <div key={message._id} className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : ""}`}>
                        <div className={`${showAvatar ? "opacity-100" : "opacity-0"} transition-opacity w-8`}>
                          {showAvatar && (
                            <Avatar className="size-8 ring-2 ring-zinc-700 ring-offset-1 ring-offset-zinc-900">
                              <AvatarImage src={isUser ? user.imageUrl : selectedUser.imageUrl} />
                            </Avatar>
                          )}
                        </div>

                        <div className="max-w-[75%] group">
                          <div
                            className={`
                              relative rounded-2xl py-2.5 px-3.5
                              ${isUser
                                ? "bg-gradient-to-br from-green-400 to-green-700 text-white"
                                : "bg-gradient-to-br from-zinc-700 to-zinc-800 text-zinc-100"
                              }
                              shadow-sm transition-all duration-200 ease-in-out
                              hover:shadow-md
                              ${isUser ? "rounded-br-sm" : "rounded-bl-sm"}
                            `}
                          >
                            <p className="text-sm leading-relaxed">{message.content}</p>

                            <span
                              className={`
                              text-[10px] font-medium mt-1 block opacity-70
                              ${isUser ? "text-right mr-0.5" : "ml-0.5"}
                            `}
                            >
                              {formatTime(message.createdAt)}
                            </span>

                            <div
                              className={`
                                absolute bottom-0 w-3 h-3 overflow-hidden
                                ${isUser ? "right-0 -mr-1.5" : "left-0 -ml-1.5"}
                              `}
                            >
                              <div
                                className={`
                                  w-4 h-4 transform rotate-45 origin-bottom-left
                                  ${isUser ? "bg-green-600 translate-x-1/2" : "bg-zinc-800 -translate-x-1/2"}
                                `}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  {/* This is the div that we'll scroll to */}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              <MessageInput />
            </>
          ) : (
            <NoConversationPlaceholder />
          )}
        </div>
      </div>
    </main>
  )
}
export default ChatPage

const NoConversationPlaceholder = () => (
  <div className="flex flex-col items-center justify-center h-full space-y-6">
    <img src="/spotify.png" alt="Spotify" className="size-16 animate-bounce" />
    <div className="text-center">
      <h3 className="text-zinc-300 text-lg font-medium mb-1">No conversation selected</h3>
      <p className="text-zinc-500 text-sm">Choose a friend to start chatting</p>
    </div>
  </div>
)

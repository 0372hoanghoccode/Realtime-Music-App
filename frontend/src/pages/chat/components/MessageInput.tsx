import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useChatStore } from "@/stores/useChatStore"
import { useUser } from "@clerk/clerk-react"
import { Send } from "lucide-react"
import { useState } from "react"

const MessageInput = () => {
  const [newMessage, setNewMessage] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const { user } = useUser()
  const { selectedUser, sendMessage } = useChatStore()

  const handleSend = () => {
    if (!selectedUser || !user || !newMessage) return
    sendMessage(selectedUser.clerkId, user.id, newMessage.trim())
    setNewMessage("")
  }

  return (
    <div className="p-4 mt-auto border-t border-zinc-800/50 bg-gradient-to-b from-transparent to-zinc-900/50">
      <div
        className={`
        flex gap-2 items-center
        p-1 rounded-full
        transition-all duration-300 ease-in-out
        ${isFocused ? "bg-zinc-800/80 shadow-lg" : "bg-zinc-800/50"}
      `}
      >
        <Input
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className={`
            bg-transparent border-none text-zinc-100
            placeholder:text-zinc-400
            focus-visible:ring-0 focus-visible:ring-offset-0
            transition-all duration-300
            rounded-full px-4
          `}
        />

        <Button
          size={"icon"}
          onClick={handleSend}
          disabled={!newMessage.trim()}
          className={`
            rounded-full size-10
            transition-all duration-300 ease-out
            ${newMessage.trim()
              ? "bg-green-500 hover:bg-green-600 hover:shadow-md hover:shadow-green-500/20 hover:-translate-y-0.5"
              : "bg-zinc-700 hover:bg-zinc-600"
            }
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          <Send
            className={`
            size-4
            transition-transform duration-300
            ${newMessage.trim() ? "translate-x-0.5 -translate-y-0.5" : ""}
          `}
          />
        </Button>
      </div>
    </div>
  )
}

export default MessageInput


import { Music2 } from "lucide-react"

interface EmptyStateProps {
  canEdit?: boolean
}

export function EmptyState({ canEdit }: EmptyStateProps) {
  return (
    <div className="py-16 text-center text-zinc-500">
      <Music2 className="h-12 w-12 mx-auto mb-3 opacity-50" />
      <p className="text-lg">This playlist is empty</p>
      {canEdit && <p className="text-sm mt-2">Click "Add Songs" to start building your playlist</p>}
    </div>
  )
}


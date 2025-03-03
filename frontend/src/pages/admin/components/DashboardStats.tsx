import { useMusicStore } from "@/stores/useMusicStore"
import { Library, ListMusic, Users2, Heart, List, TrendingUp, Play, Music2 } from "lucide-react"
import { Card } from "@/components/ui/card"

const DashboardStats = () => {
  const { stats } = useMusicStore()

  // Ensure stats always has default values to avoid undefined errors
  const safeStats = {
    totalSongs: stats?.totalSongs ?? 0,
    totalAlbums: stats?.totalAlbums ?? 0,
    totalUsers: stats?.totalUsers ?? 0,
    totalPlaylists: stats?.totalPlaylists ?? 0,
    totalLikes: stats?.totalLikes ?? 0,
    totalArtists: stats?.totalArtists ?? 0,
    mostPlayedSongs: stats?.mostPlayedSongs ?? [],
  }

  const statsData = [
    {
      icon: ListMusic,
      label: "Total Songs",
      value: safeStats.totalSongs.toString(),
      bgColor: "bg-emerald-500",
      textColor: "text-emerald-50",
    },
    {
      icon: Library,
      label: "Total Albums",
      value: safeStats.totalAlbums.toString(),
      bgColor: "bg-violet-500",
      textColor: "text-violet-50",
    },
    {
      icon: Users2,
      label: "Total Users",
      value: safeStats.totalUsers.toLocaleString(),
      bgColor: "bg-sky-500",
      textColor: "text-sky-50",
    },
    {
      icon: List,
      label: "Total Playlists",
      value: safeStats.totalPlaylists.toString(),
      bgColor: "bg-indigo-500",
      textColor: "text-indigo-50",
    },
    {
      icon: Heart,
      label: "Total Likes",
      value: safeStats.totalLikes.toString(),
      bgColor: "bg-rose-500",
      textColor: "text-rose-50",
    },
    {
      icon: TrendingUp,
      label: "Total Artists",
      value: safeStats.totalArtists.toString(),
      bgColor: "bg-orange-500",
      textColor: "text-orange-50",
    },
  ]

  return (
    <div className="mb-8 space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statsData.map((stat) => (
          <StatCard
            key={stat.label}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            bgColor={stat.bgColor}
            textColor={stat.textColor}
          />
        ))}
      </div>

      {safeStats.mostPlayedSongs.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
            <Play className="size-5 text-primary" />
            Most Played Songs
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
            {safeStats.mostPlayedSongs.map((song, index) => (
              <div
                key={song.songId}
                className="flex items-center p-2 rounded-md border bg-card hover:bg-muted/30 transition-colors"
              >
                <div className="flex justify-center items-center size-7 rounded-full bg-primary/10 text-primary font-medium text-sm mr-2">
                  {index + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm truncate">{song.title || "Unknown Title"}</p>
                  <p className="text-xs text-muted-foreground truncate">{song.artist || "Unknown Artist"}</p>
                </div>
                <div className="text-xs font-medium text-primary/80 whitespace-nowrap">
                  <Music2 className="size-4 inline mr-1" />
                  {(song.totalPlays ?? 0).toLocaleString()} plays
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Separate StatCard component for better organization
interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  bgColor: string;
  textColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, bgColor, textColor }) => {
  return (
    <Card className="overflow-hidden">
      <div className={`${bgColor} ${textColor} p-4`}>
        <Icon className="size-6 mb-2" />
        <p className="text-sm font-medium opacity-90">{label}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
    </Card>
  )
}

export default DashboardStats


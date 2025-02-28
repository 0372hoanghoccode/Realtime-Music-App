import { useMusicStore } from "@/stores/useMusicStore";
import { Library, ListMusic, Users2, Heart, List, TrendingUp } from "lucide-react";
import StatsCard from "./StatsCard";

const DashboardStats = () => {
  const { stats } = useMusicStore();

  // Đảm bảo stats luôn có giá trị mặc định để tránh lỗi undefined
  const safeStats = {
    totalSongs: stats?.totalSongs ?? 0,
    totalAlbums: stats?.totalAlbums ?? 0,
    totalUsers: stats?.totalUsers ?? 0,
    totalPlaylists: stats?.totalPlaylists ?? 0,
    totalLikes: stats?.totalLikes ?? 0,
    totalArtists: stats?.totalArtists ?? 0,
    mostPlayedSongs: stats?.mostPlayedSongs ?? [],
  };

  const statsData = [
    {
      icon: ListMusic,
      label: "Total Songs",
      value: safeStats.totalSongs.toString(),
      bgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-500",
    },
    {
      icon: Library,
      label: "Total Albums",
      value: safeStats.totalAlbums.toString(),
      bgColor: "bg-violet-500/10",
      iconColor: "text-violet-500",
    },
    {
      icon: Users2,
      label: "Total Users",
      value: safeStats.totalUsers.toLocaleString(),
      bgColor: "bg-sky-500/10",
      iconColor: "text-sky-500",
    },
    {
      icon: List,
      label: "Total Playlists",
      value: safeStats.totalPlaylists.toString(),
      bgColor: "bg-indigo-500/10",
      iconColor: "text-indigo-500",
    },
    {
      icon: Heart,
      label: "Total Likes",
      value: safeStats.totalLikes.toString(),
      bgColor: "bg-rose-500/10",
      iconColor: "text-rose-500",
    },
    {
      icon: TrendingUp,
      label: "Total Artists",
      value: safeStats.totalArtists.toString(),
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-500",
    },
  ];

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {statsData.map((stat) => (
          <StatsCard
            key={stat.label}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            bgColor={stat.bgColor}
            iconColor={stat.iconColor}
          />
        ))}
      </div>

      {safeStats.mostPlayedSongs.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Most Played Songs</h3>
          <div className="grid gap-4">
            {safeStats.mostPlayedSongs.map((song, index) => (
              <div
                key={song.songId}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 font-medium">#{index + 1}</span>
                  <div>
                    <p className="font-medium">{song.title || "Unknown Title"}</p>
                    <p className="text-sm text-gray-600">{song.artist || "Unknown Artist"}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-600">
                  {(song.totalPlays ?? 0).toLocaleString()} plays
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardStats;

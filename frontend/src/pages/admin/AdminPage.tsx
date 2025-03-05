import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import { Album, Music, Home } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import SongsTabContent from "./components/SongsTabContent";
import AlbumsTabContent from "./components/AlbumsTabContent";
import { useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore";

const AdminPage = () => {
  const navigate = useNavigate();
  const { isAdmin, isLoading } = useAuthStore();
  const { fetchAlbums, fetchSongs, fetchStats } = useMusicStore();

  useEffect(() => {
    fetchAlbums();
    fetchSongs();
    fetchStats();
  }, [fetchAlbums, fetchSongs, fetchStats]);

  if (!isAdmin && !isLoading) return (
    <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center text-white">
      <p className="mb-4">you are not authorized to view this page</p>
      <Button onClick={() => navigate('/')}>
        <Home className="mr-2 size-4" />
        back to home
      </Button>
    </div>
  );

  return (
    <div className='min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-100 p-8'>
      <div className="flex justify-between items-center mb-8 cusor-pointer">
        <Header />
        <Button
          onClick={() => navigate('/')}
          variant="outline"
          className="bg-zinc-800 hover:bg-zinc-700 text-white cusor-pointer"
        >
          <Home className='mr-2 size-4' />
          Back to Home
        </Button>
      </div>

      <DashboardStats />

      <Tabs defaultValue='songs' className='space-y-6'>
        <TabsList className='p-1 bg-zinc-800/50'>
          <TabsTrigger value='songs' className='data-[state=active]:bg-zinc-700'>
            <Music className='mr-2 size-4' />
            Songs
          </TabsTrigger>
          <TabsTrigger value='albums' className='data-[state=active]:bg-zinc-700'>
            <Album className='mr-2 size-4' />
            Albums
          </TabsTrigger>
        </TabsList>

        <TabsContent value='songs'>
          <SongsTabContent />
        </TabsContent>
        <TabsContent value='albums'>
          <AlbumsTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;

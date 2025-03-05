import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import AuthCallbackPage from "./pages/auth/AuthCallbackPage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout";
import AlbumPage from "./pages/album/AlbumPage";
import PlaylistPage from "./pages/playlist/PlaylistPage";
import AdminPage from "./pages/admin/AdminPage";
import ChatPage from "./pages/chat/ChatPage";
import LikePage from "./pages/like/LikedSongsPage";
import HistoryPage from "./pages/history/HistoryPage";
import NotFoundPage from "./pages/notfound/NotFoundPage";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route
          path="/sso-callback"
          element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />}
        />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        <Route path="/admin" element={<AdminPage />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/albums/:albumId" element={<AlbumPage />} />
          <Route path="/playlists/:playlistId" element={<PlaylistPage />} />
          <Route path="/likes" element={<LikePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

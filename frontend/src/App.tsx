import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import MainLayout from "./layout/MainLayout";
import AdminPage from "./pages/admin/AdminPage";
import AlbumPage from "./pages/album/AlbumPage";
import AuthCallbackPage from "./pages/auth/AuthCallbackPage";
import ChatPage from "./pages/chat/ChatPage";
import HistoryPage from "./pages/history/HistoryPage";
import HomePage from "./pages/home/HomePage";
import LikePage from "./pages/like/LikedSongsPage";
import NotFoundPage from "./pages/notfound/NotFoundPage";
import PlaylistPage from "./pages/playlist/PlaylistPage";

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
        <Route path="/admin" element={<AdminPage />} />        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/chat/:userId" element={<ChatPage />} />
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

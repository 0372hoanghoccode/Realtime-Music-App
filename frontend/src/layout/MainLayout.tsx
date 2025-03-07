import { Outlet } from "react-router-dom";
import LeftSidebar from "./components/LeftSidebar";
import FriendsActivity from "./components/FriendsActivity";
import AudioPlayer from "./components/AudioPlayer";
import { PlaybackControls } from "./components/PlaybackControls";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile)
      if (mobile) {
        setLeftCollapsed(true)
        setRightCollapsed(true)
      }
    }

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [])

  const toggleLeftSidebar = () => setLeftCollapsed((prev) => !prev)
  const toggleRightSidebar = () => setRightCollapsed((prev) => !prev)

  return (

    <div className="h-screen bg-[#0A0A0C] text-white flex flex-col overflow-hidden">
      <AudioPlayer />

      {/* Đảm bảo rằng phần nội dung chính có chiều cao cố định và có thể cuộn được */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Main content area - thêm overflow-auto ở đây */}
        <div className="flex-1 flex relative overflow-hidden">
          {/* Left sidebar with toggle */}
          <div
            className={`absolute md:relative h-full z-30 transition-all duration-300 ease-in-out ${leftCollapsed ? "w-0 -translate-x-full md:w-[60px] md:translate-x-0" : "w-[280px]"
              }`}
          >
            {!leftCollapsed && (
              <div className="h-full w-full overflow-hidden">
                <LeftSidebar />
              </div>
            )}

            {/* Collapsed mini sidebar */}
            {leftCollapsed && !isMobile && (
              <div className="h-full w-[60px] bg-[#0F0F13] border-r border-white/5 py-4 flex flex-col items-center gap-6">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-white/5 hover:bg-white/10 text-white"
                  onClick={() => setLeftCollapsed(false)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>

                <div className="flex flex-col items-center gap-6 mt-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 text-white hover:opacity-90"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 22V12h6v10"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            )}

            {/* Mobile toggle */}
            {isMobile && leftCollapsed && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 left-4 z-50 rounded-full bg-white/10 backdrop-blur-md"
                onClick={toggleLeftSidebar}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Main content */}
          <div className="flex-1 overflow-hidden transition-all duration-300 ease-in-out">
            {!leftCollapsed && !isMobile && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 left-[280px] z-50 rounded-full bg-white/10 backdrop-blur-md"
                onClick={toggleLeftSidebar}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}

            <div className="h-full p-4 overflow-auto">
              <div className="h-full rounded-xl overflow-hidden bg-[#0F0F13] border border-white/5">
                <Outlet />
              </div>
            </div>
          </div>

          {/* Right sidebar with toggle */}
          <div
            className={`absolute right-0 md:relative h-full z-30 transition-all duration-300 ease-in-out ${rightCollapsed ? "w-0 translate-x-full md:w-[60px] md:translate-x-0" : "w-[280px]"
              }`}
          >
            {!rightCollapsed && (
              <div className="h-full w-full overflow-hidden">
                <FriendsActivity />
              </div>
            )}

            {/* Collapsed mini sidebar */}
            {rightCollapsed && !isMobile && (
              <div className="h-full w-[60px] bg-[#0F0F13] border-l border-white/5 py-4 flex flex-col items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-white/5 hover:bg-white/10 text-white"
                  onClick={() => setRightCollapsed(false)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex flex-col items-center gap-4 mt-6">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white hover:opacity-90"
                  >
                    <Users className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Mobile toggle */}
            {isMobile && rightCollapsed && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-50 rounded-full bg-white/10 backdrop-blur-md"
                onClick={toggleRightSidebar}
              >
                <Users className="h-4 w-4" />
              </Button>
            )}
          </div>

          {!rightCollapsed && !isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-[280px] z-50 rounded-full bg-white/10 backdrop-blur-md"
              onClick={toggleRightSidebar}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Đảm bảo PlaybackControls luôn ở dưới cùng */}
        <div className="sticky bottom-0 z-30 w-full">
          <PlaybackControls />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

import { SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

const Topbar = () => {
  const { isAdmin } = useAuthStore();

  return (
    <div
      className="flex items-center justify-between p-4 sticky top-0 bg-gradient-to-r from-zinc-900/90 to-zinc-800/90
      backdrop-blur-md z-10 border-b border-zinc-800 shadow-md"
    >
      <div className='flex items-center gap-4 mx-2'>
        {isAdmin && (
          <Link
            to="/admin"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "border-zinc-700 hover:bg-zinc-700 hover:text-green-300 transition-all"
            )}
          >
            <LayoutDashboardIcon className='size-4  mr-2' />
            Admin Dashboard
          </Link>
        )}

        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>

        <UserButton />
      </div>
    </div>
  );
};
export default Topbar;

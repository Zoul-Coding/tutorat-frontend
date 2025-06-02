import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import Login from "./login";

const AuthButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-6">
        <button
          onClick={() => setOpen(true)}
          className="border border-primary px-6 py-3 text-[14px] font-medium rounded hover:bg-gray-100"
        >
          Connexion
        </button>
        <Link
          to="/inscription"
          className="bg-primary px-6 py-3 text-white text-[14px] font-medium rounded hover:opacity-85"
        >
          Inscription
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage className="rounded-full" src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback className="rounded-full">CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white w-56 rounded-xl px-2 py-2" align="start">
            <DropdownMenuItem>
              <Link to="/parametres">
                Paramètres
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="bg-red-700 rounded text-white hover:bg-red-600">
              Déconnexion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Login open={open} setOpen={setOpen} />
    </>
  );
};

export default AuthButton;

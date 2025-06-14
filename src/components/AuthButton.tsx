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
import Login from "./Login";
import { getToken, deleteToken } from "@/lib/utils";
import { useSetAtom } from "jotai";
import { userAtom } from "@/atoms/userStore";
import { useNavigate } from "react-router-dom";
import useFetchInfoUser from "@/requests/useFetchUserInfos";

const AuthButton = () => {
  const token = getToken();
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();
  const { data: userInfos, isLoading: loading } = useFetchInfoUser();

    const getFirstLetter = (str: string | null): string =>
    str ? str.charAt(0).toUpperCase() : "";
  
   const handleLogout = () => {
    deleteToken();
    setUser(null);
   /*  window.location.reload(); */
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <div className="">
        {token ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage
                  className="rounded-full border border-gray-500"
                 src={userInfos?.photo}
                  alt="@"
                />
                <AvatarFallback className="rounded-full text-white bg-primary">
                    {getFirstLetter(userInfos?.prenom)}
                    {getFirstLetter(userInfos?.nom)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-white w-56 rounded-xl px-2 py-2"
              align="start"
            >
              <DropdownMenuItem>
                <Link to="/parametres">Paramètres</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="bg-red-700 rounded text-white hover:bg-red-600">
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-6">
            <Link
              to="/connexion"
              className="border border-primary px-6 py-3 text-[14px] font-medium rounded hover:bg-gray-100"
            >
              Connexion
            </Link>
            <Link
              to="/inscription"
              className="bg-primary px-6 py-3 text-white text-[14px] font-medium rounded hover:opacity-85"
            >
              Inscription
            </Link>
          </div>
        )}
      </div>

    </>
  );
};

export default AuthButton;

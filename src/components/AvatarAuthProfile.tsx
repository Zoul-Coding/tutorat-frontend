import { useAtom } from "jotai";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userAtom } from "@/atoms/users.atom";
import useFetchInfoUser from "@/requests/useFetchInfoUser";
import authService from "@/services/auth.service";
import Cookies from "js-cookie";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import {
  Calendar,
  ChevronDown,
  GraduationCap,
  LogOut,
  User,
  LayoutDashboard,
  Loader,
} from "lucide-react";
import { getToken, removeFromLocalStorage } from "@/lib/utils";

const AvatarAuthProfile = () => {
  const [user, setUser] = useAtom(userAtom);
  const token = getToken();
  const { data: infoUser, isLoading: loading } = useFetchInfoUser();

  const getFirstLetter = (str: string | null): string =>
    str ? str.charAt(0).toUpperCase() : "";

  async function logout() {
    try {
      await authService.logout();

      setUser(null);
      Cookies.remove(
        "access_token" , {
        domain: ".annuaireduroyaume.com",
        path: "/",
        secure: true,
        sameSite: "None",
      }
      );
      removeFromLocalStorage("user");
      toast.success("Vous avez été déconnecté avec succès!");
    } catch (err: any) {
      if (err === "Unauthorized") {
        setUser(null);
        Cookies.remove("access_token");
        removeFromLocalStorage("user");
        toast.success("Vous avez été déconnecté avec succès!");
      } else {
        toast.error(err);
      }
    }
  }

  return (
    <div>
      {token ? (
        loading ? (
          <Loader className="text-marronFonce h-6 w-6 animate-spin" />
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="flex items-center gap-1 w-full h-full">
                <div>
                  <AvatarImage
                    className="rounded-full md:w-14 md:h-10 w-10 h-10"
                    src={
                      infoUser?.media?.length! > 0
                        ? infoUser?.media[0]?.original_url
                        : null
                    }
                    alt="@"
                  />
                  <AvatarFallback className="bg-marronFonce text-white uppercase rounded-full md:w-10 md:h-10 w-10 h-10">
                    {getFirstLetter(infoUser?.first_name)}
                    {getFirstLetter(infoUser?.last_name)}
                  </AvatarFallback>
                </div>
                <ChevronDown className="text-gray-600 w-6 h-6" />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white max-w-md border-none mr-8 px-2 py-2">
              {infoUser?.is_professional === 1 && (
                <DropdownMenuItem className="hover:bg-gray-100 rounded px-3 py-3">
                  {/*  https://app.annuaireduroyaume.com/ */}
                  <a
                    href="https://app.annuaireduroyaume.com"
                    className="text-md flex items-center gap-3"
                  >
                    <LayoutDashboard className="w-6 h-6" />
                    Tableau de bord
                  </a>
                </DropdownMenuItem>
              )}
              {infoUser?.is_professional === 0 && (
                <DropdownMenuItem className="hover:bg-gray-100 rounded px-3 py-3">
                  <Link
                    to="/devenir-professionnel"
                    className="text-md flex items-center gap-3"
                  >
                    <GraduationCap className="w-6 h-6" />
                    Devenir professionnel
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem className="hover:bg-gray-100 rounded px-3 py-3">
                <Link
                  to="/mes-evenements"
                  className="text-md flex items-center gap-3"
                >
                  <Calendar className="w-6 h-6" />
                  Mes évènements
                </Link>
              </DropdownMenuItem>
              {infoUser?.is_professional === 0 && (
                <DropdownMenuItem className="hover:bg-gray-100 rounded px-3 py-3">
                  <Link
                    to="/profile"
                    className="text-md flex items-center gap-3"
                  >
                    <User className="w-6 h-6" />
                    Profil
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={logout}
                className="bg-red-600 flex items-center gap-3 rounded hover:opacity-75 font-medium text-center text-md px-3 py-2 text-white cursor-pointer mt-2"
              >
                <LogOut className="text white w-6 h-6" />
                Se déconnecter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      ) : (
        <Link
          to="/connexion"
          className="flex justify-center items-center bg-custom-gradient md:h-10 h-8 rounded md:text-md text-sm text-white font-medium md:px-6 px-3 hover:opacity-85"
        >
          Connexion
        </Link>
      )}
    </div>
  );
};

export default AvatarAuthProfile;

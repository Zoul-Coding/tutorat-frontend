import { useAtom } from "jotai";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { userAtom } from "./users.atom";
import { getToken } from "@/lib/utils";

export default function RequiedAuth() {
  // const [user] = useAtom(userAtom);
  const user = getToken();
  const location = useLocation();

  return !user ? (
    <Navigate to="/connexion" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
}

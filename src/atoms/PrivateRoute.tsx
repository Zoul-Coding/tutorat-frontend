import { useAtom } from "jotai";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { userAtom } from "./users.atom";
import { getToken } from "@/lib/utils";

export default function PrivateRoute() {
  //const [user] = useAtom(userAtom);
  const user = getToken();
  const location = useLocation();

  return user ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
}

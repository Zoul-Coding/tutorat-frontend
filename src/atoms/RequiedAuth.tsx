import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getToken } from "@/lib/utils";

export default function RequiedAuth() {
  const user = getToken();
  const location = useLocation();

  return !user ? (
    <Navigate to="/connexion" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
}

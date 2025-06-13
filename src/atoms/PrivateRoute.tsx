import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getToken } from "@/lib/utils";

export default function PrivateRoute() {
  const user = getToken();
  const location = useLocation();

  return user ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
}

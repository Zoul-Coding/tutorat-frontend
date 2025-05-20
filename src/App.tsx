import { Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import NoLayout from "./components/layouts/NoLayout";

// Pages
import ScrollToTop from "../ScrollToTop";
import AnnuaireCatalogue from "./pages/AnnuaireCatalogue";
import PresentationProfile from "./pages/PresentationProfile";
import DetailProduct from "./pages/DetailProduct";
import DetailService from "./pages/DetailService";
import DetailEvenment from "./pages/DetailEvenment";
import RedirectRegister from "./pages/RedirectRegister";
import ResetPassword from "./pages/ResetPassword";
import DetailBlog from "./pages/DetailBlog";
import Blog from "./pages/Blog";
import Register from "./pages/Register";
import Login from "./pages/login";
import Home from "./pages/Home";
import AllFiltre from "./pages/AllFiltre";
import AllProfileSection from "./pages/AllProfileSection";
import AllCategorie from "./pages/AllCategorie";
import About from "./pages/About";
import Notfound from "./pages/NotFound";
import ProfessionnelForm from "./pages/ProfessionnelForm";
import RegistrationEvent from "./pages/RegistrationEvent";
import VerifierEmail from "./pages/VerifierEmail";
import VerifierOtp from "./pages/VerifierOtp";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import AllEvenementPage from "./pages/AllEvenementPage";
import Chat from "./pages/Chat";
import PrivacyPolicy from "./pages/PrivacyPolicy";

import { configureInterceptors } from "./services/http";
import { setToLocalStorage, removeFromLocalStorage } from "./lib/utils";
import { useAtom } from "jotai";
import { userAtom, tokenReset } from "@/atoms/users.atom";
import { nameAtom } from "@/atoms/get.element.atom";
import Cookies from "js-cookie";
import { useEffect } from "react";

// route private
import PrivateRoute from "./atoms/PrivateRoute";
import RequiedAuth from "./atoms/RequiedAuth";
import MaintenancePage from "./pages/Maintenance";

function App() {
  const [user, setUser] = useAtom(userAtom);
  const [name, setName] = useAtom(nameAtom);

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      configureInterceptors(setUser);
    }
  }, [setUser]);

  useEffect(() => {
    if (user) {
      setToLocalStorage("user", user);
    } else {
      removeFromLocalStorage("user");
    }
  }, [user]);

  useEffect(() => {
    if (name) {
      setToLocalStorage("category", name);
    } else {
      removeFromLocalStorage("category");
    }
  }, [name]);

  return (
    <div>
      <ScrollToTop />
      <Routes>
        {/*  <Route path="/" element={<MaintenancePage />} /> */}
        {/* Routes avec le Layout (Header et Footer) */}
        <Route element={<Layout />}>
           {/* Routes required auth */}
          <Route element={<RequiedAuth />}>
            <Route path="/mes-evenements" element={<RegistrationEvent />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/parametre" element={<Settings />} />
          </Route>

          <Route path="/" element={<Home />} />
          <Route path="/annuaire" element={<AnnuaireCatalogue />} />
          <Route path="/entreprises" element={<AllProfileSection />} />
          <Route
            path="/profile/information/:slug"
            element={<PresentationProfile />}
          />
          <Route path="/detail/produit/:slug" element={<DetailProduct />} />
          <Route path="/detail/service/:slug" element={<DetailService />} />
          <Route path="/detail/evenement/:slug" element={<DetailEvenment />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<DetailBlog />} />
          <Route path="/recherche" element={<AllFiltre />} />
          <Route path="/categorie/:slug" element={<AllCategorie />} />
          <Route path="/a-propos" element={<About />} />
          <Route
            path="/devenir-professionnel"
            element={<ProfessionnelForm />}
          />
          <Route path="/evenements" element={<AllEvenementPage />} />
          <Route path="/politique-de-confidentialité" element={<PrivacyPolicy />} />
        </Route>

        {/* Routes sans Layout (sans Header et Footer) */}
        <Route element={<NoLayout />}>
          <Route element={<PrivateRoute />}>
            <Route path="/inscription" element={<Register />} />
            <Route path="/connexion" element={<Login />} />
          </Route>
          {/* Routes required auth */}
          <Route element={<RequiedAuth />}>
            <Route path="/chat" element={<Chat />} />
          </Route>
          <Route path="/redirect" element={<RedirectRegister />} />
          <Route path="/requiperer-mot-de-passe" element={<ResetPassword />} />
          <Route path="/verifier-email" element={<VerifierEmail />} />
          <Route path="/verifier-code" element={<VerifierOtp />} />
          <Route path="*" element={<Notfound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

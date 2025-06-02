import { Routes, Route } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import NoLayout from "./components/layouts/NoLayout";

// Pages
import ScrollToTop from "../ScrollToTop";
import Home from "./pages/Home";
import AllTutors from "./pages/AllTutors";
import TutorProfileDescription from "./components/TutorProfileDescription";
import Register from "./components/Register";
import { OtpVerification } from "./components/OtpForm";
import Settings from "./components/Settings";
import Annonces from "./components/Annonces";
import Dashbaord from "./components/Dashbaord";

// route private

function App() {

  return (
    <div>
      <ScrollToTop />
      <Routes>
        {/* Routes avec le Layout (Header et Footer) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/tuteurs" element={<AllTutors />} />
          <Route path="/tuteurs/:slug" element={<TutorProfileDescription />} />
          <Route path="/parametres" element={<Settings />} />
          <Route path="/annonces" element={<Annonces />} />
          <Route path="/tableau-de-bord" element={<Dashbaord />} />
        </Route>

        {/* Routes sans Layout (sans Header et Footer) */}
        <Route element={<NoLayout />}>
            <Route path="/inscription" element={<Register />} />
            <Route path="/verification-otp" element={<OtpVerification />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

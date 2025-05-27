import { Routes, Route } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import NoLayout from "./components/layouts/NoLayout";

// Pages
import ScrollToTop from "../ScrollToTop";
import Home from "./pages/Home";

// route private

function App() {

  return (
    <div>
      <ScrollToTop />
      <Routes>
        {/* Routes avec le Layout (Header et Footer) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* Routes sans Layout (sans Header et Footer) */}
        <Route element={<NoLayout />}>
         
        </Route>
      </Routes>
    </div>
  );
}

export default App;

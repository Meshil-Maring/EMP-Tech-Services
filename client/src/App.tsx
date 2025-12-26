import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Transaction from "./pages/Transaction";
import ProtectedRoute from "./routes/ProtectedRoute";

import AboutUs from "./pages/footer/About-us";
// import Careers from "./pages/footer/Careers";
import ServiceFAQs from "./pages/footer/ServiceFAQ";
import Web from "./pages/footer/Web";
import DevelopmentServices from "./pages/footer/DevelopmentServices";
import Design from "./pages/footer/DesignServices";
import Consulting from "./pages/footer/Consulting";
import ResourceDocumentation from "./pages/footer/Documentation";
import Support from "./pages/footer/Support";
import TermsAndService from "./pages/footer/TermsService";
import CookiePolicy from "./pages/footer/CookiePolicy";
import PrivacyPolicy from "./pages/footer/PrivacyPolicy";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/auth/sign-up" element={<Signup />}></Route>
      <Route path="/auth/log-in" element={<Login />}></Route>

      <Route
        path="/transaction"
        element={
          <ProtectedRoute>
            <Transaction />
          </ProtectedRoute>
        }
      ></Route>

      {/* Footer routes */}
      <Route path="/about-us" element={<AboutUs />}></Route>
      {/* <Route path="/careers" element={<Careers />}></Route> */}
      <Route path="/service-faqs" element={<ServiceFAQs />}></Route>
      <Route path="/web" element={<Web />}></Route>
      <Route path="/development" element={<DevelopmentServices />}></Route>
      <Route path="/ui/ux-design" element={<Design />}></Route>
      <Route path="/consulting" element={<Consulting />}></Route>
      <Route path="/documentation" element={<ResourceDocumentation />}></Route>
      <Route path="/support" element={<Support />}></Route>
      <Route path="/terms-and-service" element={<TermsAndService />}></Route>
      <Route path="/cookie-policy" element={<CookiePolicy />}></Route>
      <Route path="/privacy-policy" element={<PrivacyPolicy />}></Route>
    </Routes>
  );
}

export default App;

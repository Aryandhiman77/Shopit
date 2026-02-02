import Header from "./components/Header";
import { BrowserRouter, Route, Routes, useNavigation } from "react-router-dom";
import Home from "./pages/Home";
import DataProvider from "./context/data/DataProvider";
import AuthProvider from "./context/auth/AuthProvider";
import FooterSection from "./components/Footer";
import "./App.css";
import ProductsListing from "./pages/ProductsListing";
import ProductDetails from "./pages/ProductDetails";
import RestoreScrollToTop from "./utility/RestoreScrollToTop";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword/Verification";
import ResetPass from "./pages/ForgotPassword/ResetPass";
import CartPage from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyAccount from "./pages/MyAccount";
import TrackPackage from "./pages/TrackPackage";
import OrderPlaced from "./pages/OrderPlaced";
import OTPVerification from "./pages/OTPVerification";
import { Toaster } from "react-hot-toast";
import VerificationGuard from "./pages/ForgotPassword/Verification/VerificationGuard";
import ResetPasswordGuard from "./pages/ForgotPassword/ResetPass/resetGuard";
import ProtectedRoutes from "./components/protectedRoutes";
import PublicRoutes from "./components/publicComponents";
import Loading from "./context/loading";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <DataProvider>
            <Toaster />
            <RestoreScrollToTop />
            <Header />
            <Routes>
              <Route element={<PublicRoutes />}>
                <Route exact={true} path="/login" element={<Login />} />
                <Route
                  exact={true}
                  path="/verify"
                  element={
                    <VerificationGuard>
                      <ForgotPassword />
                    </VerificationGuard>
                  }
                />
                <Route
                  exact={true}
                  path="/reset-password"
                  element={
                    <ResetPasswordGuard>
                      <ResetPass />
                    </ResetPasswordGuard>
                  }
                />

                <Route exact={true} path="/register" element={<Register />} />
                <Route
                  exact={true}
                  path="/otp-verification"
                  element={<OTPVerification />}
                />
              </Route>
              <Route exact={true} path="/" element={<Home />} />
              <Route
                exact={true}
                path="/category/:category"
                element={<ProductsListing />}
              />
              <Route
                exact={true}
                path="/product/:slug"
                element={<ProductDetails />}
              />

              <Route exact={true} path="/myCart" element={<CartPage />} />

              {/*  protected  routes*/}
              <Route element={<ProtectedRoutes />}>
                <Route exact={true} path="/checkout" element={<Checkout />} />
                <Route exact={true} path="/myaccount" element={<MyAccount />} />
                <Route exact={true} path="/track" element={<TrackPackage />} />
                <Route
                  exact={true}
                  path="/orderPlaced"
                  element={<OrderPlaced />}
                />
              </Route>
            </Routes>
            <FooterSection />
          </DataProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;

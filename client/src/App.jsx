import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import DataProvider from "./context/DataProvider";
import AuthProvider from "./context/AuthProvider";
import FooterSection from "./components/Footer";
import "./App.css";
import ProductsListing from "./pages/ProductsListing";
import BreadCrumb from "./components/Reusables/BreadCrumb";
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

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <DataProvider>
            <RestoreScrollToTop />
            <Header />
            <Routes>
              <Route exact={true} path="/" element={<Home />} />
              <Route
                exact={true}
                path="/:category"
                element={<ProductsListing />}
              />
              <Route
                exact={true}
                path="/product/:slug"
                element={<ProductDetails />}
              />
              <Route exact={true} path="/login" element={<Login />} />
              <Route exact={true} path="/register" element={<Register />} />
              <Route exact={true} path="/verify" element={<ForgotPassword />} />
              <Route exact={true} path="/reset" element={<ResetPass />} />
              <Route exact={true} path="/myCart" element={<CartPage />} />
              <Route exact={true} path="/checkout" element={<Checkout />} />
              <Route exact={true} path="/myaccount" element={<MyAccount />} />
              <Route exact={true} path="/track" element={<TrackPackage />} />
              <Route
                exact={true}
                path="/orderPlaced"
                element={<OrderPlaced />}
              />
            </Routes>
            <FooterSection />
          </DataProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;

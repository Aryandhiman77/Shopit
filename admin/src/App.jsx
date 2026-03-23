import React, { useEffect } from "react";
import Dashboard from "./Pages/Dashboard";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { ThemeProvider } from "./Context/Theme/themeProvider";
import Layout from "./Components/Reusables/Layout";
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import ProtectedRoute from "./Components/Reusables/Routes/ProtectedRoute";
import PublicRoute from "./Components/Reusables/Routes/PublicRoute";
import ProductListing from "./Pages/Products/ProductListing";
import AddProduct from "./Pages/Products/AddProduct";
import StoreSettings from "./Pages/Settings";
import CategoryList from "./Pages/Categories/CategoryList";
import AddCategory from "./Pages/Categories/AddCategory";
import Users from "./Pages/Users";
import Orders from "./Pages/AllOrders";
import AuthProvider from "./Context/Auth/AuthProvider";
import OTPVerification from "./Pages/OTPVerification";
import { Toaster } from "react-hot-toast";
import ChartDataProvider from "./Context/Charts/ChartDataProvider";
import CategoryProvider from "./Context/Category/CategoryProvider";
import UserProvider from "./Context/Users/UserProvider";
import ProductsProvider from "./Context/Products/ProductsProvider";
import BrandProvider from "./Context/Brand/BrandProvider";
import PageNotFound from "./Pages/404";
import BrandList from "./Pages/Brands";
import AddBrand from "./Pages/Brands/AddBrand";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <CategoryProvider>
            <Toaster />
            <Routes>
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/verify" element={<Login />} />
                <Route path="/otp-verification" element={<OTPVerification />} />
                <Route path="/signup" element={<Signup />} />
              </Route>

              <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                  <Route element={<ProductsProvider />}>
                    <Route element={<BrandProvider />}>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/brands" element={<BrandList />} />
                      <Route path="/brand/add" element={<AddBrand />} />
                      <Route path="/products" element={<ProductListing />} />
                      <Route path="/products/add" element={<AddProduct />} />

                      <Route path="/categories" element={<CategoryList />} />
                      <Route path="/categories/add" element={<AddCategory />} />
                      <Route path="/orders" element={<Orders />} />
                      <Route
                        path="/users"
                        element={
                          <UserProvider>
                            <Users />
                          </UserProvider>
                        }
                      />
                      <Route path="/settings" element={<StoreSettings />} />
                      <Route path="*" element={<PageNotFound />} />
                    </Route>
                  </Route>
                </Route>
              </Route>
            </Routes>
          </CategoryProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;

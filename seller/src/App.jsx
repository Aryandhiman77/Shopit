import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Dashboard from "./Pages/Dashboard";
import PublicRoutes from "./components/PublicRoutes";
import AuthProvider from "./Context/Auth/AuthProvider";
import DataProvider from "./Context/Data/DataProvider";
import Notify from "./components/Reusables/Notify";
import OTPVerification from "./Pages/OTPVerification";
import Layout from "./Pages/Dashboard/Layout/index";
import Products from "./Pages/Products";
import ChartDataProvider from "./Context/Charts/ChartsDataProvider";
import CategoryList from "./Pages/Categories/CategoryList";
import AddCategory from "./Pages/Categories/AddCategory";
import AddSubCategory from "./Pages/Categories/AddSubCategory";
import AddLeafCategory from "./Pages/Categories/AddLeafCategory";
const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <ChartDataProvider>
            <Notify />
            <Routes>
              {/* default route */}
              <Route
                path="/"
                element={<Navigate to="/seller/login" replace />}
              />

              {/* public routes */}
              <Route element={<PublicRoutes />}>
                <Route path={"/seller/register"} element={<Register />} />
                <Route path={"/seller/login"} element={<Login />} />
                <Route
                  path={"/otp-verification"}
                  element={<OTPVerification />}
                />
              </Route>

              {/* protected routes */}
              <Route element={<ProtectedRoutes />}>
                <Route element={<Layout />}>
                  <Route
                    exact={true}
                    path="/dashboard"
                    element={<Dashboard />}
                  />
                  <Route exact={true} path="/products" element={<Products />} />
                  <Route
                    exact={true}
                    path="/create-brand-request"
                    element={<Products />}
                  />

                  <Route path="*" element={<Navigate to="/page-not-found" />} />
                </Route>
              </Route>
            </Routes>
          </ChartDataProvider>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

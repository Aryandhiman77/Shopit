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
const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <Notify />
          <Routes>
            {/* default route */}
            <Route path="/" element={<Navigate to="/seller/login" replace />} />

            {/* public routes */}
            <Route element={<PublicRoutes />}>
              <Route path={"/seller/register"} element={<Register />} />
              <Route path={"/seller/login"} element={<Login />} />
            </Route>

            {/* protected routes */}
            <Route element={<ProtectedRoutes />}>
              <Route element={<Layout />}>
                <Route exact={true} path="/dashboard" element={<Dashboard />} />
                <Route exact={true} path="/products" element={<Products />} />
              </Route>
            </Route>
          </Routes>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

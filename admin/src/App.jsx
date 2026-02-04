import React from "react";
import Dashboard from "./Pages/Dashboard";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./Context/Theme/themeProvider";
import Layout from "./Components/Reusables/Layout";
import { DataProvider } from "./Context/Data/DataProvider";
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import { AuthProvider } from "./Context/Auth/authProvider";
import ProtectedRoute from "./Components/Reusables/Routes/ProtectedRoute";
import PublicRoute from "./Components/Reusables/Routes/PublicRoute";
import Products from "./Pages/Products/AllProducts";
import AddProduct from "./Pages/Products/AddProduct";
import StoreSettings from "./Pages/Settings";
import CategoryList from "./Pages/Categories/CategoryList";
import AddCategory from "./Pages/Categories/AddCategory";
import AddSubCategory from "./Pages/Categories/AddSubCategory";
import AddLeafCategory from "./Pages/Categories/AddLeafCategory";
import Users from "./Pages/Users";
import Orders from "./Pages/AllOrders";
const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <DataProvider>
            <Routes>
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Route>

              <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/add" element={<AddProduct />} />
                  <Route path="/categories" element={<CategoryList />} />
                  <Route path="/categories/add" element={<AddCategory />} />
                  <Route
                    path="/categories/add-subcategory"
                    element={<AddSubCategory />}
                  />
                  <Route
                    path="/categories/add-leafcategory"
                    element={<AddLeafCategory />}
                  />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/settings" element={<StoreSettings />} />
                </Route>
              </Route>

              {/* FALLBACK ROUTE */}
              <Route path="*" element={<Navigate to="/page-not-found" />} />
            </Routes>
          </DataProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;

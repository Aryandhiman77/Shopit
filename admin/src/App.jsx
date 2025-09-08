import React from "react";
import Dashboard from "./Components/Pages/Dashboard";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./Context/Theme/themeProvider";
import Header from "./Components/Header";
import Layout from "./Components/Reusables/Layout";
import { DataProvider } from "./Context/Data/dataProvider";
import Login from "./Components/Pages/Auth/Login";
import Signup from "./Components/Pages/Auth/Signup";
import { AuthProvider } from "./Context/Auth/authProvider";
import ProtectedRoute from "./Components/Reusables/Routes/ProtectedRoute";
import PublicRoute from "./Components/Reusables/Routes/PublicRoute";
import Products from "./Components/Pages/Products/AllProducts";
import AddProduct from "./Components/Pages/Products/AddProduct";
import StoreSettings from "./Components/Pages/Settings";
import CategoryList from "./Components/Pages/Categories/CategoryList";
import AddCategory from "./Components/Pages/Categories/AddCategory";
import AddSubCategory from "./Components/Pages/Categories/AddSubCategory";
import AddLeafCategory from "./Components/Pages/Categories/AddLeafCategory";
import Users from "./Components/Pages/Users";
import Orders from "./Components/Pages/AllOrders";
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
                  <Route path="/categories/add-subcategory" element={<AddSubCategory />} />
                  <Route path="/categories/add-leafcategory" element={<AddLeafCategory />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/settings" element={<StoreSettings />} />
                </Route>
              </Route>

              {/* FALLBACK ROUTE */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </DataProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;

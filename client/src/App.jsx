import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import DataProvider from "./context/DataProvider";
import AuthProvider from "./context/AuthProvider";
import FooterSection from "./components/Footer";
import "./App.css"
import ProductsListing from "./pages/ProductsListing";
import BreadCrumb from "./components/Reusables/BreadCrumb";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <Header />
          <Routes>
            <Route exact={true} path="/" element={<Home />} />
            <Route exact={true} path="/:category" element={<ProductsListing />} />
          </Routes>
          <FooterSection/>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
    
  );
};

export default App;

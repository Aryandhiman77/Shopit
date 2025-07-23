import React, { useContext } from "react";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import DataProvider from "./context/DataProvider";
import AuthProvider from "./context/AuthProvider";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <Header />
          <Routes>
            <Route exact={true} path="/" element={<Home />} />
          </Routes>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

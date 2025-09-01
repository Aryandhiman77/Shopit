import React from "react";
import Dashboard from "./Components/Pages/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./Context/Theme/themeProvider";
import Header from "./Components/Header";
import Layout from "./Components/Reusables/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Layout>
        <Routes>
          <Route exact={true} path="/" element={<Dashboard />} />
        </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;

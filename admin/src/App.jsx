import React from "react";
import Dashboard from "./Components/Pages/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./Context/Theme/themeProvider";
import Header from "./Components/Header";
import Layout from "./Components/Reusables/Layout";
import { DataProvider } from "./Context/Data/dataProvider";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <DataProvider>
          <Layout>
            <Routes>
              <Route exact={true} path="/" element={<Dashboard />} />
            </Routes>
          </Layout>
        </DataProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;

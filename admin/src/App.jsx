import React from "react";
import Dashboard from "./Pages/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./Context/Theme/themeProvider";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route exact={true} path="/" element={<Dashboard />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;

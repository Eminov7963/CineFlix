import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Client/Home";
import Login from "./pages/Auth/Login";

function App() {
  return (
    <Routes>
      {/* Login sayfası, index route olarak root adresinde */}
      <Route path="/" element={<Login />} />

      {/* Main layout ve Home sayfası alt rotada */}
      <Route path="/home" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Client/Home";
import Login from "./pages/Auth/Login";

function App() {
  return (
    <Routes>
   
      <Route path="/" element={<Login />} />

     
      <Route path="/home" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;

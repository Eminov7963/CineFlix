import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Client/Home";
import Login from "./pages/Auth/Login";
import MovieTrailer from "./pages/Client/MovieTrailer";
import Detail from "./pages/Client/Detail";
import Wishlist from "./pages/Client/Wishlist";

function App() {
  return (
    <Routes>
      {/* İlk giriş ekranı */}
      <Route path="/" element={<Login />} />

      {/* Ana layout içinde gösterilecek sayfalar */}
      <Route path="/home" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="movie/:id" element={<MovieTrailer />} />
        <Route path="tv/:id" element={<Detail />} />
        <Route path="wishlist" element={<Wishlist/>}/>
      </Route>
    </Routes>
  );
}

export default App;

import { Route, Routes } from "react-router-dom"; // Yönlendirme işlemleri için React Router kullanılıyor
import "./App.css"; // Stil dosyası
import MainLayout from "./layouts/MainLayout"; // Ana layout bileşeni
import Home from "./pages/Client/Home"; // Ana sayfa bileşeni
import Login from "./pages/Auth/Login"; // Giriş sayfası bileşeni
import MovieTrailer from "./pages/Client/MovieTrailer"; // Film fragmanı sayfası
import Detail from "./pages/Client/Detail"; // TV programı ya da film detay sayfası
import Wishlist from "./pages/Client/Wishlist"; // Kullanıcının beğenilen içeriklerini görüntülemesi
import NotFound from "./pages/Client/NotFound"; // Bulunamadı sayfası
import Films from "./pages/Client/Films";
import { useState } from "react";
import About from "./pages/Client/About";
import Contact from "./pages/Client/Contact";
import PremiumPage from "./pages/Client/Premium";
import AdminMainLayout from "./layouts/Admin/AdminMainlayout";
import AdminHome from "./pages/Admin/AdminHome";
import Movies from "./pages/Admin/MoviesData";
import Users from "./pages/Admin/Users";
import Add from "./pages/Admin/AddingMovie";
import CineFlix from "./pages/Client/CinePro";


function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/home" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="movie/:id" element={<MovieTrailer />} />
        <Route path="tv/:id" element={<Detail />} />
        <Route path="watchlist" element={<Wishlist />} />
        <Route path="films" element={<Films />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="premium" element={<PremiumPage />} />
        <Route path="cineflix" element={<CineFlix />} />
      </Route>

      <Route path="admin" element={<AdminMainLayout />}>
        <Route index element={<AdminHome />} />
        <Route path="movies" element={<Movies />} />
        <Route path="users" element={<Users />} />
        <Route path="add" element={<Add />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

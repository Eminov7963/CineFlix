import React, { useEffect, useState } from "react";
import Header from "../Header";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const MainLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const expiresInSeconds = decoded.exp - Math.floor(Date.now() / 1000);

        if (expiresInSeconds <= 0) {
          console.error("Token süresi dolmuş, çıkış yapılıyor...");
          Cookies.remove("token");
          setIsAuthenticated(false);
          navigate("/"); // Token süresi dolmuşsa login sayfasına yönlendir
        } else {
          setIsAuthenticated(true); // Token geçerli ise kullanıcıyı kabul et
        }
      } catch (error) {
        console.error("Geçersiz token:", error);
        Cookies.remove("token");
        setIsAuthenticated(false);
        navigate("/"); // Geçersiz token durumunda login sayfasına yönlendir
      }
    } else {
      navigate("/"); // Eğer token yoksa login sayfasına yönlendir
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return null; // Yönlendirme yapılana kadar hiçbir şey render etme
  }

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;

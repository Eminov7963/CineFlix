import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [decodedToken, setDecodedToken] = useState(null);
  const navigate = useNavigate();

  // Kullanıcı giriş yaptığında çağrılacak fonksiyon
  function handleLogin(value) {
    if (!value) return;

    try {
      const decoded = jwtDecode(value);
      console.log("Decoded Token:", decoded);

      const expiresInSeconds = decoded.exp - Math.floor(Date.now() / 1000);
      if (expiresInSeconds <= 0) {
        console.error("Token süresi dolmuş!");
        handleLogout();
        return;
      }

      // Token'ı belirlenen süre kadar cookies'e kaydet
      Cookies.set("token", value, {
        expires: expiresInSeconds / (60 * 60 * 24),
      });
      setToken(value);
      setDecodedToken(decoded);
      navigate("/admin");
    } catch (error) {
      console.error("Geçersiz token:", error);
      handleLogout();
    }
  }

  // Kullanıcı çıkış yaptığında çağrılacak fonksiyon
  function handleLogout() {
    setToken(null);
    setDecodedToken(null);
    Cookies.remove("token");
    navigate("/login");
  }

  // Uygulama yüklendiğinde token kontrolü yap
  useEffect(() => {
    const savedToken = Cookies.get("token");
    if (savedToken) {
      try {
        const decoded = jwtDecode(savedToken);
        const expiresInSeconds = decoded.exp - Math.floor(Date.now() / 1000);
        if (expiresInSeconds <= 0) {
          console.error("Token süresi dolmuş!");
          handleLogout();
        } else {
          setToken(savedToken);
          setDecodedToken(decoded);
        }
      } catch (error) {
        console.error("Geçersiz token:", error);
        handleLogout();
      }
    }
  }, []); // ✅ `token` bağımlılığı kaldırıldı, sadece bir kere çalışır.

  return (
    <AuthContext.Provider
      value={{ token, decodedToken, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

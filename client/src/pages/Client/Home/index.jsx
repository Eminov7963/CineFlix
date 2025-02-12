import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Çerezlere erişim için
import { Base_Url } from "../../../constant/base"; // Base URL

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = Cookies.get("token"); // Çerezden token'ı alıyoruz

      if (!token) {
        setError("Kullanıcı giriş yapmamış.");
        return;
      }

      try {
        // API'ye istek gönderiyoruz ve Authorization başlığına token'ı ekliyoruz
        const response = await axios.get(`${Base_Url}/api/products`, {
          headers: {
            Authorization: `Bearer ${token}`, // Token'ı Authorization başlığına ekliyoruz
          },
        });
        console.log(response);
        
        // Ürünleri state'e kaydediyoruz
        setProducts(response.data.data);
      } catch (err) {
        setError("Ürünler alınırken bir hata oluştu.");
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Home - Ürünler</h1>
      {error && <p>{error}</p>} {/* Hata mesajını göster */}
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-item">
              <h2>{product.title}</h2>
              <p>{product.description}</p>
            </div>
          ))
        ) : (
          <p>Ürünler yükleniyor...</p> // Ürünler yükleniyorsa göster
        )}
      </div>
    </div>
  );
};

export default Home;

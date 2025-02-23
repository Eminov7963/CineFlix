import React, { useState } from "react";
import Cookies from "js-cookie"; // js-cookie kütüphanesini import ediyoruz
import styles from "./index.module.scss";

const PremiumPage = () => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cvv: "",
    expirationDate: "",
    country: "",
  });

  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  // Form inputlarını yönetme
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Ödeme gönderme işlemi
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const token = Cookies.get("token");
    console.log(token);
    
    if (!token) {
      console.error("Token bulunamadı!");
      setPaymentStatus("Token bulunamadı, lütfen giriş yapın.");
      return;
    }

    const response = await fetch(
      "http://localhost:8080/api/manual-payment-success",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          paymentStatus: "successful",
        }),
      }
    );
    console.log(response);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    setPaymentStatus("Ödeme başarılı, premium üyelik aktif!");
  } catch (error) {
    console.error("Error:", error.message);
    setPaymentStatus("Ödeme sırasında bir hata oluştu.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className={styles.premiumPage}>
      <h2>Premium Üyelik Ödeme</h2>
      <form onSubmit={handleSubmit} className={styles.paymentForm}>
        <div>
          <label htmlFor="cardNumber">Kart Numarası:</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            placeholder="Kart Numarası"
            value={formData.cardNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="cvv">CVV:</label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            placeholder="CVV"
            value={formData.cvv}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="expirationDate">Son Kullanma Tarihi:</label>
          <input
            type="text"
            id="expirationDate"
            name="expirationDate"
            placeholder="MM/YY"
            value={formData.expirationDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="country">Ülke:</label>
          <input
            type="text"
            id="country"
            name="country"
            placeholder="Ülke"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Ödeme İşleniyor..." : "Ödemeyi Yap"}
        </button>
      </form>

      {paymentStatus && (
        <div className={styles.paymentStatus}>{paymentStatus}</div>
      )}
    </div>
  );
};

export default PremiumPage;

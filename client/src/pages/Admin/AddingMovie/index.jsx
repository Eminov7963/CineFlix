import React, { useState } from "react";
import { usePostNewCategoryMutation } from "../../../redux/services/product";
import styles from "./index.module.scss";
import Cookies from "js-cookie";

const Add = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState(0);
  const [duration, setDuration] = useState(0);
  const [director, setDirector] = useState("");
  const [cast, setCast] = useState("");
  const [poster, setPoster] = useState(""); // URL olarak kaydediyoruz
  const [language, setLanguage] = useState("");
  const [country, setCountry] = useState("");

  const [postNewCategory] = usePostNewCategoryMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("releaseDate", releaseDate);
    formData.append("genre", genre.split(","));
    formData.append("rating", rating);
    formData.append("duration", duration);
    formData.append("director", director);
    formData.append("cast", cast.split(","));
    formData.append("poster", poster); // URL olarak poster ekliyoruz
    formData.append("language", language);
    formData.append("country", country);

    const token = Cookies.get("token");

    try {
      await fetch("http://localhost:8080/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      await postNewCategory(formData);
    } catch (error) {
      console.log("Film ekleme hatası:", error);
    }
  };

  return (
    <div className={styles.addMovieContainer}>
      <h2 className={styles.addMovieTitle}>Yeni Film Ekle</h2>
      <form className={styles.addMovieForm} onSubmit={handleSubmit}>
        <label className={styles.addMovieLabel}>Film Adı:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.addMovieInput}
        />

        <label className={styles.addMovieLabel}>Açıklama:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.addMovieInput}
        />

        <label className={styles.addMovieLabel}>Yayın Tarihi:</label>
        <input
          type="date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          className={styles.addMovieInput}
        />

        <label className={styles.addMovieLabel}>Tür:</label>
        <input
          type="text"
          placeholder="Türleri virgülle ayırın"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className={styles.addMovieInput}
        />

        <label className={styles.addMovieLabel}>Puan:</label>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className={styles.addMovieInput}
        />

        <label className={styles.addMovieLabel}>Süre (Dakika):</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className={styles.addMovieInput}
        />

        <label className={styles.addMovieLabel}>Yönetmen:</label>
        <input
          type="text"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
          className={styles.addMovieInput}
        />

        <label className={styles.addMovieLabel}>Oyuncular:</label>
        <input
          type="text"
          placeholder="Oyuncuları virgülle ayırın"
          value={cast}
          onChange={(e) => setCast(e.target.value)}
          className={styles.addMovieInput}
        />

        <label className={styles.addMovieLabel}>Afiş URL:</label>
        <input
          type="text"
          placeholder="Afişin URL'sini girin"
          value={poster}
          onChange={(e) => setPoster(e.target.value)}
          className={styles.addMovieInput}
        />

        <label className={styles.addMovieLabel}>Dil:</label>
        <input
          type="text"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className={styles.addMovieInput}
        />

        <label className={styles.addMovieLabel}>Ülke:</label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className={styles.addMovieInput}
        />

        <button type="submit" className={styles.addMovieButton}>
          Filmi Ekle
        </button>
      </form>
    </div>
  );
};

export default Add;

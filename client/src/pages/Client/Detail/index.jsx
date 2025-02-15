import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";

const Detail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.movie || location.state?.tvShow;

  if (!item) {
    return <p>Detay bilgisi bulunamadı!</p>;
  }
  const handleClick = (movie) => {
    navigate(`/home/movie/${movie._id}`, { state: { movie } });
  };
  return (
    <main className={styles.detail}>
      <button className={styles.back} onClick={() => navigate(-1)}>
        ⬅ Geri
      </button>
      <div className={styles.content}>
        <img src={item.poster} alt={item.title} className={styles.poster} />
        <div className={styles.info}>
          <h1>{item.title}</h1>
          <p>{item.description}</p>
          <p>
            <strong>Tür:</strong> {item.genre?.join(", ")}
          </p>
          <p>
            <strong>Çıkış Tarihi:</strong>{" "}
            {new Date(item.releaseDate).toLocaleDateString()}
          </p>
          {item.rating && (
            <p>
              <strong>Puan:</strong> ⭐ {item.rating}/10
            </p>
          )}
          {item.seasons !== undefined && (
            <p>
              <strong>Sezon Sayısı:</strong> {item.seasons}
            </p>
          )}
          {item.episodes !== undefined && (
            <p>
              <strong>Bölüm Sayısı:</strong> {item.episodes}
            </p>
          )}
          {item.isOngoing !== undefined && (
            <p>
              <strong>Devam Ediyor mu?:</strong>{" "}
              {item.isOngoing ? "Evet" : "Hayır"}
            </p>
          )}
          {item.director && (
            <p>
              <strong>Yönetmen:</strong> {item.director}
            </p>
          )}
          {item.cast && item.cast.length > 0 && (
            <p>
              <strong>Oyuncular:</strong> {item.cast.join(", ")}
            </p>
          )}
          {item.language && (
            <p>
              <strong>Dil:</strong> {item.language}
            </p>
          )}
          {item.country && (
            <p>
              <strong>Ülke:</strong> {item.country}
            </p>
          )}
          {item.trailer && (
            <button onClick={()=>{handleClick(item)}}>▶ Fragmanı İzle</button>
          )}
        </div>
      </div>
    </main>
  );
};

export default Detail;

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";

const MovieTrailer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const movie = location.state?.movie;

  if (!movie) {
    return <p>Film bilgisi bulunamadı!</p>;
  }

  // YouTube URL'si ise embed formatına çevir
  const getTrailerEmbedUrl = (url) => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.split("v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url; // Başka bir formatta ise orijinal URL
  };

  return (
    <main className={styles.movieTrailer}>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      <div className={styles.trailerContainer}>
        <iframe
          width="100%"
          height="500px"
          src={getTrailerEmbedUrl(movie.trailer)}
          title="Movie Trailer"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      <button onClick={() => navigate(-1)}>Geri</button>
      </div>
    </main>
  );
};

export default MovieTrailer;

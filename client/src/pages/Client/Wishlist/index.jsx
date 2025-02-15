import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist.items); // 📌 Redux wishlist verisini al
  const navigate = useNavigate();

  return (
    <div className={styles.wishlistPage}>
      <h1>My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Henüz favorilere eklenen bir TV şovu yok.</p>
      ) : (
        <div className={styles.wishlistGrid}>
          {wishlist.map((tvShow) => (
            <div
              key={tvShow._id}
              className={styles.wishlistItem}
              onClick={() =>
                navigate(`/home/tv/${tvShow._id}`, { state: { tvShow } })
              }
            >
              <img
                src={tvShow.poster}
                alt={tvShow.title}
                className={styles.wishlistImage}
              />
              <h3>{tvShow.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;

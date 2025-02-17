import { useDispatch, useSelector } from "react-redux";
import { toggleFavorites } from "../../../redux/features/wishlistSlice";
import styles from "./index.module.scss";
import { FaHeart, FaRegHeart, FaPlay, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist);
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const handleClick = (movie) => {
      navigate(`/home/movie/${movie._id}`, { state: { movie } });
    };

    // **TV Şovları için detay sayfaasına yönlendirme**
    const handleTvShowClick = (tvShow) => {
      navigate(`/home/tv/${tvShow._id}`, { state: { tvShow } });
    };
  return (
    <div>
      {wishlist.items.length === 0 ? (
        <h2>Wihslist is empty!</h2>
      ) : (
        wishlist.items.map((tvShow) => {
          return (
            <div className={styles.card}>
              <img
                src={tvShow.poster}
                alt={tvShow.title}
                className={styles.tvImage}
              />
              <div className={styles.tvInfo}>
                <h3>{tvShow.title}</h3>
                <p>{tvShow.genre.join(", ")}</p>
                <div className={styles.buttons}>
                  <button
                    className={styles.trailer}
                    onClick={() => handleClick(tvShow)}
                  >
                    <FaPlay /> Trailer
                  </button>
                  <button
                    className={styles.detail}
                    onClick={() => handleTvShowClick(tvShow)}
                  >
                    <FaInfoCircle /> Details
                  </button>
                  <button
                    className={styles.wishlist}
                    onClick={() => {
                      dispatch(toggleFavorites(tvShow));
                    }}
                  >
                    {!wishlist?.items.find((q) => q._id === tvShow._id) ? (
                      <FaRegHeart />
                    ) : (
                      <FaHeart />
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Wishlist;

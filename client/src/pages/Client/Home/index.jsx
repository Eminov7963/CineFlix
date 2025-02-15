import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useGetAllCategoriesQuery } from "../../../redux/services/product";
import { useGetAllTvShowsQuery } from "../../../redux/services/tvApi";
import { logout } from "../../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaHeart, FaRegHeart, FaPlay, FaInfoCircle } from "react-icons/fa";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const { data, error, isLoading } = useGetAllCategoriesQuery();
  const {
    data: tvData,
    error: tvError,
    isLoading: tvLoading,
  } = useGetAllTvShowsQuery();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setProducts(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (tvData) {
      setTvShows(tvData.data);
    }
  }, [tvData]);

  useEffect(() => {
    if (error?.status === 401 || tvError?.status === 401) {
      dispatch(logout());
      navigate("/login");
    }
  }, [error, tvError, dispatch, navigate]);

  // **Filmler için yönlendirme**
  const handleClick = (movie) => {
    navigate(`/home/movie/${movie._id}`, { state: { movie } });
  };

  // **TV Şovları için detay sayfaasına yönlendirme**
  const handleTvShowClick = (tvShow) => {
    navigate(`/home/tv/${tvShow._id}`, { state: { tvShow } });
  };





  return (
    <main>
      {/* FILMLER */}
      <section className={styles.products}>
        <h1>THE MOST POPULAR 10 MOVIES</h1>
        {isLoading && <p>Ürünler yükleniyor...</p>}
        {error && (
          <p>{error.message || "Ürünler alınırken bir hata oluştu."}</p>
        )}

        {products.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={5}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
          >
            {products.slice(0, 10).map((movie) => (
              <SwiperSlide key={movie._id}>
                <div
                  className={styles.productItem}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleClick(movie)}
                >
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className={styles.productImage}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p>Ürün bulunamadı.</p>
        )}
      </section>

      {/* TV ŞOVLARI */}
      <section className={styles.tv}>
        <div className={styles.tvcontain}>
          <div className={styles.head}>
            <h1>Popular TV Shows</h1>
            <p>Trending in Superhero TV Shows</p>
          </div>
          <div className={styles.bottom}>
            {tvLoading && <p>TV Şovları yükleniyor...</p>}
            {tvError && (
              <p>
                {tvError.message || "TV şovları alınırken bir hata oluştu."}
              </p>
            )}
            {tvShows.length > 0 ? (
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={4}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 300000 }}
                className={styles.tvSwiper}
              >
                {tvShows.map((tvShow) => (
                  <SwiperSlide key={tvShow._id}>
                    <div className={styles.tvCard}>
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
                            onClick={() =>
                              setWishlist((prev) =>
                                prev.includes(tvShow._id)
                                  ? prev.filter((id) => id !== tvShow._id)
                                  : [...prev, tvShow._id]
                              )
                            }
                          >
                            {wishlist.includes(tvShow._id) ? (
                              <FaHeart color="red" />
                            ) : (
                              <FaRegHeart />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <p>TV şovu bulunamadı.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;

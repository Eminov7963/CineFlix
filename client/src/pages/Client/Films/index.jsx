import React, { useEffect, useState } from "react";
import { useGetAllCategoriesQuery } from "../../../redux/services/product";
import { useGetAllTvShowsQuery } from "../../../redux/services/tvApi";
import styles from "./index.module.scss";
import { FaHeart, FaRegHeart, FaPlay, FaInfoCircle } from "react-icons/fa";
import { toggleFavorites } from "../../../redux/features/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Films = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const wishlist = useSelector((state) => state.wishlist);
  const {
    data: movieData,
    error: movieError,
    isLoading: movieLoading,
  } = useGetAllCategoriesQuery();
  const {
    data: tvData,
    error: tvError,
    isLoading: tvLoading,
  } = useGetAllTvShowsQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Filmleri ve dizileri state'e atıyoruz.
  useEffect(() => {
    if (movieData?.data) {
      setMovies(movieData.data);
    }
  }, [movieData]);

  useEffect(() => {
    if (tvData?.data) {
      setTvShows(tvData.data);
    }
  }, [tvData]);

  // Arama ve kategoriye göre filtreleme
  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "" || movie.genre.includes(selectedCategory))
  );

  const filteredTvShows = tvShows.filter(
    (tv) =>
      tv.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "" || tv.genre.includes(selectedCategory))
  );
  const handleClick = (movie) => {
    navigate(`/home/movie/${movie._id}`, { state: { movie } });
  };

  // **TV Şovları için detay sayfaasına yönlendirme**
  const handleTvShowClick = (tvShow) => {
    navigate(`/home/tv/${tvShow._id}`, { state: { tvShow } });
  };
  return (
    <main>
      <section className={styles.films}>
        <div className={styles.head}>
          <div className={styles.search}>
            <label htmlFor="search">Search</label>
            <input
              type="text"
              id="search"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className={styles.category}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Action">Action</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Thriller">Thriller</option>
              {/* Gerekirse dinamik kategori listesi çekilebilir */}
            </select>
          </div>
        </div>
        <div className={styles.names}>
          <h2>Movies</h2>
          <h2>TV Shows</h2>
        </div>
        <div className={styles.products}>
          <div className={styles.movies}>
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movies) => (
                <div key={movies._id} className={styles.card}>
                  <img src={movies.poster} alt={movies.title} />
                  <h3>{movies.title}</h3>
                  <div className={styles.buttons}>
                    <button
                      className={styles.trailer}
                      onClick={() => handleClick(movies)}
                    >
                      <FaPlay /> Trailer
                    </button>
                    <button
                      className={styles.detail}
                      onClick={() => handleTvShowClick(movies)}
                    >
                      <FaInfoCircle /> Details
                    </button>
                    <button
                      className={styles.wishlist}
                      onClick={() => {
                        dispatch(toggleFavorites(movies));
                      }}
                    >
                      {!wishlist?.items.find((q) => q._id === movies._id) ? (
                        <FaRegHeart />
                      ) : (
                        <FaHeart />
                      )}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No movies found.</p>
            )}
          </div>

          <div className={styles.tv}>
            {filteredTvShows.length > 0 ? (
              filteredTvShows.map((tv) => (
                <div key={tv._id} className={styles.card}>
                  <img src={tv.poster} alt={tv.title} />
                  <h3>{tv.title}</h3>
                  <div className={styles.buttons}>
                    <button
                      className={styles.trailer}
                      onClick={() => handleClick(tv)}
                    >
                      <FaPlay /> Trailer
                    </button>
                    <button
                      className={styles.detail}
                      onClick={() => handleTvShowClick(tv)}
                    >
                      <FaInfoCircle /> Details
                    </button>
                    <button
                      className={styles.wishlist}
                      onClick={() => {
                        dispatch(toggleFavorites(tv));
                      }}
                    >
                      {!wishlist?.items.find((q) => q._id === tv._id) ? (
                        <FaRegHeart />
                      ) : (
                        <FaHeart />
                      )}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No TV shows found.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Films;

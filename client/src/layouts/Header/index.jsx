import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetAllCategoriesQuery } from "../../redux/services/product";
import { useGetAllTvShowsQuery } from "../../redux/services/tvApi"; // TV verisi için eklendi
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("EN");
  const [searchquery, setSearchQuery] = useState([]);
  const [product, setProduct] = useState([]); // Filmler
  const [tvShows, setTvShows] = useState([]); // TV Şovları

  const wishlist = useSelector((state) => state.wishlist);
  const { data: movieData } = useGetAllCategoriesQuery();
  const { data: tvData } = useGetAllTvShowsQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (movieData) {
      setProduct(movieData.data);
    }
  }, [movieData]);

  useEffect(() => {
    if (tvData) {
      setTvShows(tvData.data);
    }
  }, [tvData]);

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
    console.log(`Language changed to: ${e.target.value}`);
  };

  const handleChange = (searchText) => {
    const lowerCaseQuery = searchText.toLowerCase();

    const filteredMovies = product.filter((q) =>
      q.title.toLowerCase().includes(lowerCaseQuery)
    );

    const filteredTvShows = tvShows.filter((q) =>
      q.title.toLowerCase().includes(lowerCaseQuery)
    );

    setSearchQuery(searchText ? [...filteredMovies, ...filteredTvShows] : []);
  };
  const handleTvShowClick = (tvShow) => {
    navigate(`/home/tv/${tvShow._id}`, { state: { tvShow } });
    setSearchQuery("");
    document.querySelector(`.${styles.searchInput}`).value = "";
  };
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.headcontain}>
          <div className={styles.left}>
            <h1>
              <NavLink to="/home">
                Cine<span>Flix</span>
              </NavLink>
            </h1>
          </div>
          <nav>
            <ul>
              <li>
                <NavLink to="/home/films" className={styles.fl}>
                  Films
                </NavLink>
                <NavLink to="/home/lists" className={styles.lis}>
                  Lists
                </NavLink>
                <NavLink to="/home/watchlist">
                  Watchlist <sup>{wishlist?.items.length}</sup>
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className={styles.search}>
            <input
              type="text"
              placeholder="Search..."
              className={styles.searchInput}
              onChange={(e) => handleChange(e.target.value)}
            />
            <div className={styles.results}>
              {searchquery.length > 0 &&
                searchquery.map((item) => (
                  <div
                    key={item._id}
                    className={styles.result}
                    onClick={() => handleTvShowClick(item)}
                  >
                    <img src={item.poster} alt={item.title} />
                    <span>{item.title}</span>
                    {/* Film mi TV mi olduğunu gösterir */}
                  </div>
                ))}
            </div>
            <div className={styles.languageSelect}>
              <select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className={styles.languageDropdown}
              >
                <option value="EN">English</option>
                <option value="TR">Türkçe</option>
              </select>
            </div>
          </div>
        </div>
        <div className={styles.headcenter}>
          <h1>Unlimited movies, TV shows, and more </h1>
          <p>Starts at EUR 7.99. Cancel anytime.</p>
        </div>
      </div>
    </header>
  );
};

export default Header;

import React, { useState } from "react";
import styles from "./index.module.scss";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("EN");

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
    // Burada dil değiştirme işlemini gerçekleştirebilirsiniz
    console.log(`Language changed to: ${e.target.value}`);
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
                <NavLink to="/films">Films</NavLink>
                <NavLink to="/lists">Lists</NavLink>
                <NavLink to="/watchlist">Watchlist</NavLink>
              </li>
            </ul>
          </nav>
          <div className={styles.search}>
            <input
              type="text"
              placeholder="Search..."
              className={styles.searchInput}
            />
            <div className={styles.languageSelect}>
              <select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className={styles.languageDropdown}
              >
                <option value="EN">English</option>
                <option value="TR">Türkçe</option>
                {/* Diğer diller buraya eklenebilir */}
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

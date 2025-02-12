import React from 'react'
import styles from "./index.module.scss"
import { NavLink } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer>
      <div className={styles.footcontainer}>
        <div className={styles.head}>
          <div className={styles.about}>
            <nav>
              <ul>
                <li>
                  <NavLink to="/about">About</NavLink>
                </li>
                <li>
                  <NavLink to="/contact">Contact</NavLink>
                </li>
                <li>
                  <NavLink to="/news">News</NavLink>
                </li>
              </ul>
            </nav>
          </div>
          <div className={styles.connection}>
            <a href="https://www.instagram.com/emin_eminov13/">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100078908221112">
              <FaFacebook />
            </a>
            <a href="https://x.com/eminovemin199">
              <FaSquareXTwitter />
            </a>
          </div>
        </div>
        <div className={styles.foot}>
          <p>
            © CineFLix Limited. Made by fans in Aotearoa New Zealand. Film
            data from TMDb. Mobile site.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer

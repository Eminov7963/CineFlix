import React from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.scss"; // SCSS modülünü import ettik.

const NotFound = () => {
  return (
    <div className={styles["not-found-container"]}>
      <h1 className={styles["not-found-title"]}>404</h1>
      <p className={styles["not-found-message"]}>Page Not Found</p>
      <p className={styles["not-found-description"]}>
        The page you're looking for doesn't exist or has been removed.
      </p>
      <Link to="/" className={styles["back-home-link"]}>
        Back to Login
      </Link>
    </div>
  );
};

export default NotFound;

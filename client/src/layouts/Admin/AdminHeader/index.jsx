import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./index.module.scss"; // SCSS modülünü içe aktarıyoruz

const AdminHeader = () => {
  return (
    <header className={styles.adminHeader}>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsozWly-aZ7Nf9dQ86q6-FR8ZEAe1ThV2t9DaF1DUnjbndKkI-HA-tKTZyFBXUUhUWJv0&usqp=CAU"
        alt="Admin Logo"
      />
      <ul>
        <li>
          <NavLink to="/admin">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/admin/movies">Movies</NavLink>
        </li>
        <li>
          <NavLink to="/admin/add">Add</NavLink>
        </li>
        <li>
          <NavLink to="/admin/users">Users</NavLink>
        </li>
      </ul>
    </header>
  );
};

export default AdminHeader;

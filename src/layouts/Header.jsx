import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/user";

function Header() {
  const { isLoading, data, error } = useQuery(["profile"], getProfile);
  return (
    <header className={styles.header}>
      <div>
        <Link to="/">
          <img src="divar.svg" className={styles.logo} />
        </Link>
        <span>
          <img src="location.svg" />
          <p>قم</p>
        </span>
      </div>
      <div>
        <Link to="/auth">
          <span>
            <img src="profile.svg" />
            <p>دیوار من</p>
          </span>
        </Link>
        <Link to="/dashboard" className={styles.button}>
          ثبت آگهی
        </Link>
        {data && data.data.role === "ADMIN" ? (
          <Link to="/admin" className={styles.button}>
            ادمین پنل
          </Link>
        ) : (
          <div />
        )}
      </div>
    </header>
  );
}

export default Header;

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { sp } from "../../utils/numbers";
import styles from "./Main.module.css";

function Main({ posts }) {
  console.log(posts);
  const baseURL = import.meta.env.VITE_BASE_URL;
  return (
    <div className={styles.container}>
      {posts.data.posts.map((i) => (
        <div key={i._id} className={styles.card}>
          <div className={styles.info}>
            <p>{i.options.title}</p>
            <div>
              <p>{sp(i.amount)}</p>
              <span>{i.options.city}</span>
            </div>
          </div>
          <img src={`${baseURL}${i.images[0]}`} />
        </div>
      ))}
    </div>
  );
}

export default Main;

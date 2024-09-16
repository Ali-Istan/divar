import { useQueries, useQuery } from "@tanstack/react-query";
import React from "react";
import { getCategory } from "../../services/admin";
import styles from "./SideBar.module.css";

function SideBar({ category }) {
  //   console.log(data);

  return (
    <div className={styles.sidebar}>
      <h3>دسته بندی ها</h3>
      <ul>
        {category.data.map((i) => (
          <li key={i._id}>
            <img src={`${i.icon}.svg`}></img>
            <p>{i.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;

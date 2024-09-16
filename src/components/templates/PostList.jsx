import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getPosts } from "../../services/user";
import Loader from "../modules/Loader";
import { sp } from "../../utils/numbers";
import styles from "./PostList.module.css";

function PostList() {
  const { data, isLoading } = useQuery(["my-post-list"], getPosts);
  console.log(data);
  const BaseURL = import.meta.env.VITE_BASE_URL;
  return (
    <div className={styles.list}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h3>آگهی های شما</h3>
          {data.data.posts.map((i) => (
            <div key={i._id} className={styles.post}>
              <img src={`${BaseURL}${i.images[0]}`} />
              <div>
                <p>{i.options.title}</p>
                <span>{i.options.content}</span>
              </div>
              <div className={styles.price}>
                <p>{new Date(i.createdAt).toLocaleDateString("fa-ir")}</p>
                <span>{sp(i.amount)} تومان </span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default PostList;

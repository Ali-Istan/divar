import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { deleteCategory, getCategory } from "../../services/admin";
import Loader from "../modules/Loader";
import styles from "./CategoryList.module.css";
import toast from "react-hot-toast";
function CategoryList() {
  const { isLoading, error, data } = useQuery(["get-categories"], getCategory);
  console.log({ isLoading, error, data });

  const queryclinet = useQueryClient();

  const DeleteHandler = (id) => {
    deleteCategory(id).then((res) => {
      console.log(res);
      if (res.status === 200) {
        toast.success("دسته بندی با موفقیت حذف شد");
      }
      queryclinet.invalidateQueries(["get-categories"]);
    });
  };
  return (
    <div className={styles.list}>
      {isLoading ? (
        <Loader />
      ) : (
        data.data.map((i) => (
          <div key={i._id}>
            <img src={`${i.icon}.svg`} />
            <h5>{i.name}</h5>
            <p>slug : {i.slug}</p>
            <button onClick={() => DeleteHandler(i._id)}>حذف</button>
          </div>
        ))
      )}
    </div>
  );
}

export default CategoryList;

import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getCategory } from "../../services/admin";
import styles from "./AddPost.module.css";
import { getCookie } from "../../utils/cookies";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function AddPost() {
  const { data } = useQuery(["get-categories"], getCategory);
  console.log({ data });

  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    city: "",
    amount: null,
    images: null,
  });

  const changeHandler = (e) => {
    const name = e.target.name;
    if (name !== "image") {
      setForm({ ...form, [name]: e.target.value });
    } else {
      setForm({ ...form, [name]: e.target.files[0] });
    }
  };

  const addHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i in form) {
      formData.append(i, form[i]);
    }
    const token = getCookie("accessToken");
    console.log(formData);

    axios
      .post(`${import.meta.env.VITE_BASE_URL}/post/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error("آگهی افزودن نشد");
      });
  };

  return (
    <form onChange={changeHandler} className={styles.form}>
      <h3>افزودن آگهی</h3>
      <label htmlFor="title">عنوان</label>
      <input type="text" name="title" id="title" />
      <label htmlFor="content">توضیحات</label>
      <textarea name="content" id="content" rows="10" />
      <label htmlFor="amount">قیمت</label>
      <input type="number" name="amount" id="amount" />
      <label htmlFor="city">شهر</label>
      <input type="text" name="city" id="city" />

      <label htmlFor="category">دسته بندی</label>
      <select name="category" id="category">
        {data?.data.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>
      <label htmlFor="images">عکس</label>
      <input type="file" name="images" id="images" />
      <button onClick={addHandler}>افزودن آگهی</button>
    </form>
  );
}

export default AddPost;

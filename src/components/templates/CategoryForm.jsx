import React, { useState } from "react";
import styles from "./CategoryForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCategory } from "../../services/admin";

function CategoryForm() {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    icon: "",
  });
  const { mutate, isLoading, error, data } = useMutation(addCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries(["get-categories"]);
    },
  });
  console.log({ isLoading, mutate });

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sumbmitHandler = (e) => {
    e.preventDefault();
    if (!form.name || !form.slug || !form.icon) return;
    mutate(form);
  };

  return (
    <form
      onChange={changeHandler}
      onSubmit={sumbmitHandler}
      className={styles.form}
    >
      <h3>دسته بندی جدید</h3>
      {data?.status === 201 && <p>دسته بندی با موفقیت ایجاد شد</p>}
      {!!error && <p>{error.message}</p>}
      <label htmlFor="name">اسم دسته بندی</label>
      <input type="text" id="name" name="name" />
      <label htmlFor="slug">اسلاگ</label>
      <input type="text" id="slug" name="slug" />
      <label htmlFor="icon">آیکون</label>
      <input type="text" id="icon" name="icon" />
      <button type="submit" disabled={isLoading}>
        ایجاد
      </button>
    </form>
  );
}

export default CategoryForm;

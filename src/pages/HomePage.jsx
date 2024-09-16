import React from "react";
import Main from "../components/templates/Main";
import SideBar from "../components/templates/SideBar";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../services/user";
import Loader from "../components/modules/Loader";
import { getCategory } from "../services/admin";

function HomePage() {
  const { data: posts, isLoading: LoadingPosts } = useQuery(
    ["post-list"],
    getAllPosts
  );
  const { data: category, isLoading: LoadingCategory } = useQuery(
    ["get-categories"],
    getCategory
  );
  return (
    <>
      {LoadingPosts || LoadingCategory ? (
        <Loader />
      ) : (
        <div style={{ display: "flex" }}>
          <SideBar category={category} />
          <Main posts={posts} />
        </div>
      )}
    </>
  );
}

export default HomePage;

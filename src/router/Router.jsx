import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import DashboardPage from "../pages/DashboardPage";
import AuthPage from "../pages/AuthPage";
import AdminPage from "../pages/AdminPage";
import NotFoundPage from "../pages/404";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/user";
import Loader from "../components/modules/Loader";

function Router() {
  const { isLoading, data, error } = useQuery(["profile"], getProfile);
  console.log({ isLoading, data, error });
  if (isLoading) return <Loader />;
  return (
    <Routes>
      {/* <Route index element={<HomePage />} /> */}
      <Route path="/" element={<HomePage />} />
      <Route
        path="/dashboard"
        element={data ? <DashboardPage /> : <Navigate to="/auth" />}
      />
      <Route
        path="/auth"
        element={data ? <Navigate to="/dashboard" /> : <AuthPage />}
      />
      <Route
        path="/admin"
        element={
          data && data.data.role === "ADMIN" ? (
            <AdminPage />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Router;

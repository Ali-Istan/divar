import React from "react";
import { checkOTP } from "../../services/auth";
import { setCookies } from "../../utils/cookies";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../services/user";
import styles from "./CheckOtpForm.module.css";

function CheckOtpForm({ setStep, setCode, code, mobile }) {
  const navigate = useNavigate();
  const { refetch } = useQuery(["profile"], getProfile);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (code.length !== 5) return;
    const { response, error } = await checkOTP(code, mobile);
    if (response) {
      setCookies(response.data);
      console.log(response);
      navigate("/");
      refetch();
    }
    if (error) console.log(error.response.data.message);
  };
  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <p>تایید کد پیامک شده</p>
      <span> کد تایید پیامک شده به شماره{mobile} را وارد کنید</span>
      <label htmlFor="input"> کد تایید پیامک شده </label>
      <input
        type="text"
        id="input"
        placeholder="کد تایید"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button type="submit">ورود</button>
      <button className={styles.backButton} onClick={() => setStep(1)}>
        تغییر شماره موبایل
      </button>
    </form>
  );
}

export default CheckOtpForm;

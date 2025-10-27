import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
// import {} from

import "../AuthStyles/ForgotPasswordPage.css";
import "../MediaQuery/forgotPasswordMedia.css";
import { authContext } from "../Context/userContext";

const ForgotPasswordPage = () => {
  const { forgotPasswordEmail, sendUserOtp } = useContext(authContext);

  //   useEffect(() => {
  //     alert("");
  //   }, []);

  const { register, handleSubmit } = useForm({});

  const handleSend = async (data) => {
    try {
      await forgotPasswordEmail(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <div className="passwordReset">
        <h1>Reset Password Page</h1>
        <p>
          Enter your email address and we'll send you an OTP to reset your
          password
        </p>
        <form onSubmit={handleSubmit(handleSend)} className="userEmail">
          <label htmlFor="">Email</label>
          <div className="inputConts">
            <div className="icon">
              <i className="fa fa-envelope"></i>
            </div>
            <div className="inputGroup">
              <input
                type="email"
                placeholder="Enter Your Email"
                required
                className="formInputs"
                {...register("userEmail")}
              />
            </div>
          </div>
          <button type="submit">
            {sendUserOtp ? (
              <div>
                Sending Code{" "}
                <span
                  className="spinner-border spinner-border-sm me-2 "
                  role="status"
                >
                  <span className="visually-hidden">Creating...</span>
                </span>
              </div>
            ) : (
              "Send Code"
            )}
          </button>
        </form>

        <p>We'll send an OTP(One-Time Password) to this email address</p>

        <div className="loginBack">
          <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
          <a href="/user/signin">Back To login</a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

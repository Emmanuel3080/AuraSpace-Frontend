import React, { useContext } from "react";
import { adminAuthContext } from "../Context/adminAuthContext";
import { useForm } from "react-hook-form";

const AdminForgotPasswordpage = () => {
  const { handlePasswordReset, sendOtp } = useContext(adminAuthContext);

  const { register, handleSubmit } = useForm({});

  const handleSend = async (data) => {
    try {
      await handlePasswordReset(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="container">
        <div className="passwordReset">
          <h1>Reset Password Page</h1>
          <p>
            Enter your email address and we'll send you an OTP to reset your
            password
          </p>
          <form className="userEmail" onSubmit={handleSubmit(handleSend)}>
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
                  {...register("userEmail")}
                  className="formInputs"
                />
              </div>
            </div>
            <button type="submit">
              {sendOtp ? (
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
            <a href="/admin/signin">Back To login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminForgotPasswordpage;

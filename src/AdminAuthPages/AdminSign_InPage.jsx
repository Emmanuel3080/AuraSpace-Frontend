import React, { useContext } from "react";
import { useState } from "react";

import "../AdminAuthStyles/AdminSignIn.css";
import "../MediaQuery/signInMedia.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { authContext } from "../Context/userContext";
import { adminAuthContext } from "../Context/adminAuthContext";

const adminSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password Required")
    .min(6, "Password must be minimum of Six Characters")
    .matches(/[a-z]/, "Password must contain lowercase Letter"),
});
const AdminSign_InPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { adminSignIn, submitAdminLogin } = useContext(adminAuthContext);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(adminSchema),
  });

  const handleError = (err) => {
    const firstErr = Object.values(err)[0].message;
    toast.error(firstErr);
  };

  const handleSignIn = async (data) => {
    try {
      await adminSignIn(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="signInPage">
      <div className="signinContainer">
        <form
          className="form"
          onSubmit={handleSubmit(handleSignIn, handleError)}
        >
          <h1 className="formHeads">Hi, Welcome Back!</h1>

          <div className="inputGroup">
            <label>Email Address</label>
            <div className="inputCont">
              <div className="icon">
                <i className="fa fa-envelope"></i>
              </div>
              <div className="inputGroup">
                <input
                  type="email"
                  className="formInputs"
                  placeholder="Your Email Address"
                  {...register("email")}
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="">Password</label>
            <div className="inputCont">
              <div className="icon">
                <i className="fa fa-lock"></i>
              </div>
              <div className="inputGroup">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="*****"
                  className="formInputs"
                  {...register("password")}
                />{" "}
              </div>
              <span onClick={togglePasswordVisibility}>
                {isPasswordVisible ? (
                  <div className="icon">
                    <i className="fa fa-eye"></i>
                  </div>
                ) : (
                  <div className="icon">
                    <i className="fa fa-eye-slash" aria-hidden="true"></i>
                  </div>
                )}
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              // paddingTop: "10px",
            }}
          >
            <a href="/admin/forgot/password" className="forgotPasswordText">
              Forgot Password?
            </a>
          </div>

          <div>
            <button
              className="btnSubmits"
              disabled={submitAdminLogin}
              type="submit"
            >
              {submitAdminLogin ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                  }}
                >
                  Authenticating User{" "}
                  <span
                    className="spinner-border spinner-border-sm me-2 "
                    role="status"
                  >
                    <span className="visually-hidden">Creating...</span>
                  </span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "5px",
            }}
          >
            <p className="acountNone">
              Don't have an Account?
              <span>
                {" "}
                <a href="/admin/signup" className="signText">
                  Create Account
                </a>{" "}
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSign_InPage;

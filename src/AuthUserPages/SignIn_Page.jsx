import React from "react";

import "../AuthStyles/Signin.css";
import "../MediaQuery/signInMedia.css";

import { useState } from "react";
import { useContext } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { authContext } from "../Context/userContext";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const userSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password Required")
    .min(6, "Minimum of  Six Characters")
    .matches(/[a-z]/, "Password must contain lowercase Letter"),
});

const SignIn_Page = () => {
  const [userPassword, setUserPassword] = useState(false);

  const { handleSignIn, submitUserLogin } = useContext(authContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const handelError = (err) => {
    const firstErr = Object.values(err)[0].message;
    toast.error(firstErr);
  };

  const handleUserData = async (data) => {
    try {
      await handleSignIn(data);
    } catch (error) {
      console.log(error);
    }
  };

  const togglePassword = () => {
    setUserPassword(!userPassword);
  };
  return (
    <div className="signInPage">
      <div className="signinContainer">
        <form
          className="forms"
          onSubmit={handleSubmit(handleUserData, handelError)}
        >
          <h1 className="greetSignIn">Hi, Welcome Back!</h1>

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
                  type={userPassword ? "text" : "password"}
                  placeholder="*****"
                  className="formInputs"
                  {...register("password")}
                />{" "}
              </div>
              <span className="password-toggle" onClick={togglePassword}>
                {userPassword ? (
                  <i className="fa fa-eye" aria-hidden="true"></i>
                ) : (
                  <i className="fa fa-eye-slash" aria-hidden="true"></i>
                )}
                {/* <i class="fa fa-eye" aria-hidden="true"></i> */}
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button type="submit" className="btnSubmit  ">
              {submitUserLogin ? (
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
              justifyContent: "flex-end",
              paddingTop: "10px",
            }}
          >
            <a href="/forgot/password" className="forgotPasswordTexts">
              Forgot Password?
            </a>
          </div>
          {/* <div className="orDivider">
            <span></span>
            <p>or</p>
            <span></span>
          </div> */}

          {/* <div>
            <button type="button" className="googleBtn">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
              />
              Sign up with Google
            </button>
          </div> */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // marginTop: "4px",
            }}
          >
            <p className="acountNone">
              Don't have an Account?
              <span>
                {" "}
                <a href="/user/signup" className="signText">
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

export default SignIn_Page;

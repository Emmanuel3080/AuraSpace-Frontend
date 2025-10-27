import React, { use, useContext, useEffect } from "react";
import { authContext } from "../Context/userContext";
import "../AuthStyles/SignUp.css";
import "../MediaQuery/SignupMedia.css";
import { useState } from "react";
import { set } from "react-hook-form";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// import {boo} from "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css";

const userSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password Required")
    .min(6, "Minimum of be Six Characters")
    .matches(/[a-z]/, "Password must contain lowercase Letter"),
});

const SignUp_Page = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { show, handleSignUp, submitting } = useContext(authContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const checkErrors = (err) => {
    console.log(errors);

    const firstError = Object.values(err)[0].message;
    toast.error(firstError);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <section className="signUpPage">
      <div className="signUpForm">
        <form
          className="formContainer"
          onSubmit={handleSubmit(handleSignUp, checkErrors)}
        >
          <h1 style={{ textAlign: "center" }} className="formSignUpTitle">
            Register Account
          </h1>
          {/* <h1 className="text-3xl text-red-400"> Emamnuekekek</h1> */}
          <div>
            <label htmlFor="">Name</label>
            <div className="inputCont">
              <div className="icon">
                <i className="fa fa-user"></i>
              </div>
              <div className="inputGroup">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="formInputs"
                  {...register("name")}
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="">Email Address</label>
            <div className="inputCont">
              <div className="icon">
                <i className="fa fa-envelope"></i>
              </div>
              <div className="inputGroup">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="formInputs"
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
                />
              </div>{" "}
              <span className="pass-toggle" onClick={togglePasswordVisibility}>
                {isPasswordVisible ? (
                  <div className="icon">
                    <i className="fa fa-eye" aria-hidden="true"></i>
                  </div>
                ) : (
                  <div className="icon">
                    <i className="fa fa-eye-slash" aria-hidden="true"></i>
                  </div>
                )}
                {/* <i class="fa fa-eye" aria-hidden="true"></i> */}
              </span>
              {/* </div> */}
              {/* </div> */}
            </div>
          </div>
          <div className="" style={{ marginBottom: "10px" }}>
            <label htmlFor="">Upload Profile Picture</label>
            <div className="inputCont">
              <div className="icon">
                <i className="fa fa-upload"></i>
              </div>
              <div className="inputGroup">
                <input
                  type="file"
                  className="formInputs"
                  {...register("profileImage")}
                />
              </div>
            </div>
            {/* <label htmlFor="fileUpload" className="custom-file-upload">
              Upload Profile Picture
            </label> */}
          </div>

          <div>
            <button type="submit" className="btnSubmit" disabled={submitting}>
              {submitting ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                  }}
                >
                  Creating Account{" "}
                  <span
                    className="spinner-border spinner-border-sm me-2 "
                    role="status"
                  >
                    <span className="visually-hidden">Creating...</span>
                  </span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </div>

          <div className="orDivider">
            <span></span>
            <p>or</p>
            <span></span>
          </div>

          <div>
            <button type="button" className="googleBtn">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
              />
              Sign up with Google
            </button>
          </div>

          <div className="signInTextContainer">
            <p className="signInText">
              Already have an account ?{" "}
              <a href="/user/signin" className="signInLink">
                Sign In
              </a>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUp_Page;

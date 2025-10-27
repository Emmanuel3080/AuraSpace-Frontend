import React, { useContext, useEffect, useState } from "react";

import "../AdminAuthStyles/AdminSignup.css";
import "../MediaQuery/AdminSignUpMedia.css";
import { adminAuthContext } from "../Context/adminAuthContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const formSchema = yup.object({
  OrganizerName: yup.string().required("Name field is Required"),
  email: yup
    .string()
    .email("Invalid Email")
    .required("Email field Is Required"),
  PhoneNumber: yup.string().required("Contact field Is Required"),
  password: yup
    .string()
    .required("Password Required")
    .min(6, "Password must be minimum of Six Characters")
    .matches(/[a-z]/, "Password must contain lowercase Letter"),
  bankAccount: yup.string().required("Bank Account Field is required"),
  accountNumber: yup.string().required("Account Number field is required "),
});
const AdminSignUpPage = () => {
  const { adminSignUp, submitting } = useContext(adminAuthContext);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [userImgLink, setUserImgLink] = useState(null);

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserImgLink(file.name);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const handleErr = (err) => {
    const firstError = Object.values(err)[0].message;
    toast.error(firstError);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="AdminSignUpPage">
      {/* <h1>Register</h1> */}
      <div className="AdminSignUpForm">
        <form
          className="AdminFormContainer"
          onSubmit={handleSubmit(adminSignUp, handleErr)}
        >
          <h1 className="formHead"> Register Account</h1>

          <div className="secondName">
            <label htmlFor=""> Name</label>
            <div className="inputCont">
              <div className="icon">
                <i className="fa fa-user"></i>
              </div>
              <div className="inputGroup">
                <input
                  type="text"
                  placeholder=" Name"
                  className="formInputs"
                  {...register("OrganizerName")}
                />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor=""> Email</label>
            <div className="inputCont">
              <div className="icon">
                <i className="fa fa-envelope" aria-hidden="true"></i>
              </div>
              <div className="inputGroup">
                <input
                  type="Email"
                  placeholder="Your Email"
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
                <div className="icon">
                  <i className="fa fa-lock" aria-hidden="true"></i>
                </div>
              </div>
              <div className="inputGroup">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="****"
                  className="formInputs"
                  {...register("password")}
                />
              </div>
              <span onClick={togglePasswordVisibility}>
                {isPasswordVisible ? (
                  <div className="icon">
                    <i className="fa fa-eye" aria-hidden="true"></i>
                  </div>
                ) : (
                  <div className="icon">
                    <i className="fa fa-eye-slash" aria-hidden="true"></i>
                  </div>
                )}
              </span>
            </div>
            {/* {errors.password && <p>{errors.password.message}</p>} */}
          </div>
          <div>
            <label htmlFor="">PhoneNumber</label>
            <div className="inputCont">
              <div className="icon">
                <i className="fa fa-phone" aria-hidden="true"></i>
              </div>
              <div className="inputGroup">
                <input
                  type="text"
                  placeholder="+234"
                  className="formInputs"
                  {...register("PhoneNumber")}
                />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="">Accont Number</label>
            <div className="inputCont">
              <div className="icon">
                <i className="fa fa-credit-card" aria-hidden="true"></i>
              </div>
              <div className="inputGroup">
                <input
                  type="text"
                  placeholder="Your Account Number"
                  className="formInputs"
                  {...register("accountNumber")}
                />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="">Bank Account</label>
            <div className="inputCont">
              <div className="icon">
                <i className="fa fa-university" aria-hidden="true"></i>
              </div>
              <div className="inputGroup">
                <select
                  {...register("bankAccount", {
                    required: "Please select a bank",
                  })}
                  className="border p-2 rounded w-full text-black"
                >
                  <option value="">Select a bank</option>
                  <option value="UBA">UBA</option>
                  <option value="First Bank">First Bank</option>
                  <option value="FCMB">FCMB</option>
                  <option value="Opay">Opay</option>
                </select>
                {/* <input
                  type="text"
                  placeholder="(uba)"
                  className="formInputs"
                  {...register("bankAccount")}
                /> */}
              </div>
            </div>
          </div>

          <div className="">
            {/* <label htmlFor="file-upload" class="custom-file-upload">
              Upload Profile Picture
              <i className="fa fa-upload"></i>
            </label> */}
            <label htmlFor="">Your Profile Picture</label>
            <input
              type="file"
              placeholder="Profile Picture"
              {...register("AdminProfileImg")}
              className="formInputs"
            />
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
          <div className="signInTextContainer">
            <p className="signInText">
              Already have an account ?{" "}
              <a href="/admin/signin" className="signInLink">
                Sign In
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSignUpPage;

import React, { useState } from "react";

import "../AuthStyles/ChangePasswordPage.css";
import "../MediaQuery/changePasswordMedia.css";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const baseUrl = import.meta.env.VITE_API_URL;

const passwordSchema = yup.object({
  password: yup
    .string()
    .required("Password Field is required")
    .min(6, "Password must be minimum of Six Characters")
    .matches(/[a-z]/, "Password must contain lowercase Letter"),
});

const ChangePasswordPage = () => {
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");
  const [resetUserPassword, setResetUserPassword] = useState(false);
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });
  console.log(errors);

  const togglePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const handleError = (err) => {
    const firstError = Object.values(err)[0].message;
    toast.error(firstError);
  };

  const changeUserPassword = async (formData) => {
    setResetUserPassword(true);
    try {
      const response = await fetch(
        `${baseUrl}/user/auth/change/password?email=${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.Status == "Success") {
        toast.success("Password Updated Successfully");
        navigate("/user/signin");
      } else {
        toast.error("Error in Updating Password");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setResetUserPassword(false);
    }
  };
  return (
    <div>
      <div className="changePasswordPage">
        <div className="passwordForm">
          <h1 className="passwordTitle">Reset Your Password</h1>
          <h3 className="passwordType">
            Please type something you'll remember
          </h3>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <form
              className="formss"
              onSubmit={handleSubmit(changeUserPassword, handleError)}
            >
              <label htmlFor="">New Password</label>
              <div className="inputCon">
                <div className="icon">
                  <i className="fa fa-lock"></i>
                </div>
                <div className="inputGroup">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="***"
                    className="passwordInputs"
                    {...register("password")}
                  />
                </div>
                <span onClick={togglePassword}>
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
              <div className="resetPassBtn">
                <button
                  type="submit"
                  className="resetBtnLink"
                  disabled={resetUserPassword}
                >
                  {resetUserPassword ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "4px",
                      }}
                    >
                      Reseting Password{" "}
                      <span
                        className="spinner-border spinner-border-sm me-2 "
                        role="status"
                      >
                        <span className="visually-hidden">Reseting...</span>
                      </span>
                    </div>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;

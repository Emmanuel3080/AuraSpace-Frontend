import React, { useState } from "react";

import "../AuthStyles/VerifyOtp.css";
import "../MediaQuery/VerifyPageMedia.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const VerifyOtpPage = () => {
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");
  const [verfifyUserOtp, setVerifying] = useState(false);
  const [generateUserOtp, setGenerateOtp] = useState(false);
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_API_URL;

  const { handleSubmit, register } = useForm({});
  const verifyOtp = async (emailData) => {
    setVerifying(true);
    try {
      const otpCode = Object.values(emailData).join("");
      const response = await fetch(
        `${baseUrl}/user/auth/verify/otp?email=${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp: otpCode }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.Status == "Sucesss") {
        toast.success("OTP iS Valid");
        navigate(`/user/change/password?email=${email}`);
      } else {
        toast.error(data.Message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setVerifying(false);
    }
  };

  const generateNewOtp = async () => {
    setGenerateOtp(true);
    try {
      const response = await fetch(
        `${baseUrl}/user/auth/generate/otp?email=${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.Status == "Success") {
        toast.success("A new OTP Has Been Sent, Kindly Check Your Mail");
        // navigate("")
      }
    } catch (error) {
      console.log(error);
    } finally {
      setGenerateOtp(false);
    }
  };

  return (
    <>
      <div className="otpContainer">
        <h1>Please Check Your Gmail</h1>
        <p>We sent an OTP to {email}</p>
        <form class="otp-inputs" onSubmit={handleSubmit(verifyOtp)}>
          <div className="otp-inp">
            {[...Array(6)].map((_, i) => (
              <>
                <input
                  key={i}
                  type="text"
                  maxLength="1"
                  {...register(`digit${i + 1}`)}
                />
              </>
            ))}
          </div>
          <div style={{ marginTop: "10px" }}>
            <button class="verify-btn" type="submit">
              {verfifyUserOtp ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                  }}
                >
                  Verifying{" "}
                  <span
                    className="spinner-border spinner-border-sm "
                    role="status"
                  >
                    <span className="visually-hidden">Creating...</span>
                  </span>
                </div>
              ) : (
                "Verify OTP"
              )}
            </button>
          </div>
        </form>

        <p class="resend-text">
          Didn’t receive the code?{" "}
          <button
            onClick={generateNewOtp}
            disabled={generateUserOtp}
            className="resendPass"
          >
            {generateUserOtp ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                }}
              >
                Resending{" "}
                <span
                  className="spinner-border spinner-border-sm "
                  role="status"
                >
                  <span className="visually-hidden">Creating...</span>
                </span>
              </div>
            ) : (
              "Resend OTP"
            )}
          </button>
        </p>
      </div>
    </>
  );
};

export default VerifyOtpPage;

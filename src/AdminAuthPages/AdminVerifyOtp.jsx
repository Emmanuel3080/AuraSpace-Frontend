import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AdminVerifyOtp = () => {
  const [verifyUserOtp, setVerifying] = useState(false);
  const [generateUserOtp, setGenerateUserOtp] = useState(false);
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");

  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_API_URL;

  const { register, handleSubmit } = useForm({});
  const verifyOtp = async (emailData) => {
    setVerifying(true);
    try {
      const otpCode = Object.values(emailData).join("");
      const reponse = await fetch(
        `${baseUrl}/admin/verify/otp?email=${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp: otpCode }),
        }
      );
      const data = await reponse.json();
      console.log(data);
      if (data.Status == "Sucesss") {
        toast.success("Valid OTP");
        navigate(`/admin/change/password?email=${email}`);
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
    setGenerateUserOtp(true);
    try {
      const response = await fetch(
        `${baseUrl}/admin/generate/new/otp?email=${email}`,
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
      setGenerateUserOtp(false);
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
            <button class="verify-btn" type="submit" disabled={verifyUserOtp}>
              {verifyUserOtp ? (
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
            className="resendPass"
            onClick={generateNewOtp}
            disabled={generateUserOtp}
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
              "Resend Code"
            )}
          </button>
        </p>
      </div>
    </>
  );
};

export default AdminVerifyOtp;

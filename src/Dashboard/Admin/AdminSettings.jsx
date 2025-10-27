import React, { use, useContext, useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { adminAuthContext } from "../../Context/adminAuthContext";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { toast } from "sonner";
import { yupResolver } from "@hookform/resolvers/yup";

// const accountSchema =  yup.object({

// })

const AdminSettings = () => {
  const { userInfo } = useContext(adminAuthContext);

  const [updateInfo, setUpdatingInfo] = useState(false);

  const baseUrl = import.meta.env.VITE_API_URL;

  const { register, handleSubmit, reset } = useForm({});
  useEffect(() => {
    if (userInfo) {
      reset({
        OrganizerName: userInfo.OrganizerName,
        email: userInfo.email,
        accountNumber: userInfo.accountNumber,
        bankAccount: userInfo.bankAccount,
      });
    }
  }, [reset, userInfo]);
  console.log(userInfo);
  

  const updateAdminInfo = async (formData) => {
    setUpdatingInfo(true);
    try {
      const response = await fetch(
        `${baseUrl}/admin/update/admin/${userInfo._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("AdminAccessToken")}`,
          },

          body: JSON.stringify(formData),
        }
      );
      
      const data = await response.json();   
      console.log(data);
      if (data.Status == "Success") {
          toast.success("Updated Succesfully");
        } else {
            toast.error("Update Failed");
        }
    } catch (error) {
        console.log(error);
    } finally {
        setUpdatingInfo(false);
    }
    console.log(formData);
  };
  return (
    <div>
      {/* {userInfo.email} */}
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 text-gray-900">
        <AdminLayout
          navlink={
            <a href="/dashboard" className="no-underline text-black">
              Dashboard
            </a>
          }
        />

        <div className=" w-full max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Update Admin Details
          </h2>
          <form
            className="flex flex-col  gap-4"
            onSubmit={handleSubmit(updateAdminInfo)}
          >
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                {...register("OrganizerName")}
                className="w-full border p-2 rounded mt-1"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                {...register("email")}
                className="w-full border p-2 rounded mt-1"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-gray-700">Account Number</label>
              <input
                type="text"
                {...register("accountNumber")}
                className="w-full border p-2 rounded mt-1"
                placeholder="Enter account number"
              />
            </div>

            {/* Bank Account */}
            <div>
              <label className="block text-gray-700">Bank</label>
              <select
                {...register("bankAccount")}
                className="w-full border p-2 rounded mt-1"
              >
                <option value="">Select a bank</option>
                <option value="UBA">UBA</option>
                <option value="First Bank">First Bank</option>
                <option value="FCMB">FCMB</option>
                <option value="Opay">Opay</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
              >
                {updateInfo ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "4px",
                    }}
                  >
                    Updating{" "}
                    <span
                      className="spinner-border spinner-border-sm me-2 "
                      role="status"
                    >
                      <span className="visually-hidden">Creating...</span>
                    </span>
                  </div>
                ) : (
                  "Update Information"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;

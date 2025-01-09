import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router';
import axios from "axios";

function Register() {
  const navigate = useNavigate()
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const onSubmit = () => {
    register();
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(
        {
          userName: "",
          email: "",
          address: "",
          mobile: "",
          identity: "",
          password: "",
          avatar: "",
        }
      ),
      navigate("/login")
    }
  }, [isSubmitSuccessful]);

  return (
    <div className="  justify-center items-center top-0 rounded-xl">
      <div className="">
        <h1 className="text-xl font-bold text-white bg-indigo-900 p-5 mb-1 rounded-b-xl">
          Registration Form
        </h1>
      </div>
      <div className=" flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center bg-zinc-600 gap-4 px-10 py-5 rounded-xl"
        >
          <input
            className="px-3 py-2 text-lg rounded-lg focus:outline-none"
            type="text"
            placeholder="Name"
            {...register("userName", {
              required: { value: true, message: "Enter Name" },
              minLength: { value: 4, message: "Min Length is 4" },
              maxLength: { value: 15, message: "Min Length is 15" },
            })}
          />
          {errors.userName && (
            <div className="text-indigo-100 font-bold ">
              {errors.userName.message}
            </div>
          )}

          <input
            className="px-3 py-2 text-lg rounded-lg focus:outline-none"
            type="email"
            placeholder="Email"
            {...register("email", {
              required: { value: true, message: "Enter Email" },
            })}
          />
          {errors.email && (
            <div className="text-indigo-100 font-bold">
              {errors.email.message}
            </div>
          )}

          <input
            className="px-3 py-2 text-lg rounded-lg focus:outline-none"
            type="text"
            placeholder="Address"
            {...register("address", {
              required: { value: true, message: "Enter address" },
            })}
          />
          {errors.address && (
            <div className="text-indigo-100 font-bold">
              {errors.address.message}
            </div>
          )}

          <input
            className="px-3 py-2 text-lg rounded-lg focus:outline-none"
            type="text"
            placeholder="Mobile"
            {...register("mobile", {
              required: { value: true, message: "Enter mobile" },
            })}
          />
          {errors.mobile && (
            <div className="text-indigo-100 font-bold">
              {errors.mobile.message}
            </div>
          )}

          <input
            className="px-3 py-2 text-lg rounded-lg focus:outline-none"
            type="text"
            placeholder="Identity"
            {...register("identity", {
              required: { value: true, message: "Enter identity" },
            })}
          />
          {errors.identity && (
            <div className="text-indigo-100 font-bold">
              {errors.identity.message}
            </div>
          )}

          <input
            className="px-3 py-2 text-lg rounded-lg focus:outline-none"
            type="text"
            placeholder="Password"
            {...register("password", {
              required: { value: true, message: "Enter password" },
            })}
          />
          {errors.password && (
            <div className="text-indigo-100 font-bold">
              {errors.password.message}
            </div>
          )}

          <input
            className="text-indigo-100 font-bold"
            type="file"
            {...register("avatar", { required: "avatar is required" })}
          />

          <input
            className="bg-indigo-900 p-2 w-1/2 rounded-lg text-white cursor-pointer hover:bg-indigo-800"
            type="submit"
            value="Register"
          />
        </form>
      </div>
    </div>
  );
}

export default Register;

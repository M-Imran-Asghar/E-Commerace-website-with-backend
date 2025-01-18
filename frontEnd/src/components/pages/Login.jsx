import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
// import { useAuth } from "../store/AuthContext";
import { useNavigate } from 'react-router';

function Login() {
  // const { isLoggedIn, login } = useAuth();
  const navigate = useNavigate()
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const onSubmit =async (data) => {
    // await login(data)
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        userName: "",
        email: "",
        password: "",
      }),
      navigate("/")

    }
  }, [isSubmitSuccessful]);

  return (
    <div className="  justify-center items-center top-0 rounded-xl">
      <h1 className="text-xl font-bold text-white bg-indigo-900 p-5 mb-2 rounded-b-xl">
        Registration Form
      </h1>
      <div className=" flex items-center justify-center ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center bg-zinc-600 py-7 px-10 rounded-lg  gap-4"
        >
          <input
            className="px-3 py-2 text-lg rounded-lg focus:outline-none"
            type="text"
            placeholder="Name"
            {...register("userName", {
              required: { value: true, message: "enter name" },
            })}
          />
          {errors.userName && (
            <div className="text-indigo-100 font-bold ">
              {errors.userName.message}
            </div>
          )}
          <input
            className="px-3 py-2 text-lg rounded-lg focus:outline-none"
            type="text"
            placeholder="email"
            {...register("email", {
              required: { value: true, message: "enter name" },
            })}
          />
          {errors.email && (
            <div className="text-indigo-100 font-bold ">
              {errors.email.message}
            </div>
          )}
          <input
            className="px-3 py-2 text-lg rounded-lg focus:outline-none"
            type="text"
            placeholder="password"
            {...register("password", {
              required: { value: true, message: "enter name" },
            })}
          />
          {errors.password && (
            <div className="text-indigo-100 font-bold ">
              {errors.password.message}
            </div>
          )}
          <input
            className="bg-indigo-900 p-2 w-1/2 rounded-lg text-white cursor-pointer hover:bg-indigo-800"
            type="submit"
            value="Login"
          />
        </form>
      </div>
    </div>
  );
}

export default Login;

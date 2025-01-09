import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useAuth } from "../store/AuthContext";

function createStore() {

  const { createStore } = useAuth()
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const onSubmit = async (data) => {
    createStore(data)
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        storeName: "",
      });
      alert("Store Added Successefully");
    }
  }, [isSubmitSuccessful]);

  return (
    <div className="flex flex-col justify-center items-center ">
      <h1 className="text-xl font-bold text-white bg-indigo-900 p-5 mb-1 rounded-b-xl w-full">
        Create Your Store
      </h1>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-zinc-600 flex flex-col gap-6 px-10 py-5 rounded-lg"
        >
          <input
            className="px-3 py-2 text-lg rounded-lg focus:outline-none"
            type="text"
            placeholder="Store Name"
            {...register("storeName", {
              required: { value: true, message: "Enter Store Name" },
            })}
          />
          {errors.storeName && (
            <div className="text-indigo-100 font-bold ">
              {errors.storeName.message}
            </div>
          )}
          
          <input
            className="px-3 py-2 text-lg rounded-lg focus:outline-none"
            type="file"
            {...register("storeImage", {
              required: { value: true, message: "upload Image" },
            })}
          />

          <input
            className="p-3 text-lg rounded-lg bg-indigo-900 text-white hover:bg-indigo-600"
            type="submit"
            value="Create Store"
          />
        </form>
      </div>
    </div>
  );
}

export default createStore;

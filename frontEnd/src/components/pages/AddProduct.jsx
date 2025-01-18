import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
// import { useAuth } from "../store/AuthContext";

function AddProduct() {

  // const { Addproducts } = useAuth()
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const onSubmit = async (data) => {
    Addproducts(data)
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        productName: "",
        discription: "",
        productPrice: "",
        productImages: "",
      });
      
    }
  }, [isSubmitSuccessful]);

  return (
    <div className="flex flex-col justify-center items-center ">
      <h1 className="text-xl font-bold text-white bg-indigo-900 p-5 mb-1 rounded-b-xl w-full">
        Add Your Products
      </h1>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-zinc-600 flex flex-col gap-6 px-10 py-5 rounded-lg"
        >
          <input
            className="px-3 py-2 text-lg rounded-lg focus:outline-none"
            type="text"
            placeholder="Product Name"
            {...register("productName", {
              required: { value: true, message: "Enter Product name" },
            })}
          />
          {errors.productName && (
            <div className="text-indigo-100 font-bold ">
              {errors.productName.message}
            </div>
          )}
          <input
            className="px-3 py-2 text-lg rounded-lg focus:outline-none"
            type="text"
            placeholder="Discription"
            {...register("discription", {
              required: { value: true, message: "Enter Discription" },
            })}
          />
          <input
            className="px-3 py-2 text-lg rounded-lg focus:outline-none"
            type="number"
            placeholder="Product Price"
            {...register("productPrice", {
              required: { value: true, message: "Enter Product Price" },
            })}
          />
          <input
            className="px-3 py-2 text-lg rounded-lg focus:outline-none"
            type="file"
            {...register("productImages", {
              required: { value: true, message: "upload Image" },
            })}
          />

          <input
            className="p-3 text-lg rounded-lg bg-indigo-900 text-white hover:bg-indigo-600"
            type="submit"
            value="Add Product"
          />
        </form>
      </div>
    </div>
  );
}

export default AddProduct;

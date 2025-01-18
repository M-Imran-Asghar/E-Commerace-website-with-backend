import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getProductsData } from "../store/GetProductsSlice.jsx";

function MainSection() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsData());
  }, []);
  const products = useSelector((state) => state.productReducer.list);
  const isLoading = useSelector((state) => state.productReducer.loading);
  const error = useSelector((state) => state.productReducer.error);

  return isLoading ? (
    <h1 className="text-lg font-bold text-center">Loading...</h1>
  ) : error ? (
    <h1 className="text-lg font-bold text-center">Something Went Wrong!!!</h1>
  ) : (
    <div className=" bg-zinc-600 justify-center items-center top-0 rounded-xl">
      <div className="">
        <h1 className="text-xl font-bold text-white bg-indigo-900 p-5 mb-2 rounded-b-xl">
          Shop Your favourite Products...
        </h1>
      </div>
      <div className="h-full pt-2">
        <div className="rounded-xl grid grid-cols-4 justify-center items-center gap-3">
          {products.map((item) => (
            <div className=" bg-zinc-800 rounded-lg " key={item._id}>
              <div className="flex flex-col justify-center items-center rounded-xl p-1 ">
                <img
                  className="h-72 w-72 rounded-xl border-2 border-gray-900"
                  src={item.productImages}
                  alt="image"
                />
              </div>
              <div className="text-start  mx-2">
                <div className="text-white p-2 text-lg">
                  <strong>{item.productName}</strong>
                </div>
                <div className="text-white p-1">{item.discription}</div>
                <div className="text-white p-1 flex text-lg font-semibold">
                  Price Rs: {item.productPrice} /-
                </div>
              </div>
              <button
                className="bg-indigo-900 p-3 w-full text-white text-lg rounded-lg hover:bg-indigo-600"
                onClick={() => handleAddToCartBtn(item)}
              >
                Add Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainSection;

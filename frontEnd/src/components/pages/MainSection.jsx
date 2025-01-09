import React, { useCallback, useEffect, useState } from "react";
import axios from "axios"
import { useAuth } from "../store/AuthContext.jsx";

function MainSection() {

  const { getAllProducts, products } = useAuth()
  
  const [shuffledProducts, setShuffledProducts] = useState([])


  const getProducts =async () => {
    getAllProducts()
    
  }

  useEffect(()=>{
    getProducts()
  },[])

  const shuffleArray = useCallback((array) => {
   return array
   .map(value => ({value, sort:Math.random(1)}))
   .sort((a,b) => a.sort - b.sort)
   .map(({value}) => value)
  },[])

  useEffect(() => {
    if(products.length > 0){
        setShuffledProducts(shuffleArray(products))      
    }
  },[products, shuffleArray])

  return (
    <div className=" bg-zinc-600 justify-center items-center top-0 rounded-xl">
      <div className="">
        <h1 className="text-xl font-bold text-white bg-indigo-900 p-5 mb-2 rounded-b-xl">
          Shop Your favourite Products...
        </h1>
      </div>
      <div className="h-full pt-2">
      <div className="rounded-xl grid grid-cols-4 justify-center items-center gap-3">
        {shuffledProducts.map((item, )=>(
          <div className=" bg-zinc-800 rounded-lg "
          key={item._id}>
            <div className="flex flex-col justify-center items-center rounded-xl p-1 ">
              <img 
              className="h-72 w-72 rounded-xl border-2 border-gray-900"
              src={item.productImages} 
              alt="image" />
            </div>
            <div className="text-start  mx-2">
            <div className="text-white p-2 text-lg"><strong>{ item.productName }</strong></div>
            <div className="text-white p-1">{ item.discription }</div>
            <div className="text-white p-1 flex text-lg font-semibold">Price Rs: { item.productPrice } /-</div>
            </div>
            <button className="bg-indigo-900 p-3 w-full text-white text-lg rounded-lg hover:bg-indigo-600">Add Cart</button>
          </div>
        ))}
        
         


      </div>
      </div>
    </div>
  );
}

export default MainSection;

import React from "react";
// import { useAuth } from "../store/AuthContext";

function AddToCart() {
  // const { getProductItems } = useAuth();

  return (
    <div>
      <div>
        {getProductItems && getProductItems.length > 0 ? (
          getProductItems.map((item, index) => (
            <div key={index}>
              <p>Product Name: {item.productName}</p>
              <p>Price: {item.price}</p>
              {/* Add other product details if needed */}
            </div>
          ))
        ) : (
          <p>No items in the cart.</p>
        )}
      </div>
    </div>
  );
}

export default AddToCart;

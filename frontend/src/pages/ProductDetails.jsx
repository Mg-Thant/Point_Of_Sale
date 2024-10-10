import React from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { productId } = useParams(); 

  return (
    <div>
      <h1>Product Detail: {productId}</h1>
    </div>
  );
};

export default ProductDetails;

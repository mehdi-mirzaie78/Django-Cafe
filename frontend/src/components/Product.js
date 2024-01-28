import React from "react";

const Product = ({ product }) => {
  return (
    <div className="col-sm-6 col-md-3 border d-flex justify-content-center">
      <img src={product.media[0].file} alt={product.name} />
      <h1>{product.name}</h1>
      <p>{product.price}</p>
    </div>
  );
};

export default Product;

import Product from "../src/components/Product.js";
import { useEffect, useState } from "react";
import React from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  async function getProducts() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/menu/`,
      { method: "GET", headers: { "Content-Type": "application/json" } }
    );
    const data = await response.json();

    setProducts(data.products);
  }
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div>
      <h1>Products</h1>
      <div className="row">
        {products &&
          products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        {console.log(products)}
      </div>
    </div>
  );
};

export default Products;

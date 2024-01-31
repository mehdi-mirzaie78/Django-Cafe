import Product from "@/src/components/Product.js";
import Layouts from "@/src/layouts/Layouts.js";
import { useEffect, useState } from "react";
import React from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [menu, setMenu] = useState({});
  async function getProducts() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/menu/`,
      { method: "GET", headers: { "Content-Type": "application/json" } }
    );

    const data = await response.json();
    console.log(data);
    setMenu(data);
    setProducts(data.products);
  }
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Layouts>
      {/* Section Started Inner */}
      <section className="section kf-started-inner">
        <div
          className="kf-parallax-bg js-parallax"
          style={{
            backgroundImage: `url(${menu.image})`,
          }}
        />
        <div className="container">
          <h1
            className="kf-h-title text-anim-1 scroll-animate"
            data-splitting="chars"
            data-animate="active"
          >
            {menu && menu.title}
          </h1>
        </div>
      </section>
      <section className="section kf-menu kf-menu-tabs">
        <div className="container">
          <div
            className="kf-filter kf-filter-menu element-anim-1 scroll-animate"
            data-animate="active"
          >
            <a
              className="c-pointer active"
              // onClick={handleFilterKeyChange("*")}
              data-href="*"
            >
              All
            </a>
            <a
              className="c-pointer"
              // onClick={handleFilterKeyChange("fast-food")}
              data-href="fast-food"
            >
              Fast food
            </a>
            <a
              className="c-pointer"
              // onClick={handleFilterKeyChange("hot-coffee")}
              data-href="hot-coffee"
            >
              Hot coffee
            </a>
            <a
              className="c-pointer"
              // onClick={handleFilterKeyChange("dessert")}
              data-href="dessert"
            >
              Dessert
            </a>
          </div>
          <div
            className="kf-menu-items"
            style={{ backgroundImage: "url(images/menu_logo.png)" }}
          >
            <div className="row all-menu-items">
              {products &&
                products.map((product) => (
                  <Product key={product.id} product={product} />
                ))}
              {!products && <div>There are no products</div>}
              {console.log(products)}
            </div>
          </div>
        </div>
      </section>
    </Layouts>
  );
};

export default Products;

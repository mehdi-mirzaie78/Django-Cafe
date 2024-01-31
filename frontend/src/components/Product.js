import React from "react";

const Product = ({ product }) => {
  return (
    <div className="kf-menu-item-col col-xs-12 col-sm-12 col-md-12 col-lg-6 all hot-coffee">
      <div
        className="kf-menu-item element-anim-1 scroll-animate"
        data-animate="active"
      >
        <div className="image kf-image-hover">
          <a href={product.media[0].file} className="has-popup-image">
            <img
              className="rounded"
              src={product.media[0].file}
              alt={product.name}
              width="200px"
              height="200px"
              style={{ objectFit: "cover" }}
            />
          </a>
        </div>

        <div className="desc">
          <h5 className="name">{product.name}</h5>
          <div className="subname">{product.description}</div>
          <div className="price">${product.price}</div>
        </div>
      </div>
    </div>
  );
};

export default Product;

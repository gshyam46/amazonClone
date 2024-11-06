import React, { useState } from "react";
import Product from "./Product";
import ProductDetails from "./ProductDetails";

function ProductFeed({ products }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="grid grid-flow-row-sense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
      {products
        .slice(0, 4)
        .map(({ id, title, price, description, category, image }) => (
          <div
            key={id}
            className="cursor-pointer"
            onClick={() =>
              handleProductClick({
                id,
                title,
                price,
                description,
                category,
                image,
              })
            }
          >
            <Product
              id={id}
              title={title}
              price={price}
              description={description}
              category={category}
              image={image}
            />
          </div>
        ))}
      <img
        className="col-span-full"
        src="https://links.papareact.com/dyz"
        alt=""
      />
      <div className="md:col-span-2">
        {products
          .slice(4, 5)
          .map(({ id, title, price, description, category, image }) => (
            <div
              key={id}
              className="cursor-pointer"
              onClick={() =>
                handleProductClick({
                  id,
                  title,
                  price,
                  description,
                  category,
                  image,
                })
              }
            >
              <Product
                id={id}
                title={title}
                price={price}
                description={description}
                category={category}
                image={image}
              />
            </div>
          ))}
      </div>
      {products
        .slice(5, products.length)
        .map(({ id, title, price, description, category, image }) => (
          <div
            key={id}
            className="cursor-pointer"
            onClick={() =>
              handleProductClick({
                id,
                title,
                price,
                description,
                category,
                image,
              })
            }
          >
            <Product
              id={id}
              title={title}
              price={price}
              description={description}
              category={category}
              image={image}
            />
          </div>
        ))}

      {/* Product Details Modal */}
      {showModal && selectedProduct && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-8 rounded-md w-1/2 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-xl font-bold"
            >
              &times;
            </button>
            <ProductDetails product={selectedProduct} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductFeed;

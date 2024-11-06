import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket, updateQuantity } from "../slices/basketSlice";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

function ProductDetails({ product }) {
  const dispatch = useDispatch();
  const itemsInBasket = useSelector((state) => state.basket.items);

  const productInBasket = itemsInBasket.find((item) => item.id === product.id);

  const addItemToBasket = () => {
    if (productInBasket) {
      const newQuantity = productInBasket.quantity + 1;
      dispatch(updateQuantity({ id: product.id, quantity: newQuantity }));
    } else {
      dispatch(addToBasket({ ...product, quantity: 1 }));
    }
  };

  return (
    <div className="space-y-4">
      <Image
        src={product.image}
        height={300}
        width={300}
        objectFit="contain"
        alt={product.title}
      />
      <h2 className="text-2xl font-semibold">{product.title}</h2>
      <div className="flex">
        {Array(product.rating)
          .fill()
          .map((_, i) => (
            <StarIcon key={i} className="h-5 text-yellow-500" />
          ))}
      </div>
      <p className="text-sm my-2">{product.description}</p>
      <div className="font-bold">{formatCurrency(product.price, "INR")}</div>
      {product.hasPrime && (
        <div className="flex items-center space-x-2">
          <img
            className="w-12"
            src="https://www.logolynx.com/images/logolynx/2d/2db930aff3263f71c4bd392aaa3741f7.png"
            alt="Prime logo"
          />
          <p className="text-xs text-gray-500">Free Next-Day Delivery</p>
        </div>
      )}
      <button onClick={addItemToBasket} className="button">
        Add to Basket
      </button>
    </div>
  );
}

const formatCurrency = (quantity, currency = "INR") => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
  }).format(quantity);
};

export default ProductDetails;

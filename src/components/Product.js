import React, { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { addToBasket, updateQuantity } from "../slices/basketSlice";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

const MIN_RATING = 2;
const MAX_RATING = 5;

function Product({ id, title, price, description, category, image }) {
  const dispatch = useDispatch();

  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1) + MIN_RATING)
  );
  const [hasPrime] = useState(Math.random() < 0.5);

  const itemsInBasket = useSelector((state) => state.basket.items);

  const productInBasket = itemsInBasket.find((item) => item.id === id);
  const quantityInBasket = productInBasket ? productInBasket.quantity : 1; // Default to 1 if not in basket

  // Add item to basket or update quantity if it already exists
  const addItemToBasket = () => {
    if (productInBasket) {
      // Product exists, update quantity in basket
      dispatch(updateQuantity({ id, quantity: productInBasket.quantity + 1 }));
    } else {
      // Product doesn't exist, add to basket with quantity 1
      const product = {
        id,
        title,
        price,
        description,
        category,
        image,
        rating,
        hasPrime,
        quantity: 1,
      };
      dispatch(addToBasket(product));
    }
  };

  return (
    <div className="relative flex flex-col bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      <Image
        src={image}
        height={200}
        width={200}
        objectFit="contain"
        alt={title}
      />
      <h4>{title}</h4>
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon key={i} className="h-5 text-yellow-500" />
          ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{description}</p>
      <div className="mb-5">
        <span>{formatCurrency(price, "INR")}</span>
      </div>
      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img
            className="w-12"
            src="https://www.logolynx.com/images/logolynx/2d/2db930aff3263f71c4bd392aaa3741f7.png"
            alt="Prime logo"
          />
          <p className="text-xs text-gray-500">Free Next-Day Delivery</p>
        </div>
      )}

      <button onClick={addItemToBasket} className="mt-auto button">
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

export default Product;

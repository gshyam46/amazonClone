import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  updateQuantity,
} from "../slices/basketSlice"; // Add the new updateQuantity action

function CheckoutProduct({
  id,
  title,
  price,
  rating,
  description,
  category,
  image,
  hasPrime,
  quantity,
}) {
  const dispatch = useDispatch();

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));
  };

  const incrementQuantity = () => {
    dispatch(updateQuantity({ id, quantity: quantity + 1 }));
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      dispatch(updateQuantity({ id, quantity: quantity - 1 }));
    }
  };

  return (
    <div className="grid grid-cols-5">
      <Image src={image} height={200} width={200} objectFit="contain" />

      <div className="col-span-3 mx-5">
        <p>{title}</p>

        <div className="flex flex-row">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>

        <p className="text-xs my-2 line-clamp-2">{description}</p>
        <div className="mb-5">
          <span>{formatCurrency(price * quantity, "INR")}</span>
        </div>
        {hasPrime && (
          <div className="flex items-center space-x-2 -mt-3">
            <img
              className="w-12"
              src="https://www.logolynx.com/images/logolynx/2d/2db930aff3263f71c4bd392aaa3741f7.png"
              alt="Prime logo"
            />
            <p className="text-xs text-gray-500">Free Next-Day Delivery</p>
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <div className="flex items-center space-x-2">
          <button onClick={decrementQuantity} className="button px-4">
            -
          </button>
          <span className="px-5">{quantity}</span>
          <button onClick={incrementQuantity} className="button px-4">
            +
          </button>
        </div>
        <button onClick={removeItemFromBasket} className="button">
          Remove From Basket
        </button>
      </div>
    </div>
  );
}

const formatCurrency = (quantity, currency = "INR") => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
  }).format(quantity);
};

export default CheckoutProduct;

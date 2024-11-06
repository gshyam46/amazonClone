import React from "react";
import Header from "../components/Header";
import Image from "next/image";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import { selectItems, selectTotal } from "../slices/basketSlice";
import { signIn, useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

function Checkout() {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const { data: session } = useSession();
  const stripePromise = loadStripe(process.env.stripe_public_key);
  const createCheckoutSession = async () => {
    const stripe = await stripePromise;
    const checkoutSession = await axios.post("api/create-checkout-session", {
      items: items,
      email: session.user.email,
    });

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) alert(result.error.message);
  };
  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex flex-col max-w-screen-2xl mx-auto">
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />
        </div>

        <div className="flex flex-col p-5 space-y-10 bg-white flex-grow">
          <h1 className="text-3xl border-b pb-4">
            {items.length === 0 ? "Your Cart is Empty" : "Shopping Cart"}
          </h1>
          {items.map((item, i) => (
            <CheckoutProduct
              key={i}
              id={item.id}
              title={item.title}
              price={item.price}
              description={item.description}
              category={item.category}
              image={item.image}
              hasPrime={item.hasPrime}
              rating={item.rating}
              quantity={item.quantity}
            />
          ))}
        </div>

        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2>
                Subtotal ({items.length} items) :
                <div className="mb-5">
                  <span className="font-bold">
                    {formatCurrency(total, "INR")}
                  </span>
                </div>
              </h2>

              {!session ? (
                <button
                  className={
                    "button from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-pointer"
                  }
                  onClick={signIn}
                >
                  Sign In to Checkout
                </button>
              ) : (
                <button
                  role="link"
                  className={`button`}
                  onClick={createCheckoutSession}
                >
                  Proceed to Payment
                </button>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
const formatCurrency = (quantity, currency = "INR") => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
  }).format(quantity);
};

export default Checkout;

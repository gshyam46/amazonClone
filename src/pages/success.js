import React from "react";
import Header from "../components/Header";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";

function success() {
  const router = useRouter();

  return (
    <div className="bg-gray-100 h-screen">
      <Header />
      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center space-x-2 mb-5">
            <CheckCircleIcon className="text-green-500 h-10" />
            <h1>Thank you, your order has been confirmed!</h1>
          </div>
          <p>
            Thank you for shopping with us. We'll send a confirmation once the
            item has been shipped, if you would like to check the status of the
            order(s) please click on the link below.
          </p>
          <button
            className="button mt-8"
            onClick={() => router.push("/orders")}
          >
            Go to my orders
          </button>
        </div>
      </main>
    </div>
  );
}

export default success;

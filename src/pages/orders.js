import React from "react";
import Header from "../components/Header";
import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import db from "../../firebase";
// import { collection } from "firebase/firestore";
import moment from "moment";

import {
  getFirestore,
  collection,
  doc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import SingleOrder from "../components/SingleOrder";

function orders({ orders }) {
  const { data: session } = useSession();
  return (
    <div>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>

        {session ? (
          <h2>{orders.length} Orders</h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}
        <div className="mt-5 space-y-4">
          {orders?.map(
            ({ id, amount, amountShipping, items, timestamp, images }) => (
              <SingleOrder
                key={id} // Ensure you use the capitalized "Order"
                id={id}
                amount={amount}
                amountShipping={amountShipping}
                items={items}
                timestamp={timestamp}
                images={images}
              />
            )
          )}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  const session = await getSession(context);

  if (!session) {
    return {
      props: {
        orders: [], // Return empty orders if the session doesn't exist
      },
    };
  }

  const db = getFirestore();
  const stripeOrdersRef = collection(db, "users", session.user.email, "orders");
  const q = query(stripeOrdersRef, orderBy("timestamp", "desc"));
  const stripeOrders = await getDocs(q);

  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );

  return {
    props: {
      orders, // Passed orders to the page
    },
  };
}

export default orders;

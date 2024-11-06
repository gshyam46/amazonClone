const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
export default async (req, res) => {
  try {
    const { items, email } = req.body;
    const transformedItems = items.map((item) => ({
      price_data: {
        currency: "USD",
        unit_amount: item.price * 100,
        product_data: {
          name: item.title,
          images: [item.image],
        },
      },
      quantity: item.quantity,
    }));
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      //   shipping_options: ["shr_1QI5D0EN5IxmPYQoX7YUxcI9"],
      line_items: transformedItems,
      mode: "payment",
      customer_email: email,
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "IN"],
      },
      success_url: `${process.env.HOST}/success`,
      cancel_url: `${process.env.HOST}/checkout`,
      metadata: {
        email: email,
        images: JSON.stringify(items.map((item) => item.image)),
      },
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

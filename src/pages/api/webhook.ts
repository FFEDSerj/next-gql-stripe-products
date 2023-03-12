import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../../lib/stripe";
import getRawBody from "raw-body";
import Stripe from "stripe";

export const endpointSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET!;

export default async function Webhook(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const payload = await getRawBody(request);
  const signature = request.headers["stripe-signature"];
  let event;

  try {
    if (!signature) {
      throw new Error("Missing stripe signature");
    }
    event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);
  } catch (err) {
    if (err instanceof Error) {
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }
  }

  if (event?.type === "checkout.session.completed") {
    const _session = event.data.object as Stripe.Checkout.Session;
  }

  response.status(200).end();
}

export const config = {
  api: {
    bodyParser: false,
  },
};

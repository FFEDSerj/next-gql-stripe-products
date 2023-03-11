import * as dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";

export const stripe = new Stripe(
  process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string,
  {
    apiVersion: "2022-11-15",
  }
);

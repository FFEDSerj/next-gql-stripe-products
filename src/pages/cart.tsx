import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { MouseEvent } from "react";
import { CartDetail } from "../../components/CartDetail";
import { CartError } from "../../components/CartError";
import { getCartId } from "../../lib/cart.client";
import { useCreateCheckoutSessionMutation, useGetCartQuery } from "../../types";

const Cart: NextPage<IProps> = ({ cartId }) => {
  const { data } = useGetCartQuery({ variables: { id: cartId } });
  const router = useRouter();
  const [createCheckoutSession, { loading: creatingCheckoutSession, error }] =
    useCreateCheckoutSessionMutation({
      variables: {
        input: {
          cartId,
        },
      },
      onCompleted: (data) => {
        if (data?.createCheckoutSession?.url) {
          router.push(data.createCheckoutSession?.url);
        }
      },
    });

  const onCreateCheckoutSession = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    createCheckoutSession();
  };

  return (
    <div className="flex flex-col">
      <main className="p-8">
        <div className="mx-auto max-w-xl space-y-8">
          <h1 className="text-4xl">Cart</h1>
          <CartError error={error} />
          <CartDetail cart={data?.cart} />
          <div>
            <button
              onClick={onCreateCheckoutSession}
              disabled={creatingCheckoutSession}
              className="p-1 font-light border border-neutral-700 hover:bg-black hover:text-white w-full"
            >
              {creatingCheckoutSession
                ? "Redirecting to Checkout"
                : "Go to Checkout"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

interface IProps {
  cartId: string;
}

export const getServerSideProps: GetServerSideProps<IProps> = async ({
  req,
  res,
}) => {
  const cartId = getCartId({ req, res });
  return { props: { cartId } };
};

export default Cart;

import type { GetServerSideProps, NextPage } from "next";
import { CartDetail } from "../../components/CartDetail";
import { getCartId } from "../../lib/cart.client";
import { useGetCartQuery } from "../../types";

const Cart: NextPage<IProps> = ({ cartId }) => {
  const { data } = useGetCartQuery({ variables: { id: cartId } });

  return (
    <div className="flex flex-col">
      <main className="p-8">
        <div className="mx-auto max-w-xl space-y-8">
          <h1 className="text-4xl">Cart</h1>
          <CartDetail cart={data?.cart} />
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

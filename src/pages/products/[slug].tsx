import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { ProductDetails } from "../../../components/ProductDetails";
import { Product, products } from "../../../lib/products";

const ProductPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ product }) => <ProductDetails product={product} />;

export const getServerSideProps: GetServerSideProps<{
  product: Product | null;
}> = async ({ query }) => {
  const product =
    products.find((product) => product.slug === query.slug) || null;
  return { props: { product } };
};

export default ProductPage;

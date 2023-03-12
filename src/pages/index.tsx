import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { ProductList } from "../../components/ProductList";
import { Product, products } from "../../lib/products";

type HomePageProps = {
  products: Product[];
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => ({
  props: {
    products: products.slice(0, 6),
  },
});

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  products,
}) => {
  return (
    <main>
      <section>
        <ProductList products={products} />
      </section>
    </main>
  );
};

export default Home;

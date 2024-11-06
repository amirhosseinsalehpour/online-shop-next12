import type { NextPage } from "next";
import { GetStaticProps, GetStaticPaths } from "next";
// import { client } from "../../../lib/client";
import { IProduct } from "../../../lib/types/products";
import ProductList from "../../../components/productList/ProductList";
// import { ISubCategoryPathsParams } from "../../../lib/types/pagePathsParams";
import { _PRODUCTS } from "../../../mock/products";

const subCategory: NextPage<{
  products: IProduct[];
}> = ({ products }) => {
  console.log("subCategory: ", products);
  return (
    <div>
      <ProductList productList={products} />
    </div>
  );
};

export default subCategory;

export const getStaticPaths: GetStaticPaths = async () => {
  // const query = `*[_type=="product"]{
  //   "category":category[0],
  //   "subCategory":category[1],
  // }`;
  // const products = await client.fetch(query);
  // const paths = products.map((product: ISubCategoryPathsParams) => ({
  //   params: {
  //     category: product.category.toString(),
  //     subCategory: product.subCategory.toString(),
  //   },
  // }));
  const paths = _PRODUCTS.map((product) => ({
    params: {
      category: product.category[0].toString(),
      subCategory: product.category[1].toString(),
    },
  }));
  return {
    fallback: "blocking",
    paths,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const subCategory = context.params?.subCategory;
  const category = context.params?.category;
  // const productQuery = `*[_type=='product'&& category[0]=="${category}" && category[1]=="${subCategory}"]`;
  // const products = await client.fetch(productQuery);

  return {
    props: {
      products: _PRODUCTS.filter(
        (p) => p.category[0] === category && p.category[1] === subCategory
      ),
    },
  };
};

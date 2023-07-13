import React from "react";
import Product from "../../models/Product";
import ProductListing from "./ProductListing";

interface ProductsListProps {
  products: Product[]
}

const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
  return (
    <section
      id="menu"
      className="mt-48 mb-12 bg-white rounded-lg text-black text-base max-w-6xl mx-auto"
    >
      <ul className="mx-6">
        {products.map((product) => (
          <ProductListing product={product} key={product.id} />
        ))}
      </ul>
    </section>
  );
};

export default ProductsList;

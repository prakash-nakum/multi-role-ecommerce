"use client";

import React from "react";
import Container from "../shared/Container";
import Card from "../shared/Card";
import { useGetProductsQuery } from "@/services/product/productApi";
import ProductCard from "../shared/skeletonLoading/ProductCard";

const NewArrivals = () => {
  const {
    data: productsData,
    error: productsError,
    isLoading: productsLoading,
  } = useGetProductsQuery();
  const products = productsData?.data || [];
  
  
  // console.log(123132, process.env);
  return (
    <Container>
      <section className="flex flex-col gap-y-10">
        <h1 className="text-4xl">
          New Arrivals. <span className="">New Equipment</span>
        </h1>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:gap-x-6 gap-y-8">
          {productsLoading || products?.length === 0 ? (
            <>
              {[1, 2, 3, 4].map((_, index) => (
                <ProductCard key={index} />
              ))}
            </>
          ) : (
            <>
              {products?.slice(0, 4)?.map((product, index) => (
                <Card key={index} index={index} product={product} />
              ))}
            </>
          )}
        </div>
      </section>
    </Container>
  );
};

export default NewArrivals;

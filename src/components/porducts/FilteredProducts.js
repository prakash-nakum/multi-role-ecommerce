
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Card from "../shared/Card";
import {
  useGetFilteredProductsMutation,
  useGetFilteredProductsQuery,
} from "@/services/product/productApi";
import { useSelector } from "react-redux";
import ProductCard from "../shared/skeletonLoading/ProductCard";

const FilteredProducts = () => {
  const { filterCredentials } = useSelector((state) => state.productFilter);
  const [
    addFilter,
    { data: productsData, error: productsError, isLoading: productsLoading },
  ] = useGetFilteredProductsMutation();
  const products = useMemo(() => productsData?.data || [], [productsData]);

  useEffect(() => {
    addFilter(filterCredentials);
  }, [filterCredentials, addFilter]);

  // useEffect(() => {
  //   if (productsError) {
  //     alert(productsError?.data?.description);
  //   }
  // }, [productsError]);

  return (
    <div className="lg:col-span-9 md:col-span-8 col-span-12">
      <div className="flex flex-col gap-y-8">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-x-6 gap-y-8">
          {productsLoading || products?.length === 0 ? (
            <>
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <ProductCard key={index} />
              ))}
            </>
          ) : (
            <>
              {products.map((product, index) => (
                <Card key={index} product={product} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilteredProducts;

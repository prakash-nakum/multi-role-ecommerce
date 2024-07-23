"use client";

import { useDeleteProductMutation } from "@/services/product/productApi";
import React, { useEffect } from "react";
import Trash from "../icons/Trash";
import Spinner from "../shared/Spinner";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const DemoteProduct = ({ product }) => {

  const accessToken = useSelector((state) => state.accesstoken.token)

  const [updateProduct, {
    isLoading: productUpdating,
    data: updateProductResponse,
    error: updateProductResponseError,
  },] = useDeleteProductMutation();

  useEffect(() => {
    if (updateProductResponse) {
      toast.success(updateProductResponse?.message);
    }
    if (updateProductResponseError?.data) {
      toast.error(updateProductResponseError?.data?.description);
    }
  }, [updateProductResponse, updateProductResponseError]);

  return (
    <button
      className="bg-red-50 border border-red-900 p-0.5 rounded-secondary text-red-900"
      onClick={() =>
        updateProduct({ id: product._id, accessToken })
      }
    >
      {productUpdating ? <Spinner /> : <Trash />}
    </button>
  );
};

export default DemoteProduct;
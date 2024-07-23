"use client";

import React, { useEffect } from "react";
import Trash from "../icons/Trash";
import Spinner from "../shared/Spinner";
import { useDeleteCategoryMutation } from "@/services/category/categoryApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const DemoteCategory = ({ category }) => {
  const accessToken = useSelector((state) => state.accesstoken.token)
  const [
    deleteCategory,
    {
      isLoading: categoryUpdating,
      data: updateCategoryResponse,
      error: updateCategoryResponseError,
    },
  ] = useDeleteCategoryMutation();

  useEffect(() => {
    if (updateCategoryResponse) {
      toast.success(updateCategoryResponse?.message);
    }
    if (updateCategoryResponseError?.data) {
      toast.error(updateCategoryResponseError?.data?.description);
    }
  }, [updateCategoryResponse, updateCategoryResponseError]);


  return (
    <button
      className="bg-red-50 border border-red-900 p-0.5 rounded-secondary text-red-900"

      onClick={() =>
        deleteCategory({ id: category._id, accessToken })
      }
    >
      {categoryUpdating ? <Spinner /> : <Trash />}
    </button>
  );
};

export default DemoteCategory;

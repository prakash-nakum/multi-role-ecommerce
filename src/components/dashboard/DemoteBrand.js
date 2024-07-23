import React, { useEffect } from "react";
import Trash from "../icons/Trash";
import Spinner from "../shared/Spinner";
import { useDeleteBrandMutation } from "@/services/brand/brandApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const DemoteBrand = ({ brand }) => {

  const accessToken = useSelector((state) => state.accesstoken.token)

  const [
    deleteBrand,
    {
      isLoading: brandUpdating,
      data: updateBrandResponse,
      error: updateBrandResponseError,
    },
  ] = useDeleteBrandMutation();

  useEffect(() => {
    if (updateBrandResponse) {
      toast.success(updateBrandResponse?.message);
    }
    if (updateBrandResponseError?.data) {
      toast.error(updateBrandResponseError?.data?.description);
    }
  }, [updateBrandResponse, updateBrandResponseError]);

  return (
    <button
      className="bg-red-50 border border-red-900 p-0.5 rounded-secondary text-red-900"
      onClick={() => deleteBrand({ id: brand._id, accessToken })}
    >
      {brandUpdating ? <Spinner /> : <Trash />}
    </button>
  );
};

export default DemoteBrand;

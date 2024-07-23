import { useUpdateUserRoleMutation } from "@/services/user/userApi";
import React, { useEffect } from "react";
import Spinner from "../shared/Spinner";
import User from "../icons/User";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const UserUpdate = ({ user }) => {
  const accessToken = useSelector((state) => state.accesstoken.token);

  const [
    updateUser,
    {
      isLoading: userUpdating,
      data: updateUserResponse,
      error: updateUserResponseError,
    },
  ] = useUpdateUserRoleMutation();

  useEffect(() => {
    if (updateUserResponse) {
      toast.success(updateUserResponse?.description);
    }
    if (updateUserResponseError?.data) {
      toast.error(updateUserResponseError?.data?.description);
    }
  }, [updateUserResponse, updateUserResponseError]);

  return (
    <button
      className="bg-red-50 border border-green-900 p-0.5 rounded-secondary text-green-900"
      onClick={() =>
        updateUser({
          id: user?._id,
          accessToken: accessToken,
          body: {
            role:
              user?.role === "buyer" ? "seller" : "seller" ? "buyer" : "admin",
          },
        })
      }
    >
      {(user?.role === "buyer" || user?.role === "seller") &&
        (userUpdating ? <Spinner /> : <User />)}
    </button>
  );
};

export default UserUpdate;

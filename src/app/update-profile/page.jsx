"use client";

import Container from "@/components/shared/Container";
import Spinner from "@/components/shared/Spinner";
import Main from "@/components/shared/layouts/Main";
import { useUpdateUserDetailMutation } from "@/services/auth/authApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const [name, setname] = useState(user?.name);
  const [phone, setphone] = useState(user?.phone);
  const [avatar, setavatar] = useState(null);
  const [first, setfirst] = useState("");

  const accessToken = useSelector((state) => state.accesstoken.token);
  const handleAvatar = (e) => {
    const file = e.target.files[0];
    setavatar(file);
  };

  const [updateUserDetails, { isLoading, data, error }] =
    useUpdateUserDetailMutation();

  useEffect(() => {
    if (data) {
      if (data.acknowledgement === false) {
        toast.error(data?.message);
      } else {
        toast.success(data?.message);
        setavatar(null);
      }
    }
    if (error) {
      toast.error(error?.message);
    }
    if (error?.data) {
      toast.error(error?.data?.message);
    }
  }, [data, error]);

  const handleUpdateProfile = (e) => {
    if (!avatar) {
      return toast.error("File reqired");
    }

    e.preventDefault();
    setfirst();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    if (avatar) {
      formData.append("avatar", avatar);
    }
    updateUserDetails({
      id: user?._id,
      accessToken: accessToken,
      userInfo: formData,
    });
  };
  return (
    <Main>
      <Container>
        <form className="w-full max-w-sm">
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                Full Name
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                value={name ? name : user?.name}
                defaultValue={user?.name}
                onChange={(e) => setname(e.target.value)}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
              />
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-phone-number"
              >
                Phone
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                value={phone ? phone : user?.phone}
                defaultValue={user?.phone}
                onChange={(e) => setphone(e.target.value)}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-phone-number"
                type="text"
              />
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-email"
              >
                Email
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                disabled
                value={user?.email}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-email"
                type="text"
              />
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                Upload Avtar
              </label>
            </div>
            <div className="flex items-center justify-center ">
              <label
                for="dropzone-file"
                className="flex flex-col items-center justify-center h-35  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  onChange={handleAvatar}
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                disabled={isLoading}
                onClick={handleUpdateProfile}
                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
              >
                {isLoading ? <Spinner /> : <>Save</>}
              </button>
            </div>
          </div>
        </form>
      </Container>
    </Main>
  );
};

export default UpdateProfile;

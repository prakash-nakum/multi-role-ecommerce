import Signup from "@/components/icons/Signup";
import Link from "next/link";
import React, { useState } from "react";
import OutsideClick from "../OutsideClick";
import User from "@/components/icons/User";
import Signin from "@/components/icons/Signin";
import ForgotPassword from "@/components/icons/ForgotPassword";
import Logout from "@/components/icons/Logout";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { logout } from "@/features/auth/accesstokenSlice";
import { useRouter } from "next/navigation";
import ordericon from "../../../../assets/order-icon.png";

const Auth = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const accessToken = useSelector((state) => state.accesstoken.token);

  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <button
        className="p-2 rounded-secondary hover:bg-slate-100 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <User className="h-6 w-6" />
      </button>
      {isOpen && (
        <OutsideClick
          onOutsideClick={() => setIsOpen(false)}
          className="absolute top-full right-0 w-80 h-fit bg-white border rounded p-2 flex flex-col gap-y-2.5"
        >
          {!accessToken ? (
            // {Object.keys(user).length === 0 ? (

            <>
              <Link
                href="/auth/signup"
                className="w-full flex flex-row items-start gap-x-2 p-2 border border-transparent hover:border-black rounded"
              >
                <span className="bg-sky-500/5 p-1 rounded">
                  <Signup />
                </span>
                <article className="whitespace-normal">
                  <h2 className="text-sm">Sign Up</h2>
                  <p className="text-xs">Register as a new user</p>
                </article>
              </Link>
              <Link
                href="/auth/signin"
                className="w-full flex flex-row items-start gap-x-2 p-2 border border-transparent hover:border-black rounded"
              >
                <span className="bg-sky-500/5 p-1 rounded">
                  <Signin />
                </span>
                <article className="whitespace-normal">
                  <h2 className="text-sm">Sign In</h2>
                  <p className="text-xs">Login as an existing user</p>
                </article>
              </Link>
              <Link
                href="/auth/forgot-password"
                className="w-full flex flex-row items-start gap-x-2 p-2 border border-transparent hover:border-black rounded"
              >
                <span className="bg-sky-500/5 p-1 rounded">
                  <ForgotPassword />
                </span>
                <article className="whitespace-normal">
                  <h2 className="text-sm">Forgot Password</h2>
                  <p className="text-xs">Reset your account credentials</p>
                </article>
              </Link>
            </>
          ) : (
            <div className="flex flex-col gap-y-2">
              <div className="flex flex-row gap-x-2 p-4">
                <Image
                  src={user?.avatar?.url}
                  // src={`${process.env.NEXT_PUBLIC_NODE_URL}/${user?.avatar?.url}`}
                  alt={user?.avatar?.public_id}
                  height={50}
                  width={50}
                  className="rounded object-cover h-[50px] w-[50px]"
                />
                <article className="grid grid-cols-1 gap-y-1">
                  <h2 className="line-clamp-1">{user?.name}</h2>
                  <p className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    {user?.email}
                  </p>
                  <span className="text-xs px-2 flex flex-row flex-wrap gap-2">
                    {/* <span className="px-1 border border-indigo-900 text-indigo-900 bg-indigo-50 rounded-primary">{user?.store?.title || "N/A"}</span> */}
                    <span className="px-1 border border-purple-900 text-purple-900 bg-purple-50 rounded-primary">
                      {user?.role || "N/A"}
                    </span>
                  </span>

                  <span className="text-xs px-2 flex flex-row flex-wrap gap-2">
                    <span
                      onClick={() => {
                        router.push("/update-profile");
                      }}
                      className="cursor-pointer px-1 border border-indigo-900 text-indigo-900 bg-indigo-50 rounded-primary"
                    >
                      Update Profile
                    </span>
                  </span>
                </article>
              </div>
              <hr />
              <div className="w-full flex flex-row items-start gap-x-2 p-2 border border-transparent hover:border-black rounded cursor-pointer">
                <span className="bg-sky-500/5 p-1 rounded">
                  <Logout />
                </span>
                <article className="whitespace-nowrap" onClick={handleLogout}>
                  <h2 className="text-sm">Logout</h2>
                  <p className="text-xs">Clear your current activities</p>
                </article>
              </div>
              <Link href={`/my-order`}>
                <div className="w-full flex flex-row items-start gap-x-2 p-2 border border-transparent hover:border-black rounded cursor-pointer">
                  <span className="bg-sky-500/5 p-1 rounded">
                    <Image width={25} src={ordericon} alt="ordericon" />
                  </span>
                  <article
                    className="whitespace-nowrap"
                    // onClick={handleLogout}
                  >
                    <h2 className="text-sm">My order</h2>
                    <p className="text-xs">Get your order details </p>
                  </article>
                </div>
              </Link>
            </div>
          )}
        </OutsideClick>
      )}
    </>
  );
};

export default Auth;

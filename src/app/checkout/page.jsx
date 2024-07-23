"use client";

import Container from "@/components/shared/Container";
import Main from "@/components/shared/layouts/Main";
import { useUpdateUserMutation } from "@/services/user/userApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ImageDisplay from "./ImageDisplay";

const Checkout = () => {
  const [quantity, setQuantity] = useState("");
  const [quantities, setQuantities] = useState({});
  const [imageData, setImageData] = useState(null);
  //   const [imageUrl, setImageUrl] = useState("");

  const router = useRouter();

  const [updateCart, { isLoading: cartUpdating, data, error }] =
    useUpdateUserMutation();

  const { user } = useSelector((state) => state.auth);
  const accessToken = useSelector((state) => state.accesstoken.token);

  const totalPrice = user?.cart?.reduce((acc, item) => {
    const itemTotal = item?.product?.price * item?.quantity;
    return acc + itemTotal;
  }, 0);

  useEffect(() => {
    // Initialize quantities based on the user's cart or other logic
    const initialQuantities = {};
    user?.cart?.forEach((item) => {
      initialQuantities[item.product?._id] = item.quantity;
    });
    setQuantities(initialQuantities);
  }, [user.cart]);

  const handleDecreaseQty = (productID) => {
    const currentQuantity = quantities[productID] || 0;
    if (currentQuantity > 0) {
      const updatedQuantity = currentQuantity - 1;
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productID]: updatedQuantity,
      }));
      updateCart({
        id: user?._id,
        accessToken,
        body: { product: productID, quantity: updatedQuantity },
      });
    }
  };

  const handleIncreaseQty = (productID) => {
    const currentQuantity = quantities[productID] || 0;
    const updatedQuantity = currentQuantity + 1;
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productID]: updatedQuantity,
    }));
    updateCart({
      id: user?._id,
      accessToken,
      body: { product: productID, quantity: updatedQuantity },
    });
  };

  const handleDeleteCart = (productID) => {
    updateCart({
      id: user?._id,
      accessToken,
      body: { product: productID, quantity: 0 },
    });
  };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`http://192.168.192.76:8080/gettest-img`);
        const data = await response.json();
        // setImageData(data);
        setImageData(data.items[0]);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, []);

  //   console.log(imageUrl);

  return (
    <Main>
      <Container className="flex flex-col gap-y-12 py-8">
        {Object.keys(user).length === 0 ||
        user?.cart?.length === 0 ||
        !accessToken ? (
          <>Your cart empty ! </>
        ) : (
          <section className="h-screen bg-gray-100 py-12 sm:py-16 lg:py-20">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-center">
                <h1 className="text-2xl font-semibold text-gray-900">
                  Your Cart
                </h1>
                <ImageDisplay imageData={imageData} />
                {/* <div>{imageUrl && <Image src={imageUrl} alt="Uploaded" />}</div> */}
              </div>
              <div className="mx-auto mt-8 max-w-2xl md:mt-12">
                <div className="bg-white shadow">
                  <div className="px-4 py-6 sm:px-8 sm:py-10">
                    <div className="flow-root">
                      <ul className="-my-8">
                        {user?.cart &&
                          user?.cart.length > 0 &&
                          user?.cart.map((item, index) => {
                            return (
                              <li
                                key={item?._id}
                                className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                              >
                                <div>
                                  <Image
                                    src={item?.product?.thumbnail.url}
                                    // src={`${process.env.NEXT_PUBLIC_NODE_URL}/${item?.product?.thumbnail.url}`}
                                    width={50}
                                    height={50}
                                    alt={item?.product?.title}
                                  />
                                </div>
                                <div className="relative flex flex-1 flex-col justify-between">
                                  <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                                    <div className="pr-8 sm:pr-5">
                                      <p className="text-base font-semibold text-gray-900">
                                        {item?.product?.title}
                                      </p>
                                      <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">
                                        ${item?.product?.price}
                                      </p>
                                    </div>

                                    <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                      <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                                        ${item?.product?.price * item?.quantity}
                                      </p>

                                      <div className="sm:order-1">
                                        <div className="mx-auto flex h-8 items-stretch text-gray-600">
                                          <button
                                            className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                            onClick={() =>
                                              handleDecreaseQty(
                                                item?.product?._id
                                              )
                                            }
                                          >
                                            -
                                          </button>
                                          <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                                            {quantities[item.product?._id] ||
                                              item.quantity}
                                          </div>
                                          <button
                                            disabled={cartUpdating}
                                            onClick={() =>
                                              handleIncreaseQty(
                                                item?.product?._id
                                              )
                                            }
                                            className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                          >
                                            +
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                                    <button
                                      disabled={cartUpdating}
                                      type="button"
                                      className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                                      onClick={() =>
                                        handleDeleteCart(item?.product?._id)
                                      }
                                    >
                                      <svg
                                        className="h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M6 18L18 6M6 6l12 12"
                                          className=""
                                        ></path>
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                      </ul>
                    </div>

                    <div className="mt-6 border-t border-b py-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-400">Subtotal</p>
                        <p className="text-lg font-semibold text-gray-900">
                          ${totalPrice}.00
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-400">Shipping</p>
                        <p className="text-lg font-semibold text-gray-900">
                          $00.00
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">Total</p>
                      <p className="text-2xl font-semibold text-gray-900">
                        <span className="text-xs font-normal text-gray-400"></span>{" "}
                        ${totalPrice}.00
                      </p>
                    </div>

                    <div className="mt-6 text-center">
                      <button
                        type="button"
                        className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                        onClick={() => router.push("/checkout/payment")}
                      >
                        Checkout
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </Container>
    </Main>
  );
};

export default Checkout;

"use client";

import React, { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Bag from "../icons/Bag";
import { useUpdateUserMutation } from "@/services/user/userApi";
import { useSelector } from "react-redux";
import Spinner from "../shared/Spinner";
import toast from "react-hot-toast";

const CartButton = ({ product, productID }) => {
  // const [qty, setQty] = useState(0);
  const { user } = useSelector((state) => state.auth);

  const [quantity, setQuantity] = useState('')

  const accessToken = useSelector((state) => state.accesstoken.token)

  const [updateCart, { isLoading: cartUpdating, data, error }] =
    useUpdateUserMutation();

  useEffect(() => {
    if (data) {
      toast.success(data?.description)
    }
    if (error) {
      toast.error(error?.data?.description)
    }
  }, [data, error]);

  useEffect(() => {

    const productInCart = user?.cart?.find((product) => product.product?._id === productID);
    if (productInCart && accessToken) {
      const productQuantity = productInCart.quantity;
      setQuantity(productQuantity);

    } else {
      setQuantity(0);
    }
  }, [productID, user.cart]);

  const handleDecreaseQty = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQty = () => {
    setQuantity(quantity + 1);
  };
  const handleAddToCart = () => {
    if (!accessToken) {
      setQuantity(0);
      toast.error("Login  required first")
    } else {
      updateCart({
        id: user?._id,
        accessToken: accessToken,
        body: { product: product._id, quantity: quantity },
      })
    };
  }


  // const handleDecreaseQty = () => {
  //   if (quantity > 0) {
  //     const updatedQuantity = quantity - 1;
  //     setQuantity(updatedQuantity);
  //     updateCart({
  //       id: user?._id,
  //       body: { product: productID, quantity: updatedQuantity },
  //     });
  //   }
  // };

  // const handleIncreaseQty = () => {
  //   const updatedQuantity = quantity + 1;
  //   setQuantity(updatedQuantity);

  //   // Update cart with the new quantity
  //   updateCart({
  //     id: user?._id,
  //     body: { product: productID, quantity: updatedQuantity },
  //   });
  // };


  return (
    <section className="flex flex-row items-center gap-x-4">
      <div className="flex flex-row gap-x-2 items-center border px-4 rounded-secondary h-full">
        <button
          className="border border-black/30 disabled:border-zinc-100 p-1.5 rounded-secondary"
          onClick={handleDecreaseQty}
        >
          <AiOutlineMinus className="w-4 h-4" />
        </button>
        <span className="px-2 py-0.5 rounded-primary border w-12 inline-block text-center">
          {quantity}
        </span>
        <button
          className="border border-black/30 disabled:border-zinc-100 p-1.5 rounded-secondary"
          onClick={handleIncreaseQty}
        >
          <AiOutlinePlus className="w-4 h-4" />
        </button>
      </div>
      <button
        className="px-8 py-2 border border-black rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow w-fit flex flex-row gap-x-2 items-center"
        disabled={quantity === 0 || cartUpdating}
        onClick={handleAddToCart}

      >
        {cartUpdating ? (
          <Spinner />
        ) : (
          <>
            <Bag /> Add to Cart
          </>
        )}
      </button>
    </section>
  );
};

export default CartButton;

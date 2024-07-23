import Cart from "@/components/icons/Cart";
import React, { useState } from "react";
import OutsideClick from "../OutsideClick";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const MyCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const accessToken = useSelector((state) => state.accesstoken.token);

  const router = useRouter();

  return (
    <>
      <button
        className="p-2 rounded-secondary hover:bg-slate-100 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Cart className="h-6 w-6" />
      </button>

      {isOpen && (
        <OutsideClick
          onOutsideClick={() => setIsOpen(false)}
          className="absolute top-full right-0 w-80 max-h-96 overflow-y-auto bg-white border rounded p-4 flex flex-col gap-y-2.5"
        >
          <div className="w-full h-full flex flex-col gap-y-8">
            {Object.keys(user).length === 0 ||
            user?.cart?.length === 0 ||
            !accessToken ? (
              <>No Products Added!</>
            ) : (
              <>
                {user?.cart?.map(({ product, quantity }) => (
                  <div
                    key={product?._id}
                    className="flex flex-row gap-x-2 cursor-pointer"
                  >
                    <Image
                      src={product?.thumbnail?.url}
                      // src={`${process.env.NEXT_PUBLIC_NODE_URL}/${product?.thumbnail?.url}`}
                      alt={product?.thumbnail?.public_id}
                      width={50}
                      height={50}
                      className="rounded h-[50px] w-[50px] object-cover"
                    />
                    <article className="flex flex-col gap-y-2">
                      <div className="flex flex-col gap-y-0.5">
                        <h2 className="text-base">{product?.title}</h2>
                        <p className="text-xs line-clamp-2">
                          {product?.summary}
                        </p>
                      </div>
                      <div className="flex flex-col gap-y-1">
                        <span className="flex flex-row justify-between">
                          <span className="text-xs flex flex-row gap-x-0.5 items-baseline">
                            $
                            <span className="text-sm text-black">
                              {product?.price}.00
                            </span>
                          </span>
                          <span className="text-xs flex flex-row gap-x-0.5 items-baseline">
                            QTY
                            <span className="text-sm text-black">
                              {quantity}
                            </span>
                          </span>
                        </span>
                        <div className="flex flex-row gap-x-1">
                          <span className="text-[10px] bg-purple-300/50 text-purple-500 border border-purple-500 px-1.5 rounded">
                            {/* {product?.store?.title} */}
                          </span>
                          <span className="text-[10px] bg-indigo-300/50 text-indigo-500 border border-indigo-500 px-1.5 rounded">
                            {product?.brand?.title}
                          </span>
                          <span className="text-[10px] bg-blue-300/50 text-blue-500 border border-blue-500 px-1.5 rounded">
                            {product?.category?.title}
                          </span>
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
                <button
                  type="button"
                  className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  onClick={() => router.push("/checkout")}
                >
                  View Cart
                </button>
              </>
            )}
          </div>
        </OutsideClick>
      )}
    </>
  );
};

export default MyCart;

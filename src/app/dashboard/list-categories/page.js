"use client";

import DemoteCategory from "@/components/dashboard/DemoteCategory";
import Pencil from "@/components/icons/Pencil";
import Dashboard from "@/components/shared/layouts/Dashboard";
import DashboardLading from "@/components/shared/skeletonLoading/DashboardLading";
import { useGetCategoriesQuery } from "@/services/category/categoryApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ListCategories = () => {
  const {
    data: categoriesData,
    error: categoriesError,
    isLoading,
  } = useGetCategoriesQuery();
  const categories = categoriesData?.data || [];
  const router = useRouter();

  // useEffect(() => {
  //   if (categoriesError) {
  //     // alert(categoriesError?.data?.description);
  //   }
  // }, [categoriesError]);

  return (
    <Dashboard>
      {isLoading || categories?.length === 0 ? (
        <DashboardLading />
      ) : (
        <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          {categories.map((category) => (
            <div
              key={category?._id}
              className="flex flex-col gap-y-2 border p-4 rounded relative"
            >
              <Image
                // src={`${process.env.NEXT_PUBLIC_NODE_URL}/${category?.thumbnail?.url}`}
                src={category?.thumbnail?.url}
                alt={category?.thumbnail?.public_id}
                height={30}
                width={50}
                className="rounded h-[30px] w-[50px] object-cover"
              />
              <article className="flex flex-col gap-y-1">
                <h2 className="">{category?.title}</h2>
                <p className="text-xs line-clamp-2 mb-1.5">
                  {category?.description}
                </p>
                <p className="text-xs flex flex-col gap-y-2">
                  <p className="text-xs flex flex-row gap-2 overflow-x-auto scrollbar-hide">
                    {category?.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-purple-100/50 border border-purple-500 text-purple-500 px-1.5 rounded whitespace-nowrap"
                      >
                        {`#${tag}`}
                      </span>
                    ))}
                  </p>
                  <span className="!text-xs bg-indigo-100/50 border border-indigo-500 text-indigo-500 rounded w-fit px-2 whitespace-nowrap">
                    {category?.products?.length} Products
                  </span>
                </p>
              </article>

              <div className="absolute top-2 right-2 flex flex-row gap-x-2">
                {!category?.trashable && <DemoteCategory category={category} />}
                <button
                  className="bg-green-50 border border-green-900 p-0.5 rounded-secondary text-green-900"
                  onClick={() =>
                    router.push(`/dashboard/list-categories/${category?._id}`)
                  }
                >
                  <Pencil />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Dashboard>
  );
};

export default ListCategories;

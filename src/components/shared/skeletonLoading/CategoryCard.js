import React from "react";

const CategoryCard = () => {
  return (
    <section className="flex flex-row gap-x-2.5 w-full">
      <div className="h-8 w-8 rounded-secondary bg-gray-200 animate-pulse" />
      <div className="flex flex-col gap-y-1 w-full">
        <div className="flex-1 h-4 rounded-secondary bg-gray-200 animate-pulse" />
        <div className="flex-1 h-2 w-1/2 rounded-secondary bg-gray-200 animate-pulse" />
      </div>
    </section>
  );
};

export default CategoryCard;

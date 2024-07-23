import React from "react";
import DetailCard from "./DetailCard";

const Description = ({ product }) => {
  return (
    <section className="flex flex-col gap-y-2.5">
      <div className="flex flex-row gap-x-2 items-center">
        <span className="whitespace-nowrap text-sm text-black">
          Details of this product
        </span>
        <hr className="w-full" />
      </div>
      <article className="flex flex-col gap-y-4">
        <p className="text-sm">{product?.summary}</p>
        <div className="flex flex-col gap-y-4">
          {product?.features?.map((explanation, index) => (
            <DetailCard
              key={index}
              title={explanation?.title}
              content={explanation?.content}
            />
          ))}
        </div>
      </article>
    </section>
  );
};

export default Description;

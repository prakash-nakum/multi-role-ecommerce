import LoadImage from "../shared/LoadImage";
import Discount from "../icons/Discount";
import SoldOut from "../icons/SoldOut";
import Arrival from "../icons/Arrival";
import DetailCard from "./DetailCard";

const Left = ({ product }) => {
  // Function to determine the column span class
  function getColumnSpanClass(index, totalThumbnails) {
    if (totalThumbnails === 1) {
      return "col-span-12";
    } else if (totalThumbnails === 2) {
      return index <= 1 ? "col-span-6" : "col-span-6";
    } else if (totalThumbnails === 3) {
      return index === 0 ? "col-span-12" : "col-span-6";
    } else if (totalThumbnails === 4) {
      return "col-span-6";
    } else if (totalThumbnails === 5) {
      return index <= 1 ? "col-span-6" : "col-span-4";
    } else {
      return "";
    }
  }

  const hashTags = [
    ...(product?.category?.tags || []),
    ...(product?.brand?.tags || []),
    // ...(product?.store?.tags || []),
  ].filter((tag) => tag !== undefined);
  return (
    <section className="lg:col-span-6 md:col-span-6 col-span-12 flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-4">
        <LoadImage
          src={product?.thumbnail?.url}
          alt={product?.thumbnail?.public_id}
          width={480}
          height={200}
          // src={svgData}
          // src={`${process.env.NEXT_PUBLIC_NODE_URL}/${product?.thumbnail?.url}`}
          className="rounded w-full object-cover"
        />
        <div className="grid grid-cols-12 gap-4">
          {/* <div
            id="my-node"
            className="text-center w-100"
            dangerouslySetInnerHTML={{ __html: svgData }}
          ></div> */}

          {product?.gallery?.map((thumbnail, index) => (
            <LoadImage
              // src={`${process.env.NEXT_PUBLIC_NODE_URL}/${thumbnail?.url}`}
              src={thumbnail?.url}
              key={index}
              alt={thumbnail?.public_id}
              className={
                "rounded object-center max-w-full w-full" +
                " " +
                getColumnSpanClass(index, product.gallery.length)
              }
              width={480}
              height={200}
            />
          ))}
        </div>
      </div>
      <article className="flex flex-col gap-y-4">
        <div className="flex flex-row gap-x-2.5">
          <Badge className="text-indigo-800 bg-indigo-100">
            {product?.variations?.colors + " " + "Colors"}
          </Badge>
          <Badge className="text-purple-800 bg-purple-100">
            {product?.variations?.sizes + " " + "Sizes"}
          </Badge>
          {product?.campaign?.state === "discount" && (
            <Badge className="text-cyan-800 bg-cyan-100 flex flex-row items-center gap-x-1">
              <Discount /> {product?.campaign?.title}
            </Badge>
          )}
          {product?.campaign?.state === "sold-out" && (
            <Badge className="text-cyan-800 bg-cyan-100 flex flex-row items-center gap-x-1">
              <SoldOut /> {product?.campaign?.title}
            </Badge>
          )}
          {product?.campaign?.state === "arrival" && (
            <Badge className="text-cyan-800 bg-cyan-100 flex flex-row items-center gap-x-1">
              <Arrival /> {product?.campaign?.title}
            </Badge>
          )}
          {product?.campaign?.state === "on-sale" && (
            <Badge className="text-blue-800 bg-blue-100 flex flex-row items-center gap-x-1">
              <Arrival /> {product?.campaign?.title}
            </Badge>
          )}
        </div>
        <div className="flex flex-col gap-y-2.5">
          <DetailCard
            title={`Category: ${product?.category?.title}`}
            content={product?.category?.keynotes}
          />
          <DetailCard
            title={`Brand: ${product?.brand?.title}`}
            content={product?.brand?.keynotes}
          />
          {/* <DetailCard
            title={`Store: ${product?.store?.title}`}
            content={product?.store?.keynotes}
          /> */}

          <div className="flex flex-row flex-wrap gap-1 mt-4">
            {hashTags.map((hashTag, index) => (
              <span
                key={index}
                className="!text-xs border px-2 py-0.5 rounded-primary"
              >{`#${hashTag}`}</span>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
};

function Badge({ props, children, className }) {
  return (
    <span
      className={
        "px-3 py-1 rounded text-xs w-fit" + (className ? " " + className : "")
      }
      {...props}
    >
      {children}
    </span>
  );
}

export default Left;

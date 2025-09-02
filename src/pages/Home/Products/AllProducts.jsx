import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../Hooks/useAxios";
import dogImg from "../../../assets/image/cute-dog-mid.png";
import { Link } from "react-router";
import Loading from "../../../Shared/Loading/Loading";
const AllProducts = () => {
  const axiosInstance = useAxios();
  // TanStack Query to fetch products
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axiosInstance.get("/homepage/products");
      return response.data;
    },
  });

  if (isLoading) return <Loading />;
  return (
    <div className="bg-light-secondary py-12 lg:py-24">
      <div className="container mx-auto">
        <h2 className="text-light-text text-2xl lg:text-[36px] font-primary mb-8">
          Trending Pet Products
        </h2>

        {/* card-1 and card-2 main container  */}
        <div
          className="pt-6 md:flex md:gap-6
          "
        >
          {/* card-1 section container  */}
          <div className="mb-6 md:mb-0 md:w-1/3">
            {/* t-shirt for dog container  */}
            <div className="bg-[#F9DF8A] rounded-xl px-4 md:px-9 h-full">
              {/* dog shirt content  */}
              <div className="relative top-6 md:top-24 md:left-5">
                {/* title  */}
                <h1 className="text-black font-secondary font-bold text-xl lg:text-[2rem]">
                  T- Shirt For Dogs
                </h1>
                <p className="text-[rgba(17, 17, 17, 0.7)] font-secondary w-full md:w-8/12 my-[21px]">
                  Discover a world of treats, toys, and essentials handpicked
                  for{" "}
                </p>
                <button className="btn bg-white font-secondary py-3 px-6 md:px-8 border-none text-xl hover:bg-[#ffdc26]">
                  Shop Now
                </button>
              </div>
              {/* dog shirt imgae  */}
              <div className="flex items-center justify-end">
                <img className="w-2/4 md:w-6/12" src={dogImg} alt="" />
              </div>
            </div>
          </div>

          {/* card-2-big container section  */}
          <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {/* child-card-1  */}

            {products?.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg border border-light-text/10 p-4 hover:shadow-md transition-shadow duration-200"
              >
                {/* Main content: image on left, content and button on right */}
                <div className="flex items-center gap-6">
                  {/* image with background on the left */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-[#fff9f4] rounded-lg p-3 flex items-center justify-center">
                      <img
                        className="w-full h-full object-contain rounded-md"
                        src={product?.productImage}
                        alt={product?.productName}
                      />
                    </div>
                  </div>

                  {/* content and button on the right */}
                  <div className="flex-1 min-w-0">
                    {/* category */}
                    <h5 className="sora-font text-light-text/70 text-xs mb-2">
                      Category:{" "}
                      <span className="font-bold">
                        {product?.productCategory}
                      </span>
                    </h5>
                    {/* title and price  */}
                    <div className="mb-3">
                      <h1 className="text-light-text font-secondary text-sm font-medium mb-1 line-clamp-2">
                        {product?.productName}
                      </h1>
                      <span className="font-secondary font-bold text-base">
                        $ {product?.productPrice}
                      </span>
                    </div>

                    {/* See More button aligned with content */}
                    <div className="flex justify-start">
                      <Link to={`/pet-details/${product._id}`}>
                        <button className="bg-light-accent hover:bg-light-accent/90 text-light-text font-secondary font-medium text-sm py-2 px-4 rounded-md transition-all duration-200 hover:scale-105 hover:shadow-sm border border-light-accent/20 cursor-pointer">
                          See More
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;

import React from "react";
import { useParams } from "react-router";
import useAxios from "../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";

const PetDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();

  const {
    data: allProducts = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const response = await axiosInstance.get("/products");
      return response.data || [];
    },
  });

  if (isLoading) return <Loading />;
  if (isError) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <p className="text-red-500">
          {error?.message || "Failed to load details"}
        </p>
      </div>
    );
  }

  const product = allProducts.find((p) => p._id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-light-text text-2xl font-primary mb-2">
          Product not found
        </h2>
        <p className="text-light-text/70">
          The item you are looking for does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-light-secondary py-12 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header / Breadcrumb placeholder */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-light-text text-xl sm:text-2xl lg:text-3xl font-primary">
            {product?.productName}
          </h1>
          <p className="text-light-text/70 text-sm mt-1">
            Category:{" "}
            <span className="font-semibold text-light-text">
              {product?.productCategory}
            </span>
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          {/* Image Section */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl border border-light-text/10 p-4 sm:p-6 flex items-center justify-center h-full">
              <img
                src={product?.productImage}
                alt={product?.productName}
                className="w-auto lg:w-22 object-contain rounded-lg max-h-[440px] sm:max-h-[520px] lg:max-h-[900px]"
              />
            </div>
          </div>

          {/* Info Section */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-xl border border-light-text/10 p-4 sm:p-6">
              {/* Price and Stock */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="text-light-text/70 text-sm">Price</p>
                  <p className="text-light-text font-secondary text-2xl sm:text-3xl font-bold">
                    $ {product?.productPrice}
                  </p>
                </div>
                <div className="sm:text-right">
                  <p className="text-light-text/70 text-sm">Quantity</p>
                  <p className="text-light-text font-secondary text-xl font-semibold">
                    {product?.productStock ?? 0}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <h3 className="text-light-text font-secondary font-semibold mb-2">
                  Description
                </h3>
                <p className="text-light-text/80 leading-relaxed whitespace-pre-line">
                  {product?.productDescription}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button className="w-full sm:w-auto bg-light-accent hover:bg-light-accent/90 text-light-text font-secondary font-medium text-sm py-3 px-5 rounded-md transition-colors">
                  Ask about this pet
                </button>
                <button
                  disabled={(product?.productStock ?? 0) <= 0}
                  className="w-full sm:w-auto bg-light-text text-white hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed font-secondary font-medium text-sm py-3 px-5 rounded-md transition-opacity"
                >
                  {(product?.productStock ?? 0) > 0
                    ? "Add to Cart"
                    : "Out of Stock"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;

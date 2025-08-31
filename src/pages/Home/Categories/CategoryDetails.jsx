import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../Hooks/useAxios";

const CategoryDetails = () => {
  const { categoryName } = useParams();
  const axiosInstance = useAxios();

  // TanStack Query to fetch products
  const { data: products, isLoading } = useQuery({
    queryKey: ["products", categoryName],
    queryFn: async () => {
      const response = await axiosInstance.get("/products");
      return response.data;
    },
  });

  const filteredProducts = products?.filter(
    (p) => p.productCategory === categoryName
  );
  console.log(filteredProducts);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl lg:text-3xl font-primary font-bold text-light-text mb-8">
        Category: {categoryName}
      </h1>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-light-text mt-4 text-lg">Loading products...</p>
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl border border-light-text/10 overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              {/* Product Image Section */}
              <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 p-4">
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-light-accent/10 text-light-accent border border-light-accent/20">
                    {product?.productCategory}
                  </span>
                </div>
                <div className="h-full flex items-center justify-center">
                  <img
                    className="h-32 w-32 object-contain group-hover:scale-110 transition-transform duration-300"
                    src={product?.productImage}
                    alt={product?.productName}
                  />
                </div>
              </div>

              {/* Product Content Section */}
              <div className="p-5">
                {/* Product Name */}
                <h3 className="font-secondary font-semibold text-light-text text-lg mb-2 line-clamp-2 group-hover:text-light-accent transition-colors duration-200">
                  {product?.productName}
                </h3>

                {/* Product Description */}
                <p className="text-light-text/70 text-sm mb-4 line-clamp-2 font-secondary">
                  {product?.description ||
                    "Premium quality pet product for your beloved companion."}
                </p>

                {/* Price and Button Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-light-accent">
                      ${product?.productPrice}
                    </span>
                    <span className="text-sm text-light-text/50 line-through">
                      ${(product?.productPrice * 1.2).toFixed(2)}
                    </span>
                  </div>

                  <button className="bg-light-accent hover:bg-light-accent/90 text-light-text font-secondary font-semibold py-2.5 px-5 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg border border-light-accent/20 flex items-center space-x-2">
                    <span>View Details</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Products State */}
      {filteredProducts && filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-light-text text-lg">
            No products found in this category.
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryDetails;

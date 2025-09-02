import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import { Link } from "react-router";
import Loading from "../../Shared/Loading/Loading.jsx";
import toast from "react-hot-toast";

const PublicAllProducts = () => {
  const axiosInstance = useAxios();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["public-products"],
    queryFn: async () => {
      const response = await axiosInstance.get("/products");
      return response.data || [];
    },
  });

  const categories = useMemo(() => {
    const set = new Set();
    (products || []).forEach((p) => {
      if (p?.productCategory) set.add(p.productCategory);
    });
    return Array.from(set).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return (products || []).filter((p) => {
      const matchesSearch = term
        ? (p?.productName || "").toLowerCase().includes(term) ||
          (p?.productDescription || "").toLowerCase().includes(term)
        : true;
      const matchesCategory = selectedCategory
        ? p?.productCategory === selectedCategory
        : true;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const handleAddToCart = (product) => {
    if (!product || (product?.productStock ?? 0) <= 0) return;
    // Placeholder cart action; integrate with real cart API/context later
    toast.success(`${product?.productName || "Product"} added to cart`);
  };

  if (isLoading) return <Loading />;
  if (isError) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <p className="text-red-500">
          {error?.message || "Failed to load products"}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-light-secondary py-8 sm:py-12 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-light-text text-xl sm:text-2xl lg:text-[36px] font-primary mb-6 sm:mb-8">
          All Products
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
          <aside className="md:col-span-3 bg-white p-4 sm:p-5 rounded-lg border border-light-text/10 h-fit md:sticky md:top-20">
            <h3 className="text-light-text font-secondary font-semibold mb-3 sm:mb-4">
              Filters
            </h3>

            <div className="mb-4">
              <label className="block text-sm text-light-text/70 mb-2">
                Search
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full px-3 py-2 border border-light-text/20 rounded-md focus:outline-none focus:ring-2 focus:ring-light-accent"
              />
            </div>

            <div>
              <label className="block text-sm text-light-text/70 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-light-text/20 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-light-accent"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </aside>

          <section className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg border border-light-text/10 p-4 hover:shadow-md transition-shadow duration-200"
              >
                <div className="sm:flex items-center sm:gap-4">
                  <div className="flex-shrink-0 flex justify-center sm:block mb-3 sm:mb-0">
                    <div className="w-22 h-22 sm:w-24 sm:h-24 bg-[#fff9f4] rounded-lg p-3 flex items-center justify-center">
                      <img
                        className="w-9/12 h-full object-contain rounded-md"
                        src={product?.productImage}
                        alt={product?.productName}
                      />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h5 className="sora-font text-light-text/70 text-[11px] sm:text-xs mb-1">
                      Category:{" "}
                      <span className="font-bold">
                        {product?.productCategory}
                      </span>
                    </h5>
                    <h1 className="text-light-text font-secondary text-sm sm:text-base font-medium mb-1 line-clamp-2">
                      {product?.productName}
                    </h1>
                    <div className="flex items-center justify-between">
                      <span className="font-secondary font-bold text-base sm:text-lg">
                        $ {product?.productPrice}
                      </span>
                      <span className="text-[11px] sm:text-xs text-light-text/70">
                        Qty:{" "}
                        <span className="font-semibold text-light-text">
                          {product?.productStock ?? 0}
                        </span>
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-start gap-2 mt-3">
                      <Link className="w-full sm:w-auto">
                        <button className="w-full sm:w-auto bg-light-accent hover:bg-light-accent/90 text-light-text font-secondary font-medium text-sm py-1 xl:py-2 xl:whitespace-nowrap px-4 rounded-md transition-all duration-200 hover:scale-105 hover:shadow-sm border border-light-accent/20 cursor-pointer">
                          See More
                        </button>
                      </Link>
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={(product?.productStock ?? 0) <= 0}
                        className="w-full sm:w-auto bg-light-text text-white hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed font-secondary font-medium text-sm py-1 xl:py-2  xl:px-3  xl:whitespace-nowrap px-4 rounded-md transition-all duration-200 cursor-pointer"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center text-light-text/70 py-10">
                No products found.
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default PublicAllProducts;

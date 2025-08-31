import axios from "axios";
import React, { useState } from "react";
import { FiUpload, FiPlus } from "react-icons/fi";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const AddProducts = () => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const axiosSecure = useAxiosSecure();

  // TanStack Query to fetch products
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axiosSecure.get("/homepage/products");
      return response.data;
    },
  });
  // Category options for react-select
  const categoryOptions = [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
    { value: "bird", label: "Birds " },
    { value: "fish", label: "Fish" },
    { value: "rabbit", label: "Rabbit" },
    { value: "small-pet", label: "Small Pet" },
  ];

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (image) {
      setPreviewUrl(URL.createObjectURL(image));
    }
    const formData = new FormData();
    formData.append("image", image);

    const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_Imgbb_Key
    }`;
    const res = await axios.post(imagUploadUrl, formData);

    setProfilePic(res.data.data.url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const formDataObject = Object.fromEntries(formData);

    const productData = {
      ...formDataObject,
      productImage: profilePic,
    };
    axiosSecure
      .post("/add-product", productData)
      .then((res) => {
        console.log("res", res);
        toast.success("Product added successfully");
      })
      .catch((err) => {
        console.log("err", err);
      });

    console.log("productData", productData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Add New Product
          </h2>
          <p className="text-gray-600">
            Fill in the details below to add a new product to your shop.
          </p>
        </div>

        {/* Products Data Display */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Current Products
          </h3>
          {isLoading && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">Loading products...</p>
            </div>
          )}
          {error && (
            <div className="text-red-600 p-3 bg-red-50 rounded-md">
              Error loading products: {error.message}
            </div>
          )}
          {products && (
            <div className="text-sm text-gray-600">
              <p>Total Products: {products.length || 0}</p>
              {products.length > 0 && (
                <p className="mt-2">Latest: {products[0]?.name || "N/A"}</p>
              )}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Image Upload */}
          <div>
            <label
              htmlFor="productImage"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Product Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
              <div className="space-y-1 text-center">
                {previewUrl ? (
                  <div className="mb-4">
                    <img
                      src={previewUrl}
                      alt="Product preview"
                      className="mx-auto h-32 w-32 object-cover rounded-lg border"
                    />
                  </div>
                ) : (
                  <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                )}
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="productImage"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="productImage"
                      name="productImage"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleImageUpload}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

          {/* Product Name */}
          <div>
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="productPrice"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Price
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                id="productPrice"
                name="productPrice"
                step="0.01"
                min="0"
                className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="productCategory"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Category
            </label>
            <Select
              id="productCategory"
              name="productCategory"
              options={categoryOptions}
              className="react-select-container"
              classNamePrefix="react-select"
              placeholder="Select a category"
              isSearchable
              isClearable
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="productDescription"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="productDescription"
              name="productDescription"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter product description..."
              required
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-light-text bg-light-accent hover:bg-light-accent/90 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <FiPlus className="mr-2 h-5 w-5" />
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;

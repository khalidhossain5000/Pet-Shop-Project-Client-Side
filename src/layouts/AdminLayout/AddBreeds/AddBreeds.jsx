import axios from "axios";
import React, { useState } from "react";
import Select from "react-select";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddBreeds = () => {
  const [previewUrl, setPreviewUrl] = useState();
  const [breedsPic, setBreedsPic] = useState();
  const axiosSecure = useAxiosSecure();
  const categoryOptions = [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
    { value: "bird", label: "Bird" },
    { value: "fish", label: "Fish" },
    { value: "rabbit", label: "Rabbit" },
    { value: "other", label: "Other" },
  ];

  const sizeOptions = [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
  ];
  const handleBreedImage = async (e) => {
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

    setBreedsPic(res.data.data.url);
  };

  const handleBreedUpload = (e) => {
    e.preventDefault();
    const form = e.target;
    const formDataObject = Object.fromEntries(new FormData(form));

    const breedData = {
      ...formDataObject,
      breedImage: breedsPic,
    };
    axiosSecure
      .post("/add-breeds", breedData)
      .then((res) => {
        console.log(res);
        // SweetAlert2 success message with theme colors
        Swal.fire({
          title: "Breed Submitted Successfully!",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#3B82F6", // Blue accent color
          background: "#F0F9FF", // Light blue background
          color: "#1F2937", // Dark text color
          customClass: {
            popup: "rounded-xl border border-blue-200 shadow-lg",
            title: "font-primary font-bold text-blue-800",
            content: "font-secondary text-blue-700",
            confirmButton:
              "font-secondary font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors",
          },
        });
        // Reset form
        setPreviewUrl(null);
        setBreedsPic(null);
        e.target.reset();
      })
      .catch((error) => {
        console.log(error);
        // SweetAlert2 error message
        Swal.fire({
          title: "Error!",
          text: "Failed to submit pet. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#ef4444",
          background: "#FEF2F2", // Light red background
          color: "#1F2937", // Dark text color
          customClass: {
            popup: "rounded-xl border border-red-200 shadow-lg",
            title: "font-primary font-bold text-red-800",
            content: "font-secondary text-red-700",
            confirmButton:
              "font-secondary font-semibold px-8 py-3 rounded-lg hover:bg-red-700 transition-colors",
          },
        });
      });
  };
  console.log(breedsPic);
  return (
    <div className="bg-light-secondary py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl lg:text-3xl font-primary font-bold text-light-text mb-8 text-center">
          Add Breeds
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
          <form
            onSubmit={handleBreedUpload}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Breed Name */}
            <div>
              <label
                htmlFor="breedName"
                className="block text-sm font-medium text-light-text mb-2"
              >
                Breed Name
              </label>
              <input
                id="breedName"
                name="breedName"
                type="text"
                placeholder="Enter breed name"
                className="w-full px-3 py-2 border border-light-text/20 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-light-accent focus:border-light-accent"
              />
            </div>

            {/* Pet Category (React Select) */}
            <div>
              <label
                htmlFor="petCategory"
                className="block text-sm font-medium text-light-text mb-2"
              >
                Pet Category
              </label>
              <Select
                inputId="petCategory"
                name="petCategory"
                options={categoryOptions}
                className="react-select-container"
                classNamePrefix="react-select"
                placeholder="Select category"
                isSearchable
              />
            </div>

            {/* Origin */}
            <div>
              <label
                htmlFor="origin"
                className="block text-sm font-medium text-light-text mb-2"
              >
                Origin
              </label>
              <input
                id="origin"
                name="origin"
                type="text"
                placeholder="e.g., Germany, United States"
                className="w-full px-3 py-2 border border-light-text/20 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-light-accent focus:border-light-accent"
              />
            </div>

            {/* Size */}
            <div>
              <label
                htmlFor="size"
                className="block text-sm font-medium text-light-text mb-2"
              >
                Size
              </label>
              <Select
                inputId="size"
                name="size"
                options={sizeOptions}
                className="react-select-container"
                classNamePrefix="react-select"
                placeholder="Select size"
                isSearchable
              />
            </div>

            {/* Nature */}
            <div>
              <label
                htmlFor="nature"
                className="block text-sm font-medium text-light-text mb-2"
              >
                Nature
              </label>
              <input
                id="nature"
                name="nature"
                type="text"
                placeholder="e.g., Friendly, Energetic, Calm"
                className="w-full px-3 py-2 border border-light-text/20 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-light-accent focus:border-light-accent"
              />
            </div>

            {/* Color */}
            <div>
              <label
                htmlFor="color"
                className="block text-sm font-medium text-light-text mb-2"
              >
                Color
              </label>
              <input
                id="color"
                name="color"
                type="text"
                placeholder="e.g., Black, Brown, White, Mixed"
                className="w-full px-3 py-2 border border-light-text/20 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-light-accent focus:border-light-accent"
              />
            </div>

            {/* Health Issues */}
            <div>
              <label
                htmlFor="healthIssues"
                className="block text-sm font-medium text-light-text mb-2"
              >
                Health Issues
              </label>
              <input
                id="healthIssues"
                name="healthIssues"
                type="text"
                placeholder="e.g., Hip dysplasia, Heart conditions"
                className="w-full px-3 py-2 border border-light-text/20 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-light-accent focus:border-light-accent"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label
                htmlFor="breedImage"
                className="block text-sm font-medium text-light-text mb-2"
              >
                Breed Image
              </label>
              {previewUrl ? (
                <div className="mt-3 mb-4">
                  <div className="relative inline-block">
                    <img
                      src={previewUrl}
                      alt="Breed preview"
                      className="h-16 w-16 object-cover rounded-lg border"
                    />
                    <div className="absolute -top-2 -right-2 flex gap-1">
                      {/* Change Image Button */}
                      <label className="bg-light-accent hover:bg-light-accent/90 text-light-text p-1 rounded-full cursor-pointer transition-colors duration-200">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                        <input
                          type="file"
                          onChange={handleBreedImage}
                          accept="image/*"
                          className="hidden"
                        />
                      </label>
                      {/* Remove Image Button */}
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewUrl(null);
                          setBreedsPic(null);
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-full transition-colors duration-200"
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <input
                  id="breedImage"
                  onChange={handleBreedImage}
                  name="breedImage"
                  type="file"
                  accept="image/*"
                  className="w-full text-light-text file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-light-accent file:text-light-text hover:file:bg-light-accent/90 cursor-pointer"
                />
              )}
            </div>

            {/* Description/About */}
            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-light-text mb-2"
              >
                Description/About
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                placeholder="Write a detailed description about this breed, including characteristics, temperament, care requirements..."
                className="w-full px-3 py-2 border border-light-text/20 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-light-accent focus:border-light-accent"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-light-accent hover:bg-light-accent/90 text-light-text font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer transform active:scale-95"
              >
                Add Breed
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBreeds;

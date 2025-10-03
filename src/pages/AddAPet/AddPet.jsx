import axios from "axios";
import React, { useState } from "react";
import Select from "react-select";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddPet = () => {
  const [previewUrl, setPreviewUrl] = useState();
  const [petPic, setPetPic] = useState();
  const axiosSecure = useAxiosSecure();
  const categoryOptions = [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
    { value: "bird", label: "Bird" },
    { value: "fish", label: "Fish" },
    { value: "rabbit", label: "Rabbit" },
    { value: "other", label: "Other" },
  ];

  const handlePetSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const formDataObject = Object.fromEntries(formData);

    const petData = {
      ...formDataObject,
      quantity:1,
      petPic,
      status: "pending",
    };
    //data send to the db start

    axiosSecure
      .post("/add-pet", petData)
      .then((res) => {
        console.log(res);
        // SweetAlert2 success message with theme colors
        Swal.fire({
          title: "Pet Submitted Successfully!",
          text: "Your pet has been sent for admin approval. Once approved, it will be posted on the platform.",
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
        setPetPic(null);
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

  const handlePetImage = async (e) => {
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

    setPetPic(res.data.data.url);
  };
  console.log(petPic);
  return (
    <div className="bg-light-secondary py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl lg:text-3xl font-primary font-bold text-light-text mb-8 text-center">
          Add A Pet
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <form
            onSubmit={handlePetSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Pet Name */}
            <div>
              <label
                htmlFor="petName"
                className="block text-sm font-medium text-light-text mb-2"
              >
                Pet Name
              </label>
              <input
                id="petName"
                name="petName"
                type="text"
                placeholder="Enter pet name"
                className="w-full px-3 py-2 border border-light-text/20 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-light-accent focus:border-light-accent"
              />
            </div>

            {/* Pet Categories (React Select) */}
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

            {/* Breed */}
            <div>
              <label
                htmlFor="breed"
                className="block text-sm font-medium text-light-text mb-2"
              >
                Breed
              </label>
              <input
                id="breed"
                name="breed"
                type="text"
                placeholder="Enter breed"
                className="w-full px-3 py-2 border border-light-text/20 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-light-accent focus:border-light-accent"
              />
            </div>

            {/* Age */}
            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium text-light-text mb-2"
              >
                Age
              </label>
              <input
                id="age"
                name="age"
                type="text"
                placeholder="e.g., 2 years"
                className="w-full px-3 py-2 border border-light-text/20 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-light-accent focus:border-light-accent"
              />
            </div>

            {/* Gender */}
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-light-text mb-2"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                className="w-full px-3 py-2 border border-light-text/20 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-light-accent focus:border-light-accent"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>

            {/* Size */}
            <div>
              <label
                htmlFor="size"
                className="block text-sm font-medium text-light-text mb-2"
              >
                Size
              </label>
              <select
                id="size"
                name="size"
                className="w-full px-3 py-2 border border-light-text/20 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-light-accent focus:border-light-accent"
              >
                <option value="">Select size</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
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
                placeholder="e.g., Brown & White"
                className="w-full px-3 py-2 border border-light-text/20 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-light-accent focus:border-light-accent"
              />
            </div>

            {/* Health Status */}
            <div>
              <label
                htmlFor="healthStatus"
                className="block text-sm font-medium text-light-text mb-2"
              >
                Health Status
              </label>
              <input
                id="healthStatus"
                name="healthStatus"
                type="text"
                placeholder="e.g., Vaccinated, Dewormed"
                className="w-full px-3 py-2 border border-light-text/20 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-light-accent focus:border-light-accent"
              />
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-light-text mb-2"
              >
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="City, Country"
                className="w-full px-3 py-2 border border-light-text/20 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-light-accent focus:border-light-accent"
              />
            </div>

            {/* Price / Adoption Fee */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-light-text mb-2"
              >
                Price / Adoption Fee
              </label>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                className="w-full px-3 py-2 border border-light-text/20 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-light-accent focus:border-light-accent"
              />
            </div>

            {/* Pet Image Upload */}
            <div>
              <label
                htmlFor="petImage"
                className="block text-sm font-medium text-light-text mb-2"
              >
                Pet Image
              </label>

              {previewUrl ? (
                <div className="mt-3 mb-4">
                  <img
                    src={previewUrl}
                    alt="Product preview"
                    className=" h-16 w-16 object-cover rounded-lg border"
                  />
                </div>
              ) : (
                <input
                  onChange={handlePetImage}
                  id="petImage"
                  name="petImage"
                  type="file"
                  accept="image/*"
                  className="w-full text-light-text file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-light-accent file:text-light-text hover:file:bg-light-accent/90 cursor-pointer"
                />
              )}
            </div>

            {/* Descriptions */}
            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-light-text mb-2"
              >
                Descriptions
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                placeholder="Write a brief description..."
                className="w-full px-3 py-2 border border-light-text/20 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-light-accent focus:border-light-accent"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-light-accent hover:bg-light-accent/90 text-light-text font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPet;

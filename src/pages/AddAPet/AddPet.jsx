import React from "react";
import Select from "react-select";

const AddPet = () => {
  const categoryOptions = [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
    { value: "bird", label: "Bird" },
    { value: "fish", label: "Fish" },
    { value: "rabbit", label: "Rabbit" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="bg-light-secondary py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl lg:text-3xl font-primary font-bold text-light-text mb-8">
          Add A Pet
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <input
                id="petImage"
                name="petImage"
                type="file"
                accept="image/*"
                className="w-full text-light-text file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-light-accent file:text-light-text hover:file:bg-light-accent/90 cursor-pointer"
              />
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

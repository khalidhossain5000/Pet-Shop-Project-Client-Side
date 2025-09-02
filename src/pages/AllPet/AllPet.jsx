import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import useAxios from "../../../Hooks/useAxios";
import { Link } from "react-router";

const AllPet = () => {
  const axiosInstance = useAxios();
  const [filters, setFilters] = useState({
    category: null,
    size: null,
    gender: null,
    priceRange: null,
  });

  // TanStack Query to fetch pets
  const {
    data: pets,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pets"],
    queryFn: async () => {
      const response = await axiosInstance.get("/pets");
      return response.data;
    },
  });

  // Filter options
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

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "unknown", label: "Unknown" },
  ];

  const priceRangeOptions = [
    { value: "0-100", label: "$0 - $100" },
    { value: "100-500", label: "$100 - $500" },
    { value: "500-1000", label: "$500 - $1000" },
    { value: "1000+", label: "$1000+" },
  ];

  // Filter pets based on selected filters
  const filteredPets = pets?.filter((pet) => {
    if (filters.category && pet.productCategory !== filters.category.value)
      return false;
    if (filters.size && pet.size !== filters.size.value) return false;
    if (filters.gender && pet.gender !== filters.gender.value) return false;
    if (filters.priceRange) {
      const price = parseFloat(pet.productPrice);
      const [min, max] = filters.priceRange.value.split("-").map(Number);
      if (max && (price < min || price > max)) return false;
      if (!max && price < min) return false;
    }
    return true;
  });

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      category: null,
      size: null,
      gender: null,
      priceRange: null,
    });
  };

  return (
    <div className="bg-light-secondary min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-primary font-bold text-light-text mb-8 text-center">
          All Available Pets
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4 h-fit">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-light-text">
                  Filters
                </h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-light-accent hover:text-light-accent/80 font-medium"
                >
                  Clear All
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-light-text mb-2">
                  Pet Category
                </label>
                <Select
                  value={filters.category}
                  onChange={(option) =>
                    setFilters({ ...filters, category: option })
                  }
                  options={categoryOptions}
                  placeholder="Select category"
                  isClearable
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </div>

              {/* Size Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-light-text mb-2">
                  Size
                </label>
                <Select
                  value={filters.size}
                  onChange={(option) =>
                    setFilters({ ...filters, size: option })
                  }
                  options={sizeOptions}
                  placeholder="Select size"
                  isClearable
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </div>

              {/* Gender Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-light-text mb-2">
                  Gender
                </label>
                <Select
                  value={filters.gender}
                  onChange={(option) =>
                    setFilters({ ...filters, gender: option })
                  }
                  options={genderOptions}
                  placeholder="Select gender"
                  isClearable
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-light-text mb-2">
                  Price Range
                </label>
                <Select
                  value={filters.priceRange}
                  onChange={(option) =>
                    setFilters({ ...filters, priceRange: option })
                  }
                  options={priceRangeOptions}
                  placeholder="Select price range"
                  isClearable
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </div>

              {/* Results Count */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-light-text/70">
                  Showing {filteredPets?.length || 0} of {pets?.length || 0}{" "}
                  pets
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Pet Cards */}
          <div className="lg:w-3/4">
            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-light-accent mx-auto"></div>
                <p className="text-light-text mt-4 text-lg">Loading pets...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-12">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                  <p className="text-red-800 text-lg font-medium">
                    Error loading pets
                  </p>
                  <p className="text-red-600 mt-2">{error.message}</p>
                </div>
              </div>
            )}

            {/* Pets Grid */}
            {filteredPets && filteredPets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPets.map((pet) => (
                  <div
                    key={pet._id}
                    className="bg-white rounded-xl border border-light-text/10 overflow-hidden hover:shadow-xl transition-all duration-300 group"
                  >
                    {/* Pet Image Section */}
                    <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 p-4">
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-light-accent/10 text-light-accent border border-light-accent/20">
                          {pet?.petCategory}
                        </span>
                      </div>
                      <div className="h-full flex items-center justify-center">
                        <img
                          className="h-32 w-32 object-contain group-hover:scale-110 transition-transform duration-300"
                          src={pet?.petPic}
                          alt={pet?.petName}
                        />
                      </div>
                    </div>

                    {/* Pet Content Section */}
                    <div className="p-5">
                      {/* Pet Name */}
                      <h3 className="font-secondary font-semibold text-light-text text-lg mb-2 line-clamp-2 group-hover:text-light-accent transition-colors duration-200">
                        {pet?.petName}
                      </h3>

                      {/* Pet Details */}
                      <div className="space-y-2 mb-4">
                        <p className="text-light-text/70 text-sm">
                          <span className="font-medium">Breed:</span>{" "}
                          {pet?.breed || "N/A"}
                        </p>
                        <p className="text-light-text/70 text-sm">
                          <span className="font-medium">Age:</span>{" "}
                          {pet?.age || "N/A"}
                        </p>
                        <p className="text-light-text/70 text-sm">
                          <span className="font-medium">Gender:</span>{" "}
                          {pet?.gender || "N/A"}
                        </p>
                      </div>

                      {/* Price and Button Row */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline space-x-2">
                          <span className="text-2xl font-bold text-light-accent">
                            ${pet?.price}
                          </span>
                        </div>
                        <Link to={`/final-pet-details/${pet?._id}`}>
                          <button className="bg-light-accent hover:bg-light-accent/90 text-light-text font-secondary font-semibold py-2.5 px-5 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg border border-light-accent/20 flex items-center space-x-2 cursor-pointer">
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
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* No Pets Found */
              <div className="text-center py-12">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
                  <p className="text-light-text text-lg font-medium mb-2">
                    No pets found
                  </p>
                  <p className="text-light-text/70 text-sm">
                    Try adjusting your filters or check back later for new pets.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPet;

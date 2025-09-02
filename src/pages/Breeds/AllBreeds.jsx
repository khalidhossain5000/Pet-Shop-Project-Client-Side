import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import { Link } from "react-router";
import Loading from "../../Shared/Loading/Loading";

const AllBreeds = () => {
  const axiosInstance = useAxios();
  const [imageErrors, setImageErrors] = useState(new Set());

  // TanStack Query to fetch breeds
  const {
    data: breeds,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["breeds"],
    queryFn: async () => {
      const response = await axiosInstance.get("/breeds");
      return response.data;
    },
  });

  const handleImageError = (breedId) => {
    setImageErrors((prev) => new Set(prev).add(breedId));
  };
if (isLoading) return <Loading/>
  return (
    <div className="bg-light-secondary min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-primary font-bold text-light-text mb-8 text-center">
          All Pet Breeds
        </h1>

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-800 text-lg font-medium">
                Error loading breeds
              </p>
              <p className="text-red-600 mt-2">{error.message}</p>
            </div>
          </div>
        )}

        {/* Breeds Grid */}
        {breeds && breeds.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {breeds.map((breed) => (
              <div
                key={breed._id}
                className="bg-white rounded-xl border border-light-text/10 overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                {/* Breed Image Section */}
                <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 p-4">
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-light-accent/10 text-light-text border border-light-accent/20">
                      {breed?.petCategory}
                    </span>
                  </div>
                  <div className="h-full flex items-center justify-center">
                    {!imageErrors.has(breed._id) ? (
                      <img
                        className="h-48 w-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                        src={breed?.breedImage}
                        alt={breed?.breedName}
                        onError={() => handleImageError(breed._id)}
                      />
                    ) : (
                      <div className="h-48 w-48 bg-light-accent/20 rounded-lg flex items-center justify-center text-light-accent text-2xl font-bold">
                        {breed?.breedName?.charAt(0) || "B"}
                      </div>
                    )}
                  </div>
                </div>

                {/* Breed Content Section */}
                <div className="p-5">
                  {/* Breed Name */}
                  <h3 className="font-secondary font-semibold text-light-text text-lg mb-3 line-clamp-2 group-hover:text-light-accent transition-colors duration-200">
                    {breed?.breedName}
                  </h3>

                  {/* Breed Details */}
                  <div className="space-y-2 mb-4">
                    <p className="text-light-text/70 text-sm">
                      <span className="font-medium">Origin:</span>{" "}
                      {breed?.origin || "N/A"}
                    </p>
                    <p className="text-light-text/70 text-sm">
                      <span className="font-medium">Size:</span>{" "}
                      {breed?.size || "N/A"}
                    </p>
                    <p className="text-light-text/70 text-sm">
                      <span className="font-medium">Nature:</span>{" "}
                      {breed?.nature || "N/A"}
                    </p>
                    <p className="text-light-text/70 text-sm">
                      <span className="font-medium">Color:</span>{" "}
                      {breed?.color || "N/A"}
                    </p>
                  </div>

                  {/* Health Issues */}
                  {breed?.healthIssues && (
                    <div className="mb-4">
                      <p className="text-light-text/70 text-sm">
                        <span className="font-medium">Health Issues:</span>
                      </p>
                      <p className="text-light-text/60 text-xs mt-1">
                        {breed.healthIssues}
                      </p>
                    </div>
                  )}

                  {/* View Details Button */}
                  <Link to={`/breed-details/${breed._id}`}>
                    <button className="w-full bg-light-accent hover:bg-light-accent/90 text-light-text font-secondary font-semibold py-2.5 px-5 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg border border-light-accent/20 flex items-center justify-center space-x-2 cursor-pointer">
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
            ))}
          </div>
        ) : (
          /* No Breeds Found */
          <div className="text-center py-12">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
              <p className="text-light-text text-lg font-medium mb-2">
                No breeds found
              </p>
              <p className="text-light-text/70 text-sm">
                Check back later for available pet breeds.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBreeds;

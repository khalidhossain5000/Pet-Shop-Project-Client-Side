import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxios from "../../../Hooks/useAxios";
import Loading from "../../Shared/Loading/Loading";

const BreedDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  // TanStack Query to fetch breeds
  const { data: breeds, isLoading } = useQuery({
    queryKey: ["breeds"],
    queryFn: async () => {
      const response = await axiosInstance.get("/breeds");
      return response.data;
    },
  });
  if (isLoading) return <Loading />;
  const singleBreed = breeds.find((breed) => breed._id === id);
  console.log(singleBreed);
  return (
    <div className="py-12 lg:py-24">
      <div className="max-w-5xl mx-auto bg-[var(--color-light-secondary)] rounded-3xl shadow-xl overflow-hidden p-8 font-[var(--font-secondary)]">
        {/* Image + Basic Info */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Breed Image */}
          <div className="w-full md:w-1/2">
            <img
              src={singleBreed.breedImage}
              alt={singleBreed.breedName}
              className="w-full h-96 object-cover rounded-2xl shadow-md"
            />
          </div>

          {/* Info Section */}
          <div className="w-full md:w-1/2 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-primary font-bold text-light-text mb-2">
                {singleBreed.breedName}
              </h1>
              <p className="text-lg text-gray-600 capitalize mb-4">
                {singleBreed.petCategory}
              </p>

              <div className="grid grid-cols-2 gap-4 text-[var(--color-light-text)]">
                <p>
                  <span className="font-bold">Origin:</span>{" "}
                  {singleBreed.origin}
                </p>
                <p>
                  <span className="font-bold">Size:</span> {singleBreed.size}
                </p>
                <p>
                  <span className="font-bold">Nature:</span>{" "}
                  {singleBreed.nature}
                </p>
                <p>
                  <span className="font-bold">Color:</span> {singleBreed.color}
                </p>
                <p className="col-span-2">
                  <span className="font-bold">Health Issues:</span>{" "}
                  {singleBreed.healthIssues}
                </p>
                <h3 className="text-2xl font-bold text-light-text">
                  Price: ${singleBreed?.breedPrice}
                </h3>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-4 flex-wrap">
              <button className="px-6 py-3 rounded-2xl font-semibold shadow-md transition-all duration-300 bg-[var(--color-light-accent)] text-[var(--color-light-text)] hover:scale-105 hover:bg-[#FFD700]">
                Add to Cart
              </button>
              <button className="px-6 py-3 rounded-2xl font-semibold shadow-md transition-all duration-300 bg-[var(--color-light-text)] text-[var(--color-light-primary)] hover:bg-gray-900 hover:scale-105">
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-[var(--color-light-text)] mb-2">
            About {singleBreed.breedName}
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {singleBreed.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BreedDetails;

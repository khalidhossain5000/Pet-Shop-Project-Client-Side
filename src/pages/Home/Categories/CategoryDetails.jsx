import React from "react";
import { useParams } from "react-router";

const CategoryDetails = () => {
  const { id } = useParams();
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl lg:text-3xl font-primary font-bold text-light-text">
        Category: {id}
      </h1>
      {/* TODO: Fetch and display products/items for this category */}
    </div>
  );
};

export default CategoryDetails;

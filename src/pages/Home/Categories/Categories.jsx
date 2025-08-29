import React from "react";
import data from "./petcategorydata";
import { Link } from "react-router";
const Categories = () => {
  return (
    <div className="container mx-auto my-24 px-4 md:px-0">
      <h1 className="text-2xl lg:text-4xl font-primary font-bold text-light-text text-left mb-12">
        Browse By Categories
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-5">
        {/* card-1  */}

        {data.map((cat) => (
          <Link key={cat.id} to={`category/${cat.id}`}>
            <div className="bg-[#F9DF8A] rounded-xl text-center pb-5 md:pt-6 lg:pb-9 ">
              <img
                className="bg-white p-7 rounded-full mx-auto mt-8 mb-6"
                src={cat.image}
                alt=""
              />
              <h1 className="text-xl title-color mb-2 font-primary font-bold">
                {cat.name}
              </h1>
              <p className="font-secondary">3 items</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;

import React from "react";

const PersonalCarouselCard = ({ image, category, name, duration, temperature, alert }) => {
  return (
    <div className="bg-gradient-to-b from-white via-white to-lightGreen border-t-0 mb-5 h-xl w-50 border-8 border-white rounded-[40px] p-5 shadow-lg"> {/* Use shadow-md for a medium shadow */}
      <div className="relative">
        <img src={require(`../assets/${image}`)} alt={name} className="w-full h-64 object-contain rounded-t-lg" />
      </div>
      <div className="mt-4">
        <p className="text-gray-800">{category}</p>
        <p className="text-black font-bold text-3xl">{name}</p>
        <p className="text-black">{duration}</p>
      </div>
    </div>
  );
};

export default PersonalCarouselCard;

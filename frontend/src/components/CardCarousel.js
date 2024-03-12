import React from "react";

const CardCarousel = ({ headline, price, image }) => {
  return (
    <div className="relative bg-white rounded-lg shadow-md max-w-md h-full flex flex-col justify-center items-center">
      <div className="h-60 overflow-hidden flex justify-center items-center">
        <img
            src={require(`../assets/${image}`)}
            alt={headline}
            className="object-cover w-full h-auto max-h-full"
        />
      </div>
      <div className="p-4">
        <h2 className="text-3xl text-center font-bold text-dullGreen mb-4 h-10">{headline}</h2> {/* Set a fixed height for the headline section and truncate longer headlines */}
        <p className="text-3xl font-bold text-center text-navyBlue overflow-hidden overflow-ellipsis h-12">{price}</p> {/* Set a fixed height for the price section */}
      </div>
    </div>
  );
};

export default CardCarousel;

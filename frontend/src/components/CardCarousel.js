import React from "react";

const CardCarousel = ({ headline, price, user, answer, image, type }) => {
  if (type === "market") {
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
  ); }
  else if (type === "forum") {
    return (
      <div className="bg-skyBlue rounded-lg shadow-md max-w-md h-full">
      <div className="h-20 my-2 overflow-hidden flex justify-center items-center">
        <img
          src={image}
          width={50}
          height={50}
          alt={headline}
          className="object-cover rounded-full"
        />
      </div>
        <h2 className="text-xl text-center font-bold text-dullGreen mb-2 h-10">{user}</h2>
        <p className="text-xl font-bold text-center text-navyBlue overflow-hidden overflow-ellipsis h-20 mb-4">{headline}</p>
        <div className="p-4">
          <h2 className="font-bold mb-2">Top Answer</h2>
          <p className="mb-2 h-50">{answer}</p>
        </div>
    </div>
    );
  }
};

export default CardCarousel;

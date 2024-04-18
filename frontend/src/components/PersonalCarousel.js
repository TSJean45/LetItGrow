import React from "react";
import PersonalCarouselCard from "./PersonalCarouselCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const PersonalCarousel = ({ items, setActiveCard }) => {
  const handleSlideChange = (swiper) => {
    const updatedItems = items.map((item, index) => ({
      ...item,
      active: index === swiper.activeIndex,
    }));
    setActiveCard(updatedItems[swiper.activeIndex]);
  };

  return (
    <div className="container">
      <Swiper
        effect={"coverflow"}
        centeredSlides={true}
        loop={false}
        slidesPerView={3}
        spaceBetween={80}
        coverflowEffect={{
          rotate: 0,
          stretch: 1,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        modules={[EffectCoverflow, Pagination]}
        onSlideChange={handleSlideChange}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="bg-gradient-to-b from-white via-white to-lightGreen border-t-0 mb-5 h-xl w-50 border-8 border-white rounded-[40px] p-5 shadow-lg">
              {" "}
              {/* Use shadow-md for a medium shadow */}
              <div className="relative">
                <img
                  src={item && require(`../assets/${item.image}`)}
                  alt={item.name}
                  className="w-full h-64 object-contain rounded-t-lg"
                />
              </div>
              <div className="mt-4">
                <p className="text-gray-800">{item.category}</p>
                <p className="text-black font-bold text-3xl">{item.name}</p>
                <p className="text-black">{item.duration}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PersonalCarousel;

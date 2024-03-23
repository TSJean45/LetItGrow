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
            <PersonalCarouselCard key={index} {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PersonalCarousel;

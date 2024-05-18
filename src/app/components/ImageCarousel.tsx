"use client";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/swiper-bundle.css";

const ImageCarousel = () => {
  return (
    <section className="mt-20 pl-10 pr-10 pt-5 pb-5">
      <Swiper
        modules={[Pagination]}
        pagination={{ type: "bullets" }}
        style={{
          borderRadius: 5,
          borderStyle: "double",
          borderWidth: 5,
          borderColor: "darkgreen",
        }}
      >
        <SwiperSlide>
          <img src="/images/slide1.jpg" alt={"Photo 1"} />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/slide2.jpg" alt={"photo 2"} />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/slide3.jpg" alt={"photo 3"} />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default ImageCarousel;

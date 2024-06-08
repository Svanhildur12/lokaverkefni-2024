"use client";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/swiper-bundle.css";
import Image from "next/image";
import "swiper/swiper-bundle.css";
import "../globals.css";

const ImageCarousel = () => {
  return (
    <section className="mt-5 md:mt-20 pl-10 md:pl-20 lg:mt-10 lg:px-5 pr-10 md:pr-20 pt-5 pb-5 lg:mx-96">
      <Swiper
        modules={[Pagination]}
        pagination={{ type: "bullets" }}
        className="border-8 rounded-md border-double border-yellow-100"
      >
        <SwiperSlide>
          <Image
            className="w-fill h-fill  md:w-full"
            src="/images/plate1.jpg"
            alt={"Photo 1"}
            width={5000}
            height={5000}
            priority
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            className="w-fill h-fill  md:w-full"
            src="/images/plate2.jpg"
            alt={"photo 2"}
            width={4000}
            height={4000}
            priority
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            className="w-fill h-fill  md:w-full"
            src="/images/bolognese.jpg"
            alt={"photo 3"}
            width={4000}
            height={4000}
            priority
          />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default ImageCarousel;

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";

import "./HeroSlider.css";

const HeroSlider = () => {
  return (
    <section className="hero">
      <div className="container">
        <Swiper
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="content">
              <h3>
                Microsoft Xbox <br /> 360 Controller
              </h3>
            
            </div>

            <img
              src="/src/img/img2/future1.jpeg"
              alt="slider hero 1"
            />
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="content">
             
              <h3>
                Solar Energy <br /> Solutions
              </h3>
          
            </div>

            <img
              src="/src/img/img2/future3.jpeg"
              alt="slider hero 2"
            />
          </SwiperSlide>
           <SwiperSlide>
            <div className="content">
             
              <h3>
                Solar Energy <br /> Solutions
              </h3>
            
            </div>

            <img
              src="/src/img/img2/future2.jpeg"
              alt="slider hero 2"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default HeroSlider;

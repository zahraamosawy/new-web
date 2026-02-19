import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next";

import "swiper/css";
import "swiper/css/pagination";

import "./HeroSlider.css";

// import images correctly (IMPORTANT)
import img1 from "../../img/img2/future4.JPG";
import img2 from "../../img/img2/3.jpeg";
import img3 from "../../img/img2/future2.jpeg";

const HeroSlider = () => {
  const { t } = useTranslation();

  // slides data
  const slides = [
    {
      image: img1,
      titleKey: "hero.slide1.title",
    },
    {
      image: img2,
      titleKey: "hero.slide2.title",
    },
    {
      image: img3,
      titleKey: "hero.slide3.title",
    },
  ];

  // function to render multiline title
  const renderTitle = (key) =>
    t(key)
      .split("\n")
      .map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ));

  return (
    <section className="hero">
      <div className="container">

        <Swiper
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >

          {slides.map((slide, index) => (
            <SwiperSlide key={index}>

              {/* TEXT */}
              <div className="content">
                <h3>
                  {renderTitle(slide.titleKey)}
                </h3>
              </div>

              {/* IMAGE */}
              <img
                src={slide.image}
                alt={`slide-${index}`}
                className="hero-image"
              />

            </SwiperSlide>
          ))}

        </Swiper>

      </div>
    </section>
  );
};

export default HeroSlider;

import MainSlider from "@/src/components/sliders/MainSlider";
import TestimonialsCarousel from "@/src/components/sliders/TestimonialsCarousel";
import Layouts from "@/src/layouts/Layouts";
import { sliderProps } from "@/src/sliderProps";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

const Index = () => {
  return (
    <Layouts>
      {/* Section Started Slider *  /}
      <MainSlider />
      {/* Section About */}
      <section className="section kf-about section-bg">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-5">
              <div className="kf-titles">
                <div
                  className="kf-subtitle element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  About Us
                </div>
                <h3
                  className="kf-title element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  Organic &amp; Fresh Coffee <br />
                  Provider Center
                </h3>
              </div>
              <div
                className="kf-text element-anim-1 scroll-animate"
                data-animate="active"
              >
                <p>
                  Sed ut perspiciatis unde omnis iste natus error voluptate
                  accusantium doloremque laudantium, totam rem aperiam eaque
                  ipsa quae abillo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo. Nemo enim ipsluptatem quia
                  voluptas sit aspernatur aut odit aut fugit sed quia
                  consequuntur magni dolores eos qui ratione
                </p>
              </div>
              <div
                className="kf-about-quote element-anim-1 scroll-animate"
                data-animate="active"
              >
                <img src="images/quote_img.png" alt="image" />
                <div>
                  Quis autem vel eum iure reprehenderit in ealuptate velit esse
                  molestiae
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-7">
              <div
                className="kf-about-image element-anim-1 scroll-animate"
                data-animate="active"
              >
                <img src="images/about_img.png" alt="image" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Section Services */}
      <section className="section kf-services section-bg">
        <div className="container">
          <div className="kf-services-items row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
              <div
                className="kf-services-item element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="image kf-image-hover">
                  <Link href="menu-restaurant">
                    <img src="images/service1.jpg" alt="image" />
                  </Link>
                </div>
                <div className="desc">
                  <div className="icon">
                    <i className="las la-utensils" />
                  </div>
                  <h5 className="name">Restaurant Menu</h5>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
              <div
                className="kf-services-item element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="image kf-image-hover">
                  <Link href="menu-coffee">
                    <img src="images/service2.jpg" alt="image" />
                  </Link>
                </div>
                <div className="desc">
                  <div className="icon">
                    <i className="las la-coffee" />
                  </div>
                  <h5 className="name">Coffee Menu</h5>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
              <div
                className="kf-services-item element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="image kf-image-hover">
                  <Link href="services">
                    <img src="images/service3.jpg" alt="image" />
                  </Link>
                </div>
                <div className="desc">
                  <div className="icon">
                    <i className="las la-glass-cheers" />
                  </div>
                  <h5 className="name">Food Services</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Section Menu */}
      <section
        className="section kf-menu kf-parallax"
        style={{ backgroundImage: "url(images/category_bg.jpg)" }}
      >
        <div className="container">
          <div className="kf-titles align-center">
            <div
              className="kf-subtitle element-anim-1 scroll-animate"
              data-animate="active"
            >
              Choose Best Coffee
            </div>
            <h3
              className="kf-title element-anim-1 scroll-animate"
              data-animate="active"
            >
              Kaffen Popular Coffee Menu
            </h3>
          </div>
          <div
            className="kf-menu-items"
            style={{ backgroundImage: "url(images/menu_logo.png)" }}
          >
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                <div
                  className="kf-menu-item element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  <div className="image kf-image-hover">
                    <a href="images/menu1.jpg" className="has-popup-image">
                      <img src="images/menu1.jpg" alt="image" />
                    </a>
                  </div>
                  <div className="desc">
                    <h5 className="name">Americano Coffee</h5>
                    <div className="subname">
                      2/3 espresso, 1/3 streamed milk
                    </div>
                    <div className="price">$4.9</div>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                <div
                  className="kf-menu-item element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  <div className="image kf-image-hover">
                    <a href="images/menu2.jpg" className="has-popup-image">
                      <img src="images/menu2.jpg" alt="image" />
                    </a>
                  </div>
                  <div className="desc">
                    <h5 className="name">Espresso Coffee</h5>
                    <div className="subname">
                      2/3 espresso, 1/3 streamed milk
                    </div>
                    <div className="price">$4.9</div>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                <div
                  className="kf-menu-item element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  <div className="image kf-image-hover">
                    <a href="images/menu3.jpg" className="has-popup-image">
                      <img src="images/menu3.jpg" alt="image" />
                    </a>
                  </div>
                  <div className="desc">
                    <h5 className="name">Barista Pouring Syrup</h5>
                    <div className="subname">
                      2/3 espresso, 1/3 streamed milk
                    </div>
                    <div className="price">$3.5</div>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                <div
                  className="kf-menu-item element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  <div className="image kf-image-hover">
                    <a href="images/menu4.jpg" className="has-popup-image">
                      <img src="images/menu4.jpg" alt="image" />
                    </a>
                  </div>
                  <div className="desc">
                    <h5 className="name">Cold - Coffee</h5>
                    <div className="subname">
                      2/3 espresso, 1/3 streamed milk
                    </div>
                    <div className="price">$6.0</div>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                <div
                  className="kf-menu-item element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  <div className="image kf-image-hover">
                    <a href="images/menu5.jpg" className="has-popup-image">
                      <img src="images/menu5.jpg" alt="image" />
                    </a>
                  </div>
                  <div className="desc">
                    <h5 className="name">Cappuccino Arabica</h5>
                    <div className="subname">
                      2/3 espresso, 1/3 streamed milk
                    </div>
                    <div className="price">$2.8</div>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                <div
                  className="kf-menu-item element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  <div className="image kf-image-hover">
                    <a href="images/menu6.jpg" className="has-popup-image">
                      <img src="images/menu6.jpg" alt="image" />
                    </a>
                  </div>
                  <div className="desc">
                    <h5 className="name">Milk Cream Coffee</h5>
                    <div className="subname">
                      2/3 espresso, 1/3 streamed milk
                    </div>
                    <div className="price">$7.5</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Section Choose */}
      <section className="section kf-choose section-bg">
        <div className="container">
          <div className="kf-parallax-icon pi-1" data-jarallax-element={-60}>
            <div
              className="p-icon"
              style={{ backgroundImage: "url(images/parallax_icon1.png)" }}
            />
          </div>
          <div className="kf-parallax-icon pi-2" data-jarallax-element={-80}>
            <div
              className="p-icon"
              style={{ backgroundImage: "url(images/parallax_icon2.png)" }}
            />
          </div>
          <div className="kf-parallax-icon pi-3" data-jarallax-element={-40}>
            <div
              className="p-icon"
              style={{ backgroundImage: "url(images/parallax_icon3.png)" }}
            />
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
              <div
                className="kf-choose-image element-anim-1 scroll-animate"
                data-animate="active"
              >
                <img src="images/choose_img.jpg" alt="image" />
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-5 offset-lg-1 align-self-center">
              <div className="kf-titles">
                <div
                  className="kf-subtitle element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  Why Choose Us
                </div>
                <h3
                  className="kf-title element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  New London Coffee Founded For Extraordinary Test
                </h3>
              </div>
              <div
                className="kf-text element-anim-1 scroll-animate"
                data-animate="active"
              >
                <p>
                  Sed ut perspiciatis unde omnis iste natus error voluptate
                  accusantium doloremque laudantium, totam rem aperiam eaque
                  ipsa quae abillo inventore veritatis
                </p>
              </div>
              <div className="kf-choose-list">
                <ul>
                  <li
                    className="element-anim-1 scroll-animate"
                    data-animate="active"
                  >
                    <div className="icon">
                      <img src="images/choose_icon1.png" alt="image" />
                    </div>
                    <div className="desc">
                      <h5 className="name">Natural Coffee Beans</h5>
                      <div className="subname">
                        Sed ut perspiciatis unde omnis iste natus error
                        voluptate accusantium doloremque
                      </div>
                    </div>
                  </li>
                  <li
                    className="element-anim-1 scroll-animate"
                    data-animate="active"
                  >
                    <div className="icon">
                      <img src="images/choose_icon2.png" alt="image" />
                    </div>
                    <div className="desc">
                      <h5 className="name">100% ISO Certification</h5>
                      <div className="subname">
                        Sed ut perspiciatis unde omnis iste natus error
                        voluptate accusantium doloremque
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <Link
                href="about"
                className="kf-btn element-anim-1 scroll-animate"
                data-animate="active"
              >
                <span>explore more</span>
                <i className="fas fa-chevron-right" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Section Grid Carousel */}
      <section className="section kf-grid-carousel">
        <div className="container">
          <Swiper {...sliderProps.kfGridCarousel} className="swiper-container">
            <SwiperSlide className="swiper-slide">
              <div
                className="slide-item element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="image kf-image-hover">
                  <a href="images/grid_gal2.jpg" className="has-popup-image">
                    <img src="images/grid_gal2.jpg" alt="image" />
                  </a>
                </div>
                <div className="desc">
                  <h5 className="name">Latte</h5>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <div
                className="slide-item element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="image kf-image-hover">
                  <a href="images/grid_gal3.jpg" className="has-popup-image">
                    <img src="images/grid_gal3.jpg" alt="image" />
                  </a>
                </div>
                <div className="desc">
                  <h5 className="name">Cappuccino</h5>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <div
                className="slide-item element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="image kf-image-hover">
                  <a href="images/grid_gal4.jpg" className="has-popup-image">
                    <img src="images/grid_gal4.jpg" alt="image" />
                  </a>
                </div>
                <div className="desc">
                  <h5 className="name">Iced Coffee</h5>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <div
                className="slide-item element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="image kf-image-hover">
                  <a href="images/grid_gal5.jpg" className="has-popup-image">
                    <img src="images/grid_gal5.jpg" alt="image" />
                  </a>
                </div>
                <div className="desc">
                  <h5 className="name">Espresso</h5>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <div
                className="slide-item element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="image kf-image-hover">
                  <a href="images/grid_gal1.jpg" className="has-popup-image">
                    <img src="images/grid_gal1.jpg" alt="image" />
                  </a>
                </div>
                <div className="desc">
                  <h5 className="name">Black Coffee</h5>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <div
                className="slide-item element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="image kf-image-hover">
                  <a href="images/grid_gal2.jpg" className="has-popup-image">
                    <img src="images/grid_gal2.jpg" alt="image" />
                  </a>
                </div>
                <div className="desc">
                  <h5 className="name">Latte</h5>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <div
                className="slide-item element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="image kf-image-hover">
                  <a href="images/grid_gal3.jpg" className="has-popup-image">
                    <img src="images/grid_gal3.jpg" alt="image" />
                  </a>
                </div>
                <div className="desc">
                  <h5 className="name">Cappuccino</h5>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <div
                className="slide-item element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="image kf-image-hover">
                  <a href="images/grid_gal4.jpg" className="has-popup-image">
                    <img src="images/grid_gal4.jpg" alt="image" />
                  </a>
                </div>
                <div className="desc">
                  <h5 className="name">Iced Coffee</h5>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <div
                className="slide-item element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="image kf-image-hover">
                  <a href="images/grid_gal5.jpg" className="has-popup-image">
                    <img src="images/grid_gal5.jpg" alt="image" />
                  </a>
                </div>
                <div className="desc">
                  <h5 className="name">Espresso</h5>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <div
                className="slide-item element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="image kf-image-hover">
                  <a href="images/grid_gal1.jpg" className="has-popup-image">
                    <img src="images/grid_gal1.jpg" alt="image" />
                  </a>
                </div>
                <div className="desc">
                  <h5 className="name">Black Coffee</h5>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
      {/* Section Testimonials Carousel */}
      <TestimonialsCarousel />
      {/* Section Numbers */}
      <section className="section kf-numbers">
        <div className="container">
          <div className="kf-numbers-items row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
              <div className="kf-numbers-item">
                <div className="num">256+</div>
                <div className="desc">
                  <h5 className="name">Premium Clients</h5>
                  <div className="subname">Sed ut perspiciatis unde</div>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
              <div className="kf-numbers-item">
                <div className="num">362+</div>
                <div className="desc">
                  <h5 className="name">Expert Members</h5>
                  <div className="subname">Sed ut perspiciatis unde</div>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
              <div className="kf-numbers-item">
                <div className="num">753+</div>
                <div className="desc">
                  <h5 className="name">Winning Awards</h5>
                  <div className="subname">Sed ut perspiciatis unde</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Section Latest Blog */}
      <section className="section kf-latest-blog section-bg">
        <div className="container">
          <div className="kf-titles align-center">
            <div
              className="kf-subtitle element-anim-1 scroll-animate"
              data-animate="active"
            >
              Get Every Single Update
            </div>
            <h3
              className="kf-title element-anim-1 scroll-animate"
              data-animate="active"
            >
              Read Some Latest Blog &amp; News
            </h3>
          </div>
          <div className="kf-blog-grid-items row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
              <div
                className="kf-blog-grid-item element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="image kf-image-hover">
                  <Link href="blog-single">
                    <img src="images/latest_blog1.jpg" alt="image" />
                  </Link>
                </div>
                <div className="desc">
                  <h5 className="name">
                    SWR React Hooks With Next Increm Ental Static Regeneration
                  </h5>
                  <div className="kf-date">
                    <i className="far fa-calendar-alt" />
                    25 Sep 2021
                  </div>
                  <div className="kf-comm">
                    <i className="far fa-comments" />
                    Comments (7)
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
              <div
                className="kf-blog-grid-item element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="image kf-image-hover">
                  <Link href="blog-single">
                    <img src="images/latest_blog2.jpg" alt="image" />
                  </Link>
                </div>
                <div className="desc">
                  <h5 className="name">
                    Decisions For Building Flexible Components DevTools Browser
                  </h5>
                  <div className="kf-date">
                    <i className="far fa-calendar-alt" />
                    25 Sep 2021
                  </div>
                  <div className="kf-comm">
                    <i className="far fa-comments" />
                    Comments (7)
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
              <div
                className="kf-blog-grid-item element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="image kf-image-hover">
                  <Link href="blog-single">
                    <img src="images/latest_blog3.jpg" alt="image" />
                  </Link>
                </div>
                <div className="desc">
                  <h5 className="name">
                    SWR React Hooks With Next Increm Ental Static Regeneration
                  </h5>
                  <div className="kf-date">
                    <i className="far fa-calendar-alt" />
                    25 Sep 2021
                  </div>
                  <div className="kf-comm">
                    <i className="far fa-comments" />
                    Comments (7)
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="align-center">
            <Link
              href="blog-grid"
              className="kf-btn element-anim-1 scroll-animate"
              data-animate="active"
            >
              <span>view all</span>
              <i className="fas fa-chevron-right" />
            </Link>
          </div>
        </div>
      </section>
      {/* Section CTA */}
      <section
        className="section kf-cta kf-parallax"
        style={{ backgroundImage: "url(images/cta_bg.jpg)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8">
              <div className="kf-titles">
                <div
                  className="kf-subtitle element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  Need a Table On Coffee House
                </div>
                <h3
                  className="kf-title element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  Booking Table For Your &amp; Family Members
                </h3>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 align-self-center align-right">
              <Link
                href="reservation"
                className="kf-btn element-anim-1 scroll-animate"
                data-animate="active"
              >
                <span>booking table</span>
                <i className="fas fa-chevron-right" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layouts>
  );
};
export default Index;

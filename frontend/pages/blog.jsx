import Layouts from "@/src/layouts/Layouts";
import Link from "next/link";

const Blog = () => {
  return (
    <Layouts>
      {/* Section Started Inner */}
      <section className="section kf-started-inner">
        <div
          className="kf-parallax-bg js-parallax"
          style={{ backgroundImage: "url(images/blog_inner_bg.jpg)" }}
        />
        <div className="container">
          <h1
            className="kf-h-title text-anim-1 scroll-animate"
            data-splitting="chars"
            data-animate="active"
          >
            Blog Standard
          </h1>
        </div>
      </section>
      {/* Section Archive */}
      <section className="section kf-archive">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8">
              <div className="kf-archive-items">
                <div
                  className="kf-archive-item element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  <div className="image kf-image-hover">
                    <Link href="blog-single">
                      <img src="images/latest_blog1.jpg" alt="image" />
                    </Link>
                  </div>
                  <div className="desc">
                    <div className="kf-date">
                      <i className="far fa-calendar-alt" />
                      25 Sep 2021
                    </div>
                    <h5 className="name">
                      <Link href="blog-single">
                        For most people, moderate coffee consumption can be
                        incorporated into a healthy diet
                      </Link>
                    </h5>
                    <div className="kf-text">
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium dlorque laudantium totam rem
                      aperiam eaque ipsa quae abillo
                    </div>
                    <div className="readmore">
                      <Link href="blog-single" className="kf-btn-link">
                        <span>read more</span>
                        <i className="fas fa-chevron-right" />
                      </Link>
                    </div>
                  </div>
                </div>
                <div
                  className="kf-archive-item element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  <div className="image kf-image-hover">
                    <Link href="blog-single">
                      <img src="images/latest_blog2.jpg" alt="image" />
                    </Link>
                  </div>
                  <div className="desc">
                    <div className="kf-date">
                      <i className="far fa-calendar-alt" />
                      25 Sep 2021
                    </div>
                    <h5 className="name">
                      <Link href="blog-single">
                        Coffee makes you poop during the day because it affects
                        your digestive system so quickly
                      </Link>
                    </h5>
                    <div className="kf-text">
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium dlorque laudantium totam rem
                      aperiam eaque ipsa quae abillo
                    </div>
                    <div className="readmore">
                      <Link href="blog-single" className="kf-btn-link">
                        <span>read more</span>
                        <i className="fas fa-chevron-right" />
                      </Link>
                    </div>
                  </div>
                </div>
                <div
                  className="kf-archive-item element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  <div className="image kf-image-hover">
                    <Link href="blog-single">
                      <img src="images/latest_blog3.jpg" alt="image" />
                    </Link>
                  </div>
                  <div className="desc">
                    <div className="kf-date">
                      <i className="far fa-calendar-alt" />
                      25 Sep 2021
                    </div>
                    <h5 className="name">
                      <Link href="blog-single">
                        Coffee with added milk provides all the macro nutrients
                        in good amounts
                      </Link>
                    </h5>
                    <div className="kf-text">
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium dlorque laudantium totam rem
                      aperiam eaque ipsa quae abillo
                    </div>
                    <div className="readmore">
                      <Link href="blog-single" className="kf-btn-link">
                        <span>read more</span>
                        <i className="fas fa-chevron-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* pager */}
              <div
                className="pager element-anim-1 scroll-animate"
                data-animate="active"
              >
                <Link className="page-numbers prev" href="blog">
                  <i className="fas fa-chevron-left" />
                </Link>
                <span className="page-numbers current">1</span>
                <Link className="page-numbers" href="blog">
                  2
                </Link>
                <Link className="page-numbers" href="blog">
                  3
                </Link>
                <span className="page-numbers dots">…</span>
                <Link className="page-numbers" href="blog">
                  9
                </Link>
                <Link className="page-numbers next" href="blog">
                  <i className="fas fa-chevron-right" />
                </Link>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
              {/* sidebar */}
              <div
                className="col__sedebar scrolla-element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="content-sidebar">
                  <aside className="widget-area">
                    <div
                      className="widget widget_search element-anim-1 scroll-animate"
                      data-animate="active"
                    >
                      <form className="wp-block-search">
                        <input
                          type="search"
                          className="wp-block-search__input"
                          placeholder="Search"
                          defaultValue
                        />
                        <button
                          type="submit"
                          className="wp-block-search__button"
                        >
                          Search
                        </button>
                      </form>
                    </div>
                    <section
                      className="widget widget_categories element-anim-1 scroll-animate"
                      data-animate="active"
                    >
                      <h5 className="widget-title">Categories</h5>
                      <ul>
                        <li>
                          <a href="#">Sea Food</a> (1)
                        </li>
                        <li>
                          <a href="#">Coffee</a> (2)
                        </li>
                        <li>
                          <a href="#">Recipes</a> (4)
                        </li>
                        <li>
                          <a href="#">Guides</a> (5)
                        </li>
                      </ul>
                    </section>
                    <section
                      className="widget widget_recent_entries element-anim-1 scroll-animate"
                      data-animate="active"
                    >
                      <h5 className="widget-title">Recent Posts</h5>
                      <ul>
                        <li>
                          <a href="#">
                            For most people, moderate coffee consumption
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            Coffee makes you poop during the day because
                          </a>
                        </li>
                        <li>
                          <a href="#">Coffee with added milk provides all</a>
                        </li>
                      </ul>
                    </section>
                    <section
                      className="widget widget_tag_cloud element-anim-1 scroll-animate"
                      data-animate="active"
                    >
                      <h5 className="widget-title">Tag Cloud</h5>
                      <div className="tagcloud">
                        <a href="#" className="tag-cloud-link">
                          html
                        </a>
                        <a href="#" className="tag-cloud-link">
                          photo
                        </a>
                        <a href="#" className="tag-cloud-link">
                          food
                        </a>
                        <a href="#" className="tag-cloud-link">
                          chat
                        </a>
                        <a href="#" className="tag-cloud-link">
                          fashion
                        </a>
                        <a href="#" className="tag-cloud-link">
                          css
                        </a>
                        <a href="#" className="tag-cloud-link">
                          embeds
                        </a>
                        <a href="#" className="tag-cloud-link">
                          portfolio
                        </a>
                        <a href="#" className="tag-cloud-link">
                          personal
                        </a>
                        <a href="#" className="tag-cloud-link">
                          js
                        </a>
                      </div>
                    </section>
                    <section
                      className="widget widget_archive element-anim-1 scroll-animate"
                      data-animate="active"
                    >
                      <h5 className="widget-title">Archives List</h5>
                      <ul>
                        <li>
                          <a href="#">November 2019</a>&nbsp;(11)
                        </li>
                        <li>
                          <a href="#">October 2019</a>&nbsp;(1)
                        </li>
                        <li>
                          <a href="#">January 2020</a>&nbsp;(5)
                        </li>
                        <li>
                          <a href="#">March 2020</a>&nbsp;(5)
                        </li>
                        <li>
                          <a href="#">January 2020</a>&nbsp;(6)
                        </li>
                        <li>
                          <a href="#">March 2020</a>&nbsp;(1)
                        </li>
                      </ul>
                    </section>
                    <section
                      className="widget widget_recent_comments element-anim-1 scroll-animate"
                      data-animate="active"
                    >
                      <h5 className="widget-title">Recent Comments</h5>
                      <ul>
                        <li className="recentcomments">
                          <span className="comment-author-link">
                            <a href="#" className="url">
                              John Doe
                            </a>
                          </span>{" "}
                          on{" "}
                          <a href="#">
                            How to Photograph Food without a Tripod
                          </a>
                        </li>
                        <li className="recentcomments">
                          <span className="comment-author-link">
                            <a href="#" className="url">
                              John Doe
                            </a>
                          </span>{" "}
                          on{" "}
                          <a href="#">
                            How to Photograph Food without a Tripod
                          </a>
                        </li>
                        <li className="recentcomments">
                          <span className="comment-author-link">
                            <a href="#" className="url">
                              James Flick
                            </a>
                          </span>{" "}
                          on{" "}
                          <a href="#">
                            My Style My Choise Lighthouse Long White Jacket
                          </a>
                        </li>
                      </ul>
                    </section>
                  </aside>
                </div>
              </div>
            </div>
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
      {/* Section Brands */}
      <div className="section kf-brands">
        <div className="container">
          <div className="kf-brands-items row">
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-2">
              <div
                className="kf-brands-item element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="image">
                  <img src="images/brand1.png" alt="image" />
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-2">
              <div
                className="kf-brands-item element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="image">
                  <img src="images/brand2.png" alt="image" />
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-2">
              <div
                className="kf-brands-item element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="image">
                  <img src="images/brand3.png" alt="image" />
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-2">
              <div
                className="kf-brands-item element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="image">
                  <img src="images/brand4.png" alt="image" />
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-2">
              <div
                className="kf-brands-item element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="image">
                  <img src="images/brand5.png" alt="image" />
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-2">
              <div
                className="kf-brands-item element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="image">
                  <img src="images/brand6.png" alt="image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layouts>
  );
};
export default Blog;

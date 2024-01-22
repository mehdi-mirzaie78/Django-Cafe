import Layouts from "@/src/layouts/Layouts";
import Link from "next/link";

const BlogSingle = () => {
  return (
    <Layouts>
      {/* Section Archive Started */}
      <section className="section kf-archive-started">
        <div className="container">
          <div className="kf-titles">
            <div
              className="kf-date element-anim-1 scroll-animate"
              data-animate="active"
            >
              25 Sep 2021 - <Link href="blog">Recipes</Link>
            </div>
            <h1
              className="kf-p-title text-anim-1 scroll-animate"
              data-splitting="words"
              data-animate="active"
            >
              Coffee with added milk provides all the macro nutrients
            </h1>
          </div>
        </div>
        <div
          className="kf-archive-image element-anim-1 scroll-animate"
          data-animate="active"
          style={{ backgroundImage: "url(images/latest_blog3.jpg)" }}
        />
      </section>
      {/* Section Archive */}
      <section className="section kf-archive">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8 offset-lg-2">
              <div
                className="post-content element-anim-1 scroll-animate"
                data-animate="active"
              >
                <p>
                  Vivamus interdum suscipit lacus. Nunc ultrices accumsan
                  mattis. Aliquam vel sem vel velit efficitur malesuada. Donec
                  arcu lacus, ornare eget ligula vel, commodo luctus felis. Ut
                  dignissim sapien sit amet molestie rutrum. Orci varius natoque
                  penatibus et magnis dis parturient montes, nascetur ridiculus
                  mus. Pellentesque in porta dolor, a suscipit risus. Lorem
                  ipsum dolor sit amet, consectetur adipiscing elit. Cras ac
                  arcu in lorem rhoncus ullamcorper. Ut at nulla ut libero
                  mollis viverra sed vitae purus.
                </p>
                <blockquote>
                  <p>
                    Photography is the story I fail to put into words get ligula
                    vel, commodo luctus felis. Ut dignissim sapien sit amet
                    molestie rutr
                  </p>
                  <cite>Destin Sparks</cite>
                </blockquote>
                <p>
                  Nam dui mauris, congue vel nisi in, tempus gravida enim. Nulla
                  et tristique orci. Pellentesque lectus sapien, maximus id
                  gravida sit amet, tristique non eros. Etiam aliquet, sem vitae
                  sagittis convallis, ante sapien tincidunt nisl, eget dapibus
                  tortor velit quis ex. Proin et condimentum est, sed pretium
                  ex. Mauris posuere est metus, vitae commodo sem posuere eget.
                  Praesent maximus augue rutrum, consequat magna id, facilisis
                  lorem. Quisque molestie, turpis ac interdum gravida
                </p>
                <p>
                  <br />
                </p>
                <h3>Aliquam vel sem vel vellesuada</h3>
                <p>
                  <img src="images/latest_blog1.jpg" alt="image" />
                </p>
                <p>
                  Vivamus interdum suscipit lacus. Nunc ultrices accumsan
                  mattis. Aliquam vel sem vel velit efficitur malesuada. Donec
                  arcu lacus, ornare eget ligula vel, commodo luctus felis. Ut
                  dignissim sapien sit amet molestie rutrum. Orci varius natoque
                  penatibus et magnis dis parturient montes, nascetur ridiculus
                  mus. Pellentesque in porta dolor, a suscipit risus. Lorem
                  ipsum dolor sit amet, consectetur adipiscing elit. Cras ac
                  arcu in lorem rhoncus ullamcorper. Ut at nulla ut libero
                  mollis viverra sed vitae purus.
                </p>
                <ul>
                  <li>
                    Donec arcu lacus, ornare eget ligula vel, commodo luctus
                    felis.
                  </li>
                  <li>Ut dignissim sapien sit amet molestie rutrum.</li>
                  <li>
                    Orci varius natoque penatibus et magnis dis parturient
                    montes.
                  </li>
                  <li>Ut at nulla ut libero mollis viverra sed vitae purus.</li>
                </ul>
                <p>
                  Nam dui mauris, congue vel nisi in, tempus gravida enim. Nulla
                  et tristique orci. Pellentesque lectus sapien, maximus id
                  gravida sit amet, tristique non eros. Etiam aliquet, sem vitae
                  sagittis convallis, ante sapien tincidunt nisl, eget dapibus
                  tortor velit quis ex.
                </p>
              </div>
              <div
                className="post-details element-anim-1 scroll-animate"
                data-animate="active"
              >
                <span className="tags-links">
                  <span>Tags:</span>
                  <Link href="blog">photo</Link>
                  <Link href="blog">fashion</Link>
                  <Link href="blog">creative</Link>
                </span>
              </div>
              {/* Comments */}
              <div
                className="comments-post element-anim-1 scroll-animate"
                data-animate="active"
              >
                {/* Comments */}
                <div className="section__comments">
                  <h4
                    className="element-anim-1 scroll-animate"
                    data-animate="active"
                  >
                    3 Comments
                  </h4>
                  <ul className="comments">
                    <li className="comment comment-item">
                      <div className="comment comment-box">
                        <img
                          src="https://secure.gravatar.com/avatar/aa9d265f1a064dcd6973df722b49c392?s=64&d=mm&r=g"
                          className="avatar"
                          alt
                        />
                        <div className="comment-box__body">
                          <div className="content-caption post-content description">
                            <h5 className="comment-box__details">
                              Alex Morrison <span>March 9, 2021</span>
                            </h5>
                            <p>
                              Gallery blocks have two settings: the number of
                              columns, and whether or not images should be
                              cropped. The default number of columns is three,
                              and the maximum number of columns is eight. Below
                              is a three column gallery at full width, with
                              cropped images.
                            </p>
                          </div>
                        </div>
                        <div className="comment-footer">
                          <a className="comment-reply-link" href="#">
                            Reply
                          </a>
                        </div>
                      </div>
                    </li>
                    <li className="comment comment-item">
                      <div className="comment comment-box">
                        <img
                          src="https://secure.gravatar.com/avatar/aa9d265f1a064dcd6973df722b49c392?s=64&d=mm&r=g"
                          className="avatar"
                          alt
                        />
                        <div className="comment-box__body">
                          <div className="content-caption post-content description">
                            <h5 className="comment-box__details">
                              John Doe <span>March 9, 2021</span>
                            </h5>
                            <p>
                              Gallery blocks have two settings: the number of
                              columns, and whether or not images should be
                              cropped. The default number of columns is three,
                              and the maximum number of columns is eight. Below
                              is a three column gallery at full width, with
                              cropped images.
                            </p>
                          </div>
                        </div>
                        <div className="comment-footer">
                          <a className="comment-reply-link" href="#">
                            Reply
                          </a>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div className="form-comment">
                    <div className="comment-respond">
                      <div className="m-titles">
                        <h4
                          className="element-anim-1 scroll-animate"
                          data-animate="active"
                        >
                          Leave a comment
                        </h4>
                      </div>
                      <form method="post" className="kf-comment-form">
                        <div className="row">
                          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="kf-field">
                              <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                              />
                            </div>
                          </div>
                          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="kf-field">
                              <input
                                type="text"
                                name="email"
                                placeholder="Email Address"
                              />
                            </div>
                          </div>
                          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="kf-field">
                              <textarea
                                className="textarea"
                                rows={3}
                                placeholder="Comment"
                                defaultValue={""}
                              />
                            </div>
                          </div>
                          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <button type="submit" className="kf-btn">
                              <span>Submit</span>
                              <i className="fas fa-chevron-right" />
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
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
export default BlogSingle;

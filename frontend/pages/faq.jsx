import Layouts from "@/src/layouts/Layouts";
import { Fragment, useState } from "react";
import { Accordion } from "react-bootstrap";
const faqsData = [
  { id: 1, title: "How Much Customer Do You Like Kaffen?" },
  { id: 2, title: "How Can I See Your Food Reviews?" },
  { id: 3, title: "How Can I Order Food In Online?" },
  { id: 4, title: "What Customer Say About Us?" },
  { id: 5, title: "Know About Company History?" },
];
const Faq = () => {
  const [toggle, setToggle] = useState(1);
  return (
    <Layouts>
      {/* Section Started Inner */}
      <section className="section kf-started-inner">
        <div
          className="kf-parallax-bg js-parallax"
          style={{ backgroundImage: "url(images/faq_inner_bg.jpg)" }}
        />
        <div className="container">
          <h1
            className="kf-h-title text-anim-1 scroll-animate"
            data-splitting="chars"
            data-animate="active"
          >
            Faq
          </h1>
        </div>
      </section>
      {/* Section Faq */}
      <section className="section kf-faq">
        <div className="container">
          <div className="kf-titles align-center">
            <div
              className="kf-subtitle element-anim-1 scroll-animate"
              data-animate="active"
            >
              Have Any Questions?
            </div>
            <h3
              className="kf-title element-anim-1 scroll-animate"
              data-animate="active"
            >
              Frequently Asked Questions
            </h3>
          </div>
          <Accordion defaultActiveKey="event-1">
            <div className="kf-faq-items row">
              {faqsData.map((faq) => (
                <div
                  className="col-xs-12 col-sm-12 col-md-12 col-lg-12"
                  key={faq.id}
                >
                  <div
                    className="kf-faq-item element-anim-1 scroll-animate"
                    data-animate="active"
                  >
                    <Accordion.Toggle
                      as={"div"}
                      eventKey={`event-${faq.id}`}
                      className={`name collapse-btn ${
                        faq.id == toggle ? "active" : ""
                      }`}
                      onClick={() => setToggle(faq.id == toggle ? 0 : faq.id)}
                    >
                      {faq.title}
                      <i className="las la-arrow-circle-right" />
                    </Accordion.Toggle>
                    <Accordion.Collapse
                      as="div"
                      eventKey={`event-${faq.id}`}
                      className="text"
                    >
                      <Fragment>
                        <p>
                          <img
                            src="images/faq_img1.jpg"
                            className="alignleft"
                            alt
                          />
                        </p>
                        <p>
                          Sed ut perspiciatis unde omnis iste natus error sit
                          voluptatem accusantium doloremque laudantium, totam
                          rem aperiam, eaque ipsa quae ab illo inventore
                          veritatis et quasi architecto beatae vitae dicta sunt
                          explicabo. Nemo enim ipsam voluptatem quia voluptas
                          sit aspernatur aut odit aut fugit sed
                        </p>
                        <p>
                          Sed ut perspiciatis unde omnis iste natus error sit
                          voluptatem accusantium doloremque laudantium, totam
                          rem aperiam, eaque ipsa quae ab illo inventore
                          veritatis et quasi architecto beatae vitae dicta sunt
                          explicabo. Nemo enim ipsam voluptatem quia voluptas
                          sit aspernatur aut odit aut fugit sed
                        </p>
                        <p>
                          Perspiciatis unde omnis iste natus error sit
                          voluptatem accusantium que laudantium, totam rem
                          aperiam, eaque ipsa quae abillo inventore veritatis
                        </p>
                      </Fragment>
                    </Accordion.Collapse>
                  </div>
                </div>
              ))}
            </div>
          </Accordion>
        </div>
      </section>
      {/* Section CTA */}
      <section
        className="section kf-cta kf-parallax"
        style={{ backgroundImage: "url(images/cta_bg2.jpg)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8">
              <div className="kf-titles">
                <div
                  className="kf-subtitle element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  Get In Touch
                </div>
                <h3
                  className="kf-title element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  Have Any Questions
                </h3>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 align-self-center align-right">
              <a
                href="contacts.html"
                className="kf-btn element-anim-1 scroll-animate"
                data-animate="active"
              >
                <span>Submit request</span>
                <i className="fas fa-chevron-right" />
              </a>
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
export default Faq;

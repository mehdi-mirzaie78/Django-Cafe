import InstaCarousel from "@/src/components/sliders/InstaCarousel";
import Layouts from "@/src/layouts/Layouts";

const Register = () => {
  const changeDisplay = (id, displayStyle) => {
    document.getElementById(id).style.display = displayStyle;
  };

  async function handleVerifySubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const phone = formData.get("tel");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/accounts/auth/register/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      sessionStorage.setItem("phone", phone);
      changeDisplay("code", "block");
      changeDisplay("tel", "none");
    } else {
      const resp = await response.json();

      // setTimeout(() => changeDisplay("alert-danger", "none"), 5000);
      console.log(resp);
    }
  }
  return (
    <Layouts>
      {/* Section Started Inner */}
      <section className="section kf-started-inner">
        <div
          className="kf-parallax-bg js-parallax"
          style={{
            backgroundImage: "url(images/menu_reservation_inner_bg.jpg)",
          }}
        />
        <div className="container">
          <h1
            className="kf-h-title text-anim-1 scroll-animate"
            data-splitting="chars"
            data-animate="active"
          >
            Register
          </h1>
        </div>
      </section>

      {/* Section Contacts Form */}
      <section className="section kf-contacts-info">
        <div className="container">
          <div
            className="kf-reservation-form element-anim-1 scroll-animate"
            data-animate="active"
          >
            <div className="kf-titles align-center">
              <div className="kf-subtitle">Register</div>
              <h3 className="kf-title">Welcome Dear Member</h3>
            </div>
            <form id="rform" method="post" onSubmit={handleVerifySubmit}>
              <div className="row d-flex justify-content-center">
                <div id="tel" className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                  <div className="kf-field">
                    <input
                      type="tel"
                      name="tel"
                      placeholder="Phone Number"
                      maxLength={13}
                    />
                    <i className="fas fa-mobile-alt" />
                  </div>
                </div>
                <div
                  id="code"
                  className="col-xs-12 col-sm-12 col-md-8 col-lg-8"
                  style={{ display: "none" }}
                >
                  <div className="kf-field">
                    <input type="text" name="code" placeholder="Code" />
                    <i className="fa fa-hashtag" />
                  </div>
                </div>

                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <div className="kf-bts mt-4">
                    <button className="kf-btn" type="submit">
                      <span>
                        Verify
                        <i className="fas fa-chevron-right" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <div className="alert-success" style={{ display: "none" }}>
              <p>Thanks, your message is sent successfully.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Section Insta Carousel */}
      {/* <InstaCarousel /> */}
      {/* Section Brands */}
      {/* <div className="section kf-brands">
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
      </div> */}
    </Layouts>
  );
};
export default Register;

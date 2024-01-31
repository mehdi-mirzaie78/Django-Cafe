import InstaCarousel from "@/src/components/sliders/InstaCarousel";
import Layouts from "@/src/layouts/Layouts";
import {useRouter} from "next/router";
import {Fragment, useState} from "react";


const Register = () => {
  const [showRegister, setShowRegister] = useState(true)
  const [showVerify, setShowVerify] = useState(false)
  const [showComplete, setShowComplete] = useState(false)

  const router = useRouter();
  const redirect = () => {
    router.push("/login");
  };

  const changeDisplay = (id, displayStyle) => {
    document.getElementById(id).style.display = displayStyle;
  };


  async function handleRegisterSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const phone = formData.get("tel");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/accounts/auth/register/`,
      {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({phone}),
      });


    if (response.ok) {
      localStorage.setItem('phone', phone)
      changeDisplay("alert-send-code-success", "block")
      setTimeout(() => {
        setShowRegister(false)
        setShowVerify(true)
        changeDisplay("alert-send-code-success", "none")
      }, 3000)

    } else {
      const resp = await response.json();

      changeDisplay("alert-send-code-failure", "block")
      console.log(resp.error)
      setTimeout(() => changeDisplay("alert-send-code-failure", "none"), 4000);

    }
  }


  async function handleVerifySubmit(event) {
    event.preventDefault()
    const phone = localStorage.getItem('phone')
    const formData = new FormData(event.currentTarget)
    const otp = formData.get('code')
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts/auth/register/verify/`, {
      method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({phone, otp})
    })

    if (response.ok) {
      const data = await response.json();
      changeDisplay("alert-verification-code-success", "block")
      setTimeout(() => {
        setShowVerify(false)
        setShowComplete(true)
        changeDisplay("alert-verification-code-success", "none")
      }, 3000);
      // setTimeout(redirect, 3000);
    } else {
      const resp = await response.json();
      changeDisplay("alert-verification-code-failure", "block")
      setTimeout(() => changeDisplay("alert-verification-code-failure", "none"), 4000);
      console.log(resp.error);
    }

  }

  async function handleCompleteFormSubmit(event) {
    event.preventDefault()
    const phone = localStorage.getItem('phone')
    const formData = new FormData(event.currentTarget)
    const first_name = formData.get('firstName')
    const last_name = formData.get('lastName')
    const email = formData.get('email')
    const gender = formData.get("gender")
    const password = formData.get('password')
    const confirm_password = formData.get('confirmPassword')
    if (password !== confirm_password) {
      alert("Passwords aren't match")
    } else {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/accounts/auth/register/complete/`,
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({phone, first_name, last_name, email, gender, password})
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.removeItem('phone')
        changeDisplay("alert-complete-success", "block")
        setTimeout(() => {
          changeDisplay("alert-complete-success", "none")
          redirect()
        }, 3000);
        // setTimeout(redirect, 3000);
      } else {
        const resp = await response.json();
        changeDisplay("alert-complete-failure", "block")
        setTimeout(() => changeDisplay("alert-complete-failure", "none"), 4000);
        console.log(resp);
      }
    }
  }

  return (<Layouts>
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


          {showRegister &&
            <Fragment>
              <div className="kf-titles align-center">
                <div className="kf-subtitle">Register</div>
                <h3 className="kf-title">Welcome Dear Member</h3>
              </div>
              <form id="rform" method="post" onSubmit={handleRegisterSubmit}>
                <div className="row d-flex justify-content-center">
                  <div id="tel" className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                    <div className="kf-field">
                      <input
                        type="tel"
                        name="tel"
                        placeholder="Phone Number"
                        maxLength={13}
                        minLength={11}
                      />
                      <i className="fas fa-mobile-alt"/>
                    </div>
                  </div>

                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="kf-bts mt-4">
                      <button className="kf-btn" type="submit">
                      <span>
                        Send Code
                        <i className="fas fa-chevron-right"/>
                      </span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </Fragment>
          }
          <div id="alert-send-code-success" className="alert-success" style={{display: "none"}}>
            <p>The code has been sent to your phone.</p>
          </div>
          <div id="alert-send-code-failure" className="alert-danger" style={{display: "none"}}>
            <p>Something went wrong during registration!</p>
          </div>

          {showVerify &&

            <Fragment>
              <div className="kf-titles align-center">
                <div className="kf-subtitle">Verification</div>
                <h3 className="kf-title">Enter Verification Code</h3>
              </div>
              <form id="vform" method="post" onSubmit={handleVerifySubmit}>
                <div className="row d-flex justify-content-center">
                  <div
                    id="code"
                    className="col-xs-12 col-sm-12 col-md-8 col-lg-8"
                  >
                    <div className="kf-field">
                      <input type="text" name="code" placeholder="Code"/>
                      <i className="fa fa-hashtag"/>
                    </div>
                  </div>

                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="kf-bts mt-4">
                      <button className="kf-btn" type="submit">
                      <span>
                        Verify
                        <i className="fas fa-chevron-right"/>
                      </span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>

            </Fragment>
          }
          <div id="alert-verification-code-success" className="alert-success" style={{display: "none"}}>
            <p>Your phone verified successfully.</p>
          </div>
          <div id="alert-verification-code-failure" className="alert-danger" style={{display: "none"}}>
            <p>Something went wrong during verification!</p>
          </div>


          {showComplete &&
            <Fragment>
              <div className="kf-titles align-center">
                <div className="kf-subtitle">Complete Registration</div>
                <h3 className="kf-title">Complete Registration Form</h3>
              </div>

              <form id="cform" method="post" onSubmit={handleCompleteFormSubmit}>
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="kf-field">
                      <input type="text" name="firstName" placeholder="First Name"/>
                      <i className="far fa-user"/>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="kf-field">
                      <input type="text" name="lastName" placeholder="Last Name"/>
                      <i className="far fa-user"/>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="kf-field">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                      />
                      <i className="fas fa-at"/>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="kf-field align-center">
                      <select name="gender" id="gender">
                        <option value=""></option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="kf-field">
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                      />
                      <i className="fa fa-hashtag"/>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <div className="kf-field">
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                      />
                      <i className="fa fa-hashtag"/>
                    </div>
                  </div>

                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="kf-bts mt-4">
                      <button className="kf-btn" type="submit">
                      <span>
                        Register
                        <i className="fas fa-chevron-right"/>
                      </span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </Fragment>

          }
          <div id="alert-complete-success" className="alert-success" style={{display: "none"}}>
            <p>You registered successfully</p>
          </div>
          <div id="alert-complete-failure" className="alert-danger" style={{display: "none"}}>
            <p>Something went wrong during completing registration!</p>
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
  </Layouts>);
};
export default Register;

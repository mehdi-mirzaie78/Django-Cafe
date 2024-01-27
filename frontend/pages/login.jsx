// import InstaCarousel from "@/src/components/sliders/InstaCarousel";
import Layouts from "@/src/layouts/Layouts";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const redirect = () => {
    router.push("/");
  };

  const changeDisplay = (className, displayStyle) => {
    var elems = document.getElementsByClassName(className);
    for (var i = 0; i < elems.length; i += 1) {
      elems[i].style.display = displayStyle;
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/accounts/auth/login/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      sessionStorage.setItem("accessToken", data["access_token"]);
      sessionStorage.setItem("refreshToken", data["refresh_token"]);
      changeDisplay("alert-success", "block");
      setTimeout(redirect, 3000);
    } else {
      const resp = await response.json();
      changeDisplay("alert-danger", "block");
      setTimeout(() => changeDisplay("alert-danger", "none"), 5000);
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
            backgroundImage: "url(images/menu_reservation_inner_bg2.jpg)",
          }}
        />
        <div className="container">
          <h1
            className="kf-h-title text-anim-1 scroll-animate"
            data-splitting="chars"
            data-animate="active"
          >
            Login
          </h1>
        </div>
      </section>
      {/* Section Login */}
      <section className="section kf-reservation">
        <div className="container">
          <div
            className="kf-reservation-form element-anim-1 scroll-animate"
            data-animate="active"
          >
            <div className="kf-titles align-center">
              <div className="kf-subtitle">Login</div>
              <h3 className="kf-title">Enter Your Credentials</h3>
            </div>
            <form id="lform" method="post" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                  <div className="kf-field">
                    <input
                      type="text"
                      name="username"
                      placeholder="Phone or Email"
                      required
                    />
                    <i className="far fa-user" />
                  </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                  <div className="kf-field">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      required
                    />
                    <i className="fas fa-at" />
                  </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <div className="kf-bts mt-4">
                    <button className="kf-btn" type="submit">
                      <span>
                        Login
                        <i className="fas fa-chevron-right" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <div className="alert-success mt-5" style={{ display: "none" }}>
              <p className="m-0">You logged in successfuly</p>
            </div>
            <div
              className="alert alert-danger mt-5"
              style={{ display: "none" }}
            >
              <p className="m-0"> Login Error. Check your credentials.</p>
            </div>
          </div>
        </div>
      </section>
    </Layouts>
  );
};
export default Login;

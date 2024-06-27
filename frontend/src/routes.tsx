import { createBrowserRouter } from "react-router-dom";
import CartPage from "./pages/order/CartPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/product/HomePage";
import LandingPage from "./pages/LandingPage";
import Layout from "./pages/Layout";
import LoginPage from "./pages/auth/LoginPage";
import OrderPayment from "./pages/order/OrderPayment";
import OrderPaymentSuccess from "./pages/order/OrderPaymentSuccess";
import ProductDetailPage from "./pages/product/ProductDetailPage";
import AddressesPage from "./pages/profile/ProfileAddressesPage";
import ProfileFavoriteProductsPage from "./pages/profile/ProfileFavoriteProductsPage";
import ProfileOrdersPage from "./pages/profile/ProfileOrdersPage";
import ProfileReviewsPage from "./pages/profile/ProfileReviewsPage";
import ProfileUserInfoPage from "./pages/profile/ProfileUserInfoPage";
import ProfileLayoutPage from "./pages/profile/ProfileLayoutPage";
import RegisterCompletePage from "./pages/auth/RegisterCompletePage";
import RegisterPage from "./pages/auth/RegisterPage";
import RegisterVerifyPage from "./pages/auth/RegisterVerifyPage";
import ProfileHomePage from "./pages/profile/ProfileHomePage";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage />, errorElement: <ErrorPage /> },
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "home/", element: <HomePage /> },
      {
        path: "register/",
        children: [
          { path: "", element: <RegisterPage /> },
          { path: "verify", element: <RegisterVerifyPage /> },
          { path: "complete", element: <RegisterCompletePage /> },
        ],
      },
      { path: "login", element: <LoginPage /> },
      {
        path: "profile",
        element: <ProfileLayoutPage />,
        children: [
          { path: "", element: <ProfileHomePage /> },
          { path: "user-info", element: <ProfileUserInfoPage /> },
          {
            path: "favorite-products",
            element: <ProfileFavoriteProductsPage />,
          },
          { path: "orders", element: <ProfileOrdersPage /> },
          { path: "reviews", element: <ProfileReviewsPage /> },
          { path: "addresses", element: <AddressesPage /> },
        ],
      },

      { path: "products/:slug", element: <ProductDetailPage /> },
      {
        path: "checkout",
        children: [
          { path: "cart", element: <CartPage /> },
          { path: "payment", element: <OrderPayment /> },
          { path: "success", element: <OrderPaymentSuccess /> },
        ],
      },
    ],
  },
]);

export default router;

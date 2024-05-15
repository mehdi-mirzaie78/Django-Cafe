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
import AddressesPage from "./pages/profile/AddressesPage";
import FavoriteProductsPage from "./pages/profile/FavoriteProductsPage";
import OrdersPage from "./pages/profile/OrdersPage";
import ReviewsPage from "./pages/profile/ReviewsPage";
import UserInfoPage from "./pages/profile/UserInfoPage";
import ProfilePage from "./pages/profile/ProfilePage";
import RegisterCompletePage from "./pages/auth/RegisterCompletePage";
import RegisterPage from "./pages/auth/RegisterPage";
import RegisterVerifyPage from "./pages/auth/RegisterVerifyPage";

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
        element: <ProfilePage />,
        children: [
          { path: "", element: <UserInfoPage /> },
          { path: "favorite-products", element: <FavoriteProductsPage /> },
          { path: "orders", element: <OrdersPage /> },
          { path: "reviews", element: <ReviewsPage /> },
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

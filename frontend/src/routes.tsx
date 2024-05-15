import { createBrowserRouter } from "react-router-dom";
import CartPage from "./pages/CartPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import OrderPayment from "./pages/OrderPayment";
import OrderPaymentSuccess from "./pages/OrderPaymentSuccess";
import ProductDetailPage from "./pages/ProductDetailPage";
import AddressesPage from "./pages/Profile/AddressesPage";
import FavoriteProductsPage from "./pages/Profile/FavoriteProductsPage";
import OrdersPage from "./pages/Profile/OrdersPage";
import ReviewsPage from "./pages/Profile/ReviewsPage";
import UserInfoPage from "./pages/Profile/UserInfoPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterCompletePage from "./pages/RegisterCompletePage";
import RegisterPage from "./pages/RegisterPage";
import RegisterVerifyPage from "./pages/RegisterVerifyPage";

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

import { createBrowserRouter } from "react-router-dom";
import CartPage from "./pages/CartPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import RegisterCompletePage from "./pages/RegisterCompletePage";
import RegisterPage from "./pages/RegisterPage";
import RegisterVerifyPage from "./pages/RegisterVerifyPage";
import ProfilePage from "./pages/ProfilePage";
import UserInfoPage from "./pages/Profile/UserInfoPage";
import FavoriteProductsPage from "./pages/Profile/FavoriteProductsPage";
import OrdersPage from "./pages/Profile/OrdersPage";
import ReviewsPage from "./pages/Profile/ReviewsPage";
import AddressesPage from "./pages/Profile/AddressesPage";

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
      { path: "cart/", element: <CartPage /> },
    ],
  },
]);

export default router;

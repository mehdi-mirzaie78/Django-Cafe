import { createBrowserRouter } from "react-router-dom";
import CartPage from "./pages/CartPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import RegisterCompletePage from "./pages/RegisterCompletePage";
import RegisterPage from "./pages/RegisterPage";
import RegisterVerifyPage from "./pages/RegisterVerifyPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "register/",
        children: [
          { path: "", element: <RegisterPage /> },
          { path: "verify", element: <RegisterVerifyPage /> },
          { path: "complete", element: <RegisterCompletePage /> },
        ],
      },
      { path: "login", element: <LoginPage /> },
      { path: "products/:slug", element: <ProductDetailPage /> },
      { path: "cart/", element: <CartPage /> },
    ],
  },
]);

export default router;

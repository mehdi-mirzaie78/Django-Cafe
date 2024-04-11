import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
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
          { path: "verify/", element: <RegisterVerifyPage /> },
        ],
      },
      { path: "products/:slug", element: <ProductDetailPage /> },
      { path: "cart/", element: <CartPage /> },
    ],
  },
]);

export default router;

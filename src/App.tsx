
import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/home";
import Cart from "./pages/cart";

import { Layout } from "./components/layout";
import { Product } from "./pages/product";

export const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/carrinho",
        element: <Cart/>
      },
      {
        path: "/product/:id",
        element: <Product/>
      },
      {
        path: "*",
        element: <h1>Página não encontrada</h1>
      },
    ]
  }
]);
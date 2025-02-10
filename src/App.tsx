import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import { BookStoreThemeProvider } from "./context/themeContext.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./components/common/Error.tsx";
import Signup from "./pages/Signup.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import Login from "./pages/Login.tsx";
import Books from "./pages/Books.tsx";
import BookDetail from "./pages/BookDetail.tsx";
import Cart from "./pages/Cart.tsx";
import Order from "./pages/Order.tsx";
import OrderList from "./pages/OrderList.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/queryClient.ts";

const routerList = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/books",
    element: <Books></Books>,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/reset",
    element: <ResetPassword />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/book/:bookId",
    element: <BookDetail />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/order",
    element: <Order />,
  },
  {
    path: "/orderlist",
    element: <OrderList />,
  },
];

const router = createBrowserRouter(
  routerList.map((item) => {
    return {
      ...item,
      element: <Layout>{item.element}</Layout>,
      errorElement: <Error />,
    };
  })
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BookStoreThemeProvider>
        <RouterProvider router={router} />
      </BookStoreThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

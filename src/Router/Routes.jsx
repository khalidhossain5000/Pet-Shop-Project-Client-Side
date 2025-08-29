import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import Register from "../pages/AuthPages/Register/Register";
import Login from "../pages/AuthPages/Login/Login";
import CategoryDetails from "../pages/Home/Categories/CategoryDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "category/:id",
        element: <CategoryDetails />,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path:"login",
        element:<Login/>
      }
    ]
  }
])


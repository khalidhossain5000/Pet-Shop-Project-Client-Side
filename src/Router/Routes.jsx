import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import Register from "../pages/AuthPages/Register/Register";
import Login from "../pages/AuthPages/Login/Login";
import CategoryDetails from "../pages/Home/Categories/CategoryDetails";
import AdminDashboard from "../layouts/AdminLayout/AdminDashboard";
import DashBoard from "../pages/AdminDashBoard/DashBoard";
import AddProducts from "../pages/AdminDashBoard/AddProducts/AddProducts";


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
  },
  {
    path:'dashboard',
    element:<AdminDashboard/>,
    children:[
      {
        index:true,
        Component:DashBoard
      },
      {
        path:'add-products',
        element:<AddProducts/>
      }
    ]
    
  }
])


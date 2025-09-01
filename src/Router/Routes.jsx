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
import PrivateRoute from "./PrivateRoute";
import AddPet from "../pages/AddAPet/AddPet";
import AddBreeds from "../layouts/AdminLayout/AddBreeds/AddBreeds";
import AllPet from "../pages/AllPet/AllPet";
import AllBreeds from "../pages/Breeds/AllBreeds";
import AdminAllPet from "../pages/AdminDashBoard/AllPetAdmin/AdminAllPet";


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
        path: "category/:categoryName",
        element: <CategoryDetails />,
      },
      {
        path:'add-a-pet',
        element:<PrivateRoute>
          <AddPet/>
        </PrivateRoute>
      },
      {
        path:'all-pets',
        Component:AllPet
      },
      {
        path:'breeds',
        Component:AllBreeds
      }
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
    element:<PrivateRoute>
      <AdminDashboard/>
    </PrivateRoute>,
    children:[
      {
        index:true,
        Component:DashBoard
      },
      {
        path:'add-products',
        element:<AddProducts/>
      },
      {
        path:'add-breeds',
        element:<AddBreeds/>
      },
      {
        path:'admin-all-pet',
        Component:AdminAllPet
      }
    ]
    
  }
])


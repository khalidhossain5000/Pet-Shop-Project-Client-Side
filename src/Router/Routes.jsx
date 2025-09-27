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
import AdminAllProducts from "../pages/AdminDashBoard/AdminAllProducts/AdminAllProducts";
import PublicAllProducts from "../pages/PublicAllProducts/PublicAllProducts";
import PetDetails from "../pages/PetDetails/PetDetails";
import AllUsers from "../pages/AdminDashBoard/AllUsers/AllUsers";
import FinalPetDetails from "../pages/FInalPetDetails/FinalPetDetails";
import BreedDetails from "../pages/BreedsDetails/BreedDetails";
import CartPage from "../pages/CartPage/CartPage";
import Payment from "../pages/CheckoutPage/PaymentPage/Payment";
import Orders from "../pages/AdminDashBoard/Orders/Orders";





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
      },
      {
        path:'all-products',
        Component:PublicAllProducts
      },
      {
        path:'pet-details/:id',
        element:
          <PetDetails/>
      },
      {
        path:'final-pet-details/:id',
        element:<PrivateRoute>
          <FinalPetDetails/>
        </PrivateRoute>
      },
      {
        path:'breed-details/:id',
        element:<PrivateRoute>
          <BreedDetails/>
        </PrivateRoute>
      },
      {
        path:'cart',
        element:<PrivateRoute>
          <CartPage/>
        </PrivateRoute>
      },
      {
        path:'payment',
        element:<Payment/>
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
      },
      {
        path:'admin-all-products',
        Component:AdminAllProducts
      },
      {
        path:'all-users',
        Component:AllUsers
      },
      {
        path:'orders',
        Component:Orders
      }
    ]
    
  }
])


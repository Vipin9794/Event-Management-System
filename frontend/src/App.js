
// Importing necessary dependencies
import React, { } from "react";
import { 
  
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
// Importing components
import Login from "./components/Authentication/Login";
import SignUp from "./components/Authentication/SignUp";
import Navbar from "./components/Navbar";
import UpdateMembership from "./components/admin/UpdateMembership";
import VendorManagement from "./components/admin/VendorManagement";
import AddMembership from "./components/admin/AddMembership";
import UserManagement from "./components/admin/UserManagement";
import AdminMainPage from "./components/admin/AdminMainPage";
import ErrorPage from "./components/ErrorPage"; // Import the ErrorPage component
import Cart from "./components/users/Cart";
import GuestList from "./components/users/GuestList";
import UserMainPage from "./components/users/UserMainPage";
import OrderStatus from "./components/users/OrderStatus";
import Payment from "./components/users/Payment";
import Vendor from "./components/users/Vendor";
import Cancel from "./components/users/Cancel";
import Home from "./components/vender/Home";




function App() {
 
  

  const appRouter = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/",
      element: <Navigate to="/login" replace />,
    },
    {
      path: "/signup",
      element: <SignUp />,
      errorElement: <ErrorPage />,
    },
    // Admin

    {
      path: "/adminHome",
      element: <AdminMainPage/>,
      errorElement: <ErrorPage />,
    },
    {
      path: "/add-update-user",
      element: <UserManagement/>,
      errorElement: <ErrorPage />,
    },
    {
      path: "/add-update-vendor",
      element: <VendorManagement/>,
      errorElement: <ErrorPage />,
    },
    {
      path: "/add-membership",
      element: <AddMembership/>,
      errorElement: <ErrorPage />,
    },
    {
      path: "/update-membership",
      element: <UpdateMembership/>,
      errorElement: <ErrorPage />,
    },
    //user

    {
      path: "/userHome",
      element: <UserMainPage/>,
      errorElement: <ErrorPage />,
    },
    {
      path: "/cart",
      element: <Cart/>,
    },
    {
      path: "/guestList",
      element: < GuestList/>,
    },
    {
      path: "/orderStatus",
      element: <OrderStatus/>,
    },
    {
      path: "/payment",
      element: <Payment/>,
    },
    {
      path: "/vendor",
      element: <Vendor/>,
    },
    {
      path: "/cancel",
      element: <Cancel/>,
    },

    //vendor
    {
      path: "/vendorHome",
      element: <Home/>,
    },
    
    {
      path: "*",
      element: <ErrorPage />,
    },
    


  ]);

  return (
    <div>
   
    <Navbar/>
    <div>Event Manageement System</div>
    <RouterProvider router={appRouter} />
  </div>
  );
}

export default App;

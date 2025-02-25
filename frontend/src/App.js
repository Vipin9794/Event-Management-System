
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
import MyOrders from "./components/users/MyOrders";
import OrderPopup from "./components/users/OrderPopup";
import Payment from "./components/users/Payment";
import Vendor from "./components/users/Vendor";
import Cancel from "./components/users/Cancel";
import Home from "./components/vender/Home";
import InsertItem from "./components/vender/InsertItem";
import UpdateProductForm from "./components/vender/UpdateProductForm";
//import DeleteItem from "./components/vender/DeleteItem";
import ViewProduct from "./components/vender/ViewProduct";
import OrdersDashboard from "./components/vender/OrdersDashboard";



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
      path: "/myOrders",
      element: <MyOrders/>,
    },
    {
      path: "/order-summary",
      element: <OrderPopup/>
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
      path: "/insert-item",
      element: <InsertItem/>
    },
    {
      path: "/update-product/:productId",
      element: <UpdateProductForm/>
    },
    {
      path: "/view-product",
      element: <ViewProduct/>
    },
    {
      path: "/view-orders",
      element: <OrdersDashboard/>
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

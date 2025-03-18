import MainLayout from "@/layouts/MainLayout";
import Log from "@/pages/Log";

import Home from "@/pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router";

import Profile from "@/pages/profile";

const router = createBrowserRouter([
  { 
    path: "/", 
    element:<MainLayout />,
    children: [
    {
        index:true,
        element:<Home />
    },
    {
        path:"/Log",
        element:<Log />
    },

   
    
  ] },
]);

export const AppRouter=()=>{
    return <RouterProvider router={router} />
}

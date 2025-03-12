import MainLayout from "@/layouts/MainLayout";
import About from "@/pages/about";
import Contacts from "@/pages/Contacts";
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
        path:"/about",
        element:<About />
    },
    {
        path:"/contacts",
        element:<Contacts />
    },
    {
        path:"/profile",
        element:<Profile />
    },
   
    
  ] },
]);

export const AppRouter=()=>{
    return <RouterProvider router={router} />
}

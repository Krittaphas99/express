
import NavBar from "@/components/front/NavBar";

import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <>
      <NavBar />
      <div><Outlet /></div>
     
    </>
  );
}

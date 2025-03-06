
import NavBar from "@/components/front/NavBar";
import Footer from "@/components/front/Footer";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <>
      <NavBar />
      <div><Outlet /></div>
      <Footer />
    </>
  );
}

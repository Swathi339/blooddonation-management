import { Outlet } from "react-router-dom";
import { StickyNavbar } from "../components/Navbar/StickyNavbar";
import { FooterWithLogo } from "../components/Footer/FooterWithLogo";

const MainLayout = () => {
  return (
    <div className="flex bg-red-100 flex-col min-h-screen">
      <div className="w-full fixed  z-50">
        <StickyNavbar />
      </div>

    
      <div className="flex-grow mt-10 w-full">
        <div className="">
          <Outlet />
        </div>
      </div>

      <div className="w-full">
        <FooterWithLogo />
      </div>
    </div>
  );
};

export default MainLayout;

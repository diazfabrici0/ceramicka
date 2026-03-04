import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components/shared/Navbar";
import { Footer } from "../components/shared/Footer";
import { Banner } from "../components/shared/home/Banner";
import { Newsletter } from "../components/shared/home/Newsletter";

export const RootLayout = () => {

    const { pathname } = useLocation();

    console.log(pathname)

    return (
        <div className="h-screen flex flex-col">
            <Navbar />

            {pathname === "/" &&  <Banner />}

            <main className="container my-8 flex-1">
                <Outlet />
            </main>
            
            {pathname === "/" &&  <Newsletter />}

            <Footer />
        </div>
    )

};
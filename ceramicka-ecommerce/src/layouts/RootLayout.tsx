import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components/shared/Navbar";
import { Footer } from "../components/shared/Footer";
import { Banner } from "../components/shared/home/Banner";
import { Newsletter } from "../components/shared/home/Newsletter";

export const RootLayout = () => {
    const location = useLocation();

    const excludeRoutes = ['/adminPanel', '/loginAdmin', '/productList', '/account'];
    const showFooter = !excludeRoutes.includes(location.pathname);

    const { pathname } = useLocation();

    console.log(pathname)

    return (
        <div className="h-screen flex flex-col">
            <Navbar />

            {pathname === "/" &&  <Banner />}

            <main className="container mt-4 flex-1">
                <Outlet />
            </main>
            
            {pathname === "/" &&  <Newsletter />}

            {showFooter && <Footer />}
        </div>
    )

};
import { Outlet } from "react-router-dom";

export const RootLayout = () => {
    return (
        <div>
            <div>navbar</div>

            <Outlet />

            <div>footer</div>
        </div>
    )

};
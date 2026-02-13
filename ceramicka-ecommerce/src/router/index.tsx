import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        element:<RootLayout />,
        children:[
            {
                index: true,
                element:<div>home</div>
            },
            {
                path:'stock',
                element:<div>stock</div>
            },
        {
                path:'sobremi',
                element:<div>sobremi</div>
            },
        ]
    }
])
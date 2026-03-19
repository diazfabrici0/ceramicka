import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { HomePage, Stock, LoginAdmin, Account, AdminPanel } from "../Pages";
import { Product } from "../components/shared/product/Product";

export const router = createBrowserRouter([
    {
        path: "/",
        element:<RootLayout />,
        children:[
            {
                index: true,
                element:<HomePage />
            },
            {
                path:'stock',
                element:<Stock />
            },
        {
            path:'producto/:id',
            element:<Product  />
        },
        {
            path:'account',
            element:<Account />
        },
        {
            path:'loginAdmin',
            element:<LoginAdmin  />
        },
        {
            path:'adminPanel',
            element:<AdminPanel />
        }
        ]
    }
])
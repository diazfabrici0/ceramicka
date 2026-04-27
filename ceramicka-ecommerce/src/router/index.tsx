import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { HomePage, Stock, LoginAdmin, Account, AdminPanel, ProductList, ResetPassword } from "../Pages";
import { Product } from "../components/shared/product/Product";
import { ProtectedLayout } from "../components/shared/ProtectedLayout";

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
                path:'product/:id',
                element:<Product  />
            },
            {
                element: <ProtectedLayout />,
                children: [
                    {
                        path:'account',
                        element:<Account />
                    },
                    {
                        path:'adminPanel',
                        element:<AdminPanel />
                    },
                    {
                        path:'productList',
                        element:<ProductList />
                    },
                ]
            },
            {
                path:'loginAdmin',
                element:<LoginAdmin  />
            },
            {
                path:'reset-password',
                element:<ResetPassword />
            },
        ]
    }
])
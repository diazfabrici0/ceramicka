import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { HomePage, PiecesPage, AboutPage } from "../Pages";
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
                element:<PiecesPage />
            },
        {
                path:'sobremi',
                element:<AboutPage  />
            },
        {
            path:'producto/:id',
            element:<Product  />
        }
        ]
    }
])
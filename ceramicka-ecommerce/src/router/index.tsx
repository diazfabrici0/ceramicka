import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { HomePage, PiecesPage, AboutPage } from "../Pages";

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
        ]
    }
])
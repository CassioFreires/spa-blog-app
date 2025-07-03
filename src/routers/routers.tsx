import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home/Home.page";
import NavBar from "../components/NavBar/NavBar.components";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <NavBar />,
        children: [
            {index: true, element: <HomePage />}
        ]
    }
])
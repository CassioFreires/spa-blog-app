import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/public/Home/Home.page";
import DefaultLayout from "../layouts/DefaultLayout.layout";
import ArticlePage from "../pages/public/Article/Article.page";
import ArticleUniquePage from "../pages/public/ArticleUnique/ArticleUnique.page";
import AboutPage from "../pages/public/About/About";
import ArticleForCategory from "../pages/public/ArticleForCategory/ArticleForCategory.page";
import CategoryPage from "../pages/public/Category/Category.page";
import ServicesPage from "../pages/public/Services/Services.page";
import ContactPage from "../pages/public/Contact/Contact.page";
import SigninPage from "../pages/Auth/Signin/Signin.page";
import SignupPage from "../pages/Auth/Signup/Signup.page";
import PrivateLayout from "../layouts/PrivateLayout.layout";
import ProfilePage from "../pages/Private/Profile/Profile.page";
import MyArticlesPage from "../pages/Private/MyArticles/MyArticles.page";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/', element: <HomePage />,
            },
            {
                path: 'artigos', element: <ArticlePage />
            },
            {
                path: 'artigos/:id', element: <ArticleUniquePage />
            },
            {
                path: 'servicos', element: <ServicesPage />
            },
            {
                path: 'categorias', element: <CategoryPage />
            },
            {
                path: 'categorias/:slug', element: <ArticleForCategory />
            },
            {
                path: 'sobre', element: <AboutPage />
            },
            {
                path: 'contato', element: <ContactPage />
            },
            {
                path: 'login', element: <SigninPage />
            },
            {
                path: 'cadastra-se', element: <SignupPage />
            },
        ]
    },
    {
        path: 'painel',
        element: <PrivateLayout />,
        children: [
            {   
                path: 'perfil', element: <ProfilePage /> ,

            },
            {
                path: 'artigos', element: <MyArticlesPage />
            }
        ]
       
    }
])
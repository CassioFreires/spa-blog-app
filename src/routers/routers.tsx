import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout.layout';
import PrivateLayout from '../layouts/PrivateLayout.layout';
import HomePage from '../pages/public/Home/Home.page';
import ArticlePage from '../pages/public/Article/Article.page';
import ArticleUniquePage from '../pages/public/ArticleUnique/ArticleUnique.page';
import ServicesPage from '../pages/public/Services/Services.page';
import CategoryPage from '../pages/public/Category/Category.page';
import AboutPage from '../pages/public/About/About';
import ContactPage from '../pages/public/Contact/Contact.page';
import SigninPage from '../pages/Auth/Signin/Signin.page';
import SignupPage from '../pages/Auth/Signup/Signup.page';
import ProfilePage from '../pages/Private/Profile/Profile.page';
import MyArticlesPage from '../pages/Private/MyArticles/MyArticles.page';
import ArticleForCategory from '../pages/public/ArticleForCategory/ArticleForCategory.page';
import { ProtectedRoute } from '../components/ProtectedRouter/ProtectedRoute';
import EditProfilePage from '../pages/Private/EditProfile/EditProfile';
import NotFoundPage from '../pages/public/NotFoundPage/NotFoundPage';
import EditMyArticles from '../pages/Private/EditMyArticles/EditMyArticles';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            { path: '/', element: <HomePage /> },
            { path: 'artigos', element: <ArticlePage /> },
            { path: 'artigos/:id', element: <ArticleUniquePage /> },
            { path: 'servicos', element: <ServicesPage /> },
            { path: 'categorias', element: <CategoryPage /> },
            { path: 'categorias/:slug', element: <ArticleForCategory /> },
            { path: 'sobre', element: <AboutPage /> },
            { path: 'contato', element: <ContactPage /> },
            { path: 'login', element: <SigninPage /> },
            { path: 'cadastra-se', element: <SignupPage /> },
            {path: '*', element: <NotFoundPage />}
        ],
    },

    // ✅ ROTAS PROTEGIDAS (requer login e role específica, se quiser)
    {
        path: '/painel',
        element: <ProtectedRoute />, // protege tudo abaixo
        children: [
            {
                element: <PrivateLayout />,
                children: [
                    { index: true, element: <ProfilePage /> },
                    { path: 'perfil', element: <ProfilePage /> },
                    {
                        path: 'perfil/meus-artigos',
                        element: <ProtectedRoute allowedRoles={['admin', 'editor', 'author']} />,
                        children: [{ index: true, element: <MyArticlesPage /> }],
                    },
                    {
                     path: 'perfil/meus-artigos/editar/:id',
                    //  element
                    children: [{index: true, element: <EditMyArticles />} ]   
                    },
                    {
                        path: 'perfil/editar',
                        element: <ProtectedRoute allowedRoles={['admin', 'author', 'editor']} />,
                        children: [{ index: true, element: <EditProfilePage /> }]
                    },
                    {
                        path: '*', element: <NotFoundPage />
                    }
                ],
            },
        ],
    },
]);

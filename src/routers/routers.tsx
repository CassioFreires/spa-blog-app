import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout.layout';
import PrivateLayout from '../layouts/PrivateLayout.layout';
import HomePage from '../pages/public/Home/Home.page';
import ServicesPage from '../pages/public/Services/Services.page';
import CategoryPage from '../pages/public/Category/Category.page';
import AboutPage from '../pages/public/About/About';
import ContactPage from '../pages/public/Contact/Contact.page';
import SigninPage from '../pages/Auth/Signin/Signin.page';
import SignupPage from '../pages/Auth/Signup/Signup.page';
import ProfilePage from '../pages/Private/Profile/Profile.page';
import { ProtectedRoute } from '../components/ProtectedRouter/ProtectedRoute';
import EditProfilePage from '../pages/Private/EditProfile/EditProfile';
import NotFoundPage from '../pages/public/NotFoundPage/NotFoundPage';
import PostPage from '../pages/public/Post/PostPage';
import PostDetailPage from '../pages/public/PostDetailPage/PostDetailPage';
import PostPorCategory from '../pages/public/PostPorCategory/PostPorCategory';
import MyPostsPage from '../pages/Private/MyPosts/MyPosts';
import CreateMyPostPage from '../pages/Private/CreateMyPostPage/CreateMyPost';
import EditeMyPostPage from '../pages/Private/EditeMyPost/EditeMyPost';
import AllFriendsPage from '../pages/Private/Friends/AllFriends';
import NewFriendsPage from '../pages/Private/Friends/NewFriends';
import FriendProfilePage from '../pages/Private/FriendProfile/FriendProfile';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            { path: '/', element: <HomePage /> },
            { path: 'postagens', element: <PostPage /> },
            { path: 'postagens/:id', element: <PostDetailPage /> },
            { path: 'categorias', element: <CategoryPage /> },
            { path: 'categorias/:slug', element: <PostPorCategory /> },
            { path: 'servicos', element: <ServicesPage /> },
            { path: 'sobre', element: <AboutPage /> },
            { path: 'contato', element: <ContactPage /> },
            { path: 'login', element: <SigninPage /> },
            { path: 'cadastra-se', element: <SignupPage /> },
            { path: '*', element: <NotFoundPage /> }
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
                        path: 'perfil/editar',
                        element: <ProtectedRoute allowedRoles={['admin', 'author', 'editor', 'user']} />,
                        children: [{ index: true, element: <EditProfilePage /> }]
                    },
                    {
                        path: 'perfil/add-postagem',
                        element: <ProtectedRoute allowedRoles={['admin', 'editor', 'author', 'user']} />,
                        children: [{ index: true, element: <CreateMyPostPage /> }]

                    },
                    {
                        path: 'perfil/minhas-postagens',
                        element: <ProtectedRoute allowedRoles={['admin', 'editor', 'author', 'user']} />,
                        children: [{ index: true, element: <MyPostsPage /> }],
                    },
                    {
                        path: 'perfil/minhas-postagens/editar/:id',
                        element: <ProtectedRoute allowedRoles={['admin', 'editor', 'author', 'user']} />,
                        children: [{ index: true, element: <EditeMyPostPage /> }]
                    },
                    {
                        path: 'perfil/amigos',
                        element: <ProtectedRoute allowedRoles={['admin', 'editor', 'author', 'user']} />,
                        children: [
                            { index: true, element: <AllFriendsPage /> }, // Rota padrão para ver todos os amigos
                            { path: 'sugestoes', element: <NewFriendsPage /> }, // Rota para ver novas sugestões
                        ]
                    },
                    {
                        path: 'perfil/:id',
                        element: <ProtectedRoute allowedRoles={['admin', 'editor', 'author', 'user']} />,
                        children: [{ index: true, element: <FriendProfilePage />}]
                    },
                    {
                        path: '*', element: <NotFoundPage />
                    }
                ],
            },
        ],
    },
]);

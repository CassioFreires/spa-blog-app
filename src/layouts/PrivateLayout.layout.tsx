import { Outlet } from 'react-router-dom';
import Sidebar from '../components/SideBar/SideBar.components';
import Container from '../components/Container/Container.components';
import NavBar from '../components/NavBar/NavBar.components';

import './PrivateDefaultLayout.css'
import Footer from '../components/Footer/Footer.components';

function PrivateLayout() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <NavBar /> {/* Pode ou não manter o mesmo NavBar */}
            <div className="d-flex flex-grow-1">
                <Sidebar />
                <main className="flex-grow-1 p-4 bg-light">
                    <Container>
                        <Outlet />
                    </Container>
                </main>
            </div>
                <Footer />

        </div>
    );
}


export default PrivateLayout;
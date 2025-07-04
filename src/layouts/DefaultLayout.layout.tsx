import { Outlet } from "react-router-dom";
import Container from "../components/Container/Container.components";
import NavBar from "../components/NavBar/NavBar.components";
import './DefaultLayout.css'
import Footer from "../components/Footer/Footer.components";


function DefaultLayout() {
  return (
    <div className="app-wrapper d-flex flex-column min-vh-100">
      <NavBar />

      <main className="flex-grow-1">
        <Container>
          <Outlet />
        </Container>
      </main>

      <Footer/>
    </div>
  );
}

export default DefaultLayout;

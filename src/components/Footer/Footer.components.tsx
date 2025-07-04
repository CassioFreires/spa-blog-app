function Footer() {
  return (
    <footer className="footer bg-dark text-light py-4 mt-auto">
      <div className="container text-center">
        <p className="mb-2">© {new Date().getFullYear()} Meu Blog. Todos os direitos reservados.</p>
        <small>
          Desenvolvido por <a href="https://github.com/seuusuario" className="footer-link">Cassio Souza</a>
        </small>
      </div>
    </footer>
  );
}

export default Footer;

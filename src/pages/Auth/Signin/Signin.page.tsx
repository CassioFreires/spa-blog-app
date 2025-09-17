import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Container from '../../../components/Container/Container.components';
import './Signin.css';
import AuthService from '../../../services/auth-service';
import { useAuth } from '../../../context/AuthContext';

function SigninPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', senha: '' });
  const [erro, setErro] = useState('');
  const authService = new AuthService();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await authService.signin(form.email, form.senha);
      const user = result.result.user;
      login(user, result.token); 
      navigate('/painel/perfil', { replace: true });
    } catch (error: any) {
      setErro(error.message || 'Usuário ou senha está inválido');
      setTimeout(() => setErro(''), 5000); // Limpa erro após 5 segundos
    }
  };

  return (
    <Container>
      <section className="login-page py-5">
        <header className="text-center mb-4 fade-in">
          <h1 className="fw-bold display-6">Login</h1>
          <p className="text-secondary">Acesse sua conta para continuar.</p>
        </header>

        <div className="row justify-content-center fade-in">
          <div className="col-md-6 col-lg-4">
            <form onSubmit={handleSubmit} className="border rounded p-4 shadow-sm bg-white">
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">E-mail</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="senha" className="form-label fw-semibold">Senha</label>
                <input
                  type="password"
                  className="form-control"
                  id="senha"
                  name="senha"
                  placeholder="******"
                  value={form.senha}
                  onChange={handleChange}
                  required
                />
              </div>

              {erro && <div className="alert alert-danger">{erro}</div>}

              <button type="submit" className="btn btn-primary w-100 mt-2">
                <i className="bi bi-box-arrow-in-right me-1"></i> Entrar
              </button>

              <div className="text-center mt-3">
                <small className="text-secondary">
                  Ainda não tem conta? <Link to="/cadastra-se">Cadastra-se</Link>
                </small>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Container>
  );
}

export default SigninPage;

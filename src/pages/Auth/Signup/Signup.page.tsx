import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/Container/Container.components';
import './Signup.css'

function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });
  const [erro, setErro] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.senha !== form.confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    // Simulação de cadastro
    console.log('Usuário cadastrado:', form);
    navigate('/login');
  };

  return (
    <Container>
      <section className="cadastro-page py-5">
        <header className="text-center mb-4 fade-in">
          <h1 className="fw-bold display-6">Criar Conta</h1>
          <p className="text-secondary">Cadastre-se para aproveitar todos os recursos do blog.</p>
        </header>

        <div className="row justify-content-center fade-in">
          <div className="col-md-6 col-lg-4">
            <form onSubmit={handleSubmit} className="border rounded p-4 shadow-sm bg-white">
              <div className="mb-3">
                <label htmlFor="nome" className="form-label fw-semibold">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  name="nome"
                  placeholder="Seu nome completo"
                  value={form.nome}
                  onChange={handleChange}
                  required
                />
              </div>

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
                  placeholder="Crie uma senha"
                  value={form.senha}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="confirmarSenha" className="form-label fw-semibold">Confirmar Senha</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmarSenha"
                  name="confirmarSenha"
                  placeholder="Repita a senha"
                  value={form.confirmarSenha}
                  onChange={handleChange}
                  required
                />
              </div>

              {erro && <div className="alert alert-danger">{erro}</div>}

              <button type="submit" className="btn btn-success w-100 mt-2">
                <i className="bi bi-person-plus me-1"></i> Criar conta
              </button>

              <div className="text-center mt-3">
                <small className="text-secondary">
                  Já tem conta? <a href="/login">Entrar</a>
                </small>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Container>
  );
}

export default SignupPage;

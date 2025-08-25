import Container from '../../../components/Container/Container.components';
import { useState } from 'react';

function ContactPage() {
  const [form, setForm] = useState({ nome: '', email: '', mensagem: '' });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();



    setEnviado(true);
    setForm({ nome: '', email: '', mensagem: '' });

    setTimeout(() => setEnviado(false), 5000);
  };

  return (
    <Container>
      <section className="contato-page py-5">
        <header className="text-center mb-5 fade-in">
          <h1 className="display-5 fw-bold">Fale Conosco</h1>
          <p className="lead text-secondary">
            Tem dúvidas, sugestões ou deseja solicitar um serviço? Entre em contato!
          </p>
        </header>

        <div className="row justify-content-center fade-in">
          <div className="col-md-8 col-lg-6">
            <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-white">
              <div className="mb-3">
                <label htmlFor="nome" className="form-label fw-semibold">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  name="nome"
                  required
                  value={form.nome}
                  onChange={handleChange}
                  placeholder="Seu nome"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">E-mail</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="mensagem" className="form-label fw-semibold">Mensagem</label>
                <textarea
                  className="form-control"
                  id="mensagem"
                  name="mensagem"
                  rows={5}
                  required
                  value={form.mensagem}
                  onChange={handleChange}
                  placeholder="Escreva sua mensagem aqui..."
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                <i className="bi bi-send me-2"></i> Enviar
              </button>

              {enviado && (
                <div className="alert alert-success mt-3" role="alert">
                  Mensagem enviada com sucesso! ✅
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </Container>
  );
}

export default ContactPage;

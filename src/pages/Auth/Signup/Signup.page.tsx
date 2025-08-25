// src/pages/Signup/SignupPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Container from "../../../components/Container/Container.components";
import AuthService from "../../../services/auth-service";
import AlertMessage from "../../../components/AlertMessage/AlertMessage";
import Loader from "../../../components/Loader/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";

// 1️⃣ Esquema de validação com Zod
const signupSchema = z
  .object({
    nome: z.string().min(2, "O nome precisa ter no mínimo 2 caracteres"),
    sobrenome: z.string().min(2, "O sobrenome precisa ter no mínimo 2 caracteres"),
    email: z.string().email("Email inválido"),
    senha: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres"),
    confirmPassword: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres"),
  })
  .refine((data) => data.senha === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

// 2️⃣ Tipagem do formulário
type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  // 3️⃣ Função de envio
  const onSubmit = async (data: SignupFormData) => {
    setServerError("");
    try {
      const authService = new AuthService();
      await authService.signup({
        name: data.nome,
        lastName: data.sobrenome,
        email: data.email,
        password_hash: data.senha,
        confirmPassword: data.confirmPassword,
        role_id: 4, // Usuário padrão
      });

      toast.success("Conta criada com sucesso! Redirecionando...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error: any) {
      console.error(error);
      const message = error?.response?.data?.message || error?.message || "Erro ao registrar usuário";
      setServerError(message);
      toast.error(message);
    }
  };

  return (
    <Container>
      <section className="cadastro-page py-5">
        <header className="text-center mb-4 fade-in">
          <h1 className="fw-bold display-6">Criar Conta</h1>
          <p className="text-secondary">
            Cadastre-se para aproveitar todos os recursos do blog.
          </p>
        </header>

        <div className="row justify-content-center fade-in">
          <div className="col-md-6 col-lg-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="border rounded p-4 shadow-sm bg-white"
            >
              {serverError && <AlertMessage message={serverError} />}

              {/* Nome */}
              <div className="mb-3">
                <label htmlFor="nome" className="form-label fw-semibold">
                  Nome
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  {...register("nome")}
                  placeholder="Seu nome"
                  disabled={isSubmitting}
                />
                {errors.nome && <p className="text-danger">{errors.nome.message}</p>}
              </div>

              {/* Sobrenome */}
              <div className="mb-3">
                <label htmlFor="sobrenome" className="form-label fw-semibold">
                  Sobrenome
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="sobrenome"
                  {...register("sobrenome")}
                  placeholder="Seu sobrenome"
                  disabled={isSubmitting}
                />
                {errors.sobrenome && <p className="text-danger">{errors.sobrenome.message}</p>}
              </div>

              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">
                  E-mail
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  {...register("email")}
                  placeholder="seu@email.com"
                  disabled={isSubmitting}
                />
                {errors.email && <p className="text-danger">{errors.email.message}</p>}
              </div>

              {/* Senha */}
              <div className="mb-3">
                <label htmlFor="senha" className="form-label fw-semibold">
                  Senha
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="senha"
                  {...register("senha")}
                  placeholder="Crie uma senha"
                  disabled={isSubmitting}
                />
                {errors.senha && <p className="text-danger">{errors.senha.message}</p>}
              </div>

              {/* Confirmar senha */}
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label fw-semibold">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  {...register("confirmPassword")}
                  placeholder="Repita a senha"
                  disabled={isSubmitting}
                />
                {errors.confirmPassword && (
                  <p className="text-danger">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Loader ou botão */}
              {isSubmitting ? (
                <Loader size="sm" message="Criando conta..." />
              ) : (
                <button type="submit" className="btn btn-success w-100 mt-2">
                  Criar conta
                </button>
              )}

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

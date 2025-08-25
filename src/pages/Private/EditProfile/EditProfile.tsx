import { useState, useEffect } from 'react';
import Container from "../../../components/Container/Container.components";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
// Removendo a importação de Toaster de react-hot-toast
import { toast } from "react-toastify"; // Importando de react-toastify
import { z } from "zod";
import UserService from '../../../services/users-service';
import { InputField } from "../../../components/InputField/InputField";
import { TextAreaField } from "../../../components/TextAreaField.tsx/TextAreaField";
import "./EditProfile.css";

// Esquema de validação do formulário com Zod
const userSchema = z.object({
  name: z.string().min(2, "Nome muito curto"),
  email: z.string().email("Email inválido"),
  bio: z.string().optional(),
  avatarUrl: z.string().url("URL inválida").optional().or(z.literal("")),
});

type FormData = {
  name: string;
  email: string;
  bio: string;
  avatarUrl: string;
};

function EditProfilePage() {
  const { user, token, login } = useAuth()!;
  const navigate = useNavigate();

  // Estado do formulário
  const [formData, setFormData] = useState<FormData>({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    avatarUrl: user?.avatarUrl || '',
  });
  
  // Estado de loading para o botão
  const [loading, setLoading] = useState(false);

  // Verifica se houve alguma alteração nos dados do formulário
  const isChanged =
    formData.name !== user?.name ||
    formData.email !== user?.email ||
    formData.bio !== user?.bio ||
    formData.avatarUrl !== user?.avatarUrl;

  // Atualiza os valores do form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isChanged || !user?.id) return;

    // Validação com Zod
    const parseResult = userSchema.safeParse(formData);
    if (!parseResult.success) {
      const firstError = Object.values(parseResult.error.flatten().fieldErrors)[0]?.[0] || "Erro no formulário";
      toast.error(firstError);
      return;
    }

    setLoading(true);

    try {
      const updatedUser = await new UserService().update(user.id, formData, token!);
      login(updatedUser, token!);

      toast.success("Perfil atualizado com sucesso!");

      // Pequeno atraso para garantir que o toast seja exibido antes da navegação
      setTimeout(() => {
        navigate("/painel/perfil");
      }, 500); 

    } catch (err: any) {
      console.error("Erro ao atualizar perfil:", err);
      toast.error(err.message || "Erro ao atualizar perfil");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Container>
        <section className="perfil-page text-center py-5">
          <h2 className="mb-3">Você não está logado</h2>
          <p className="text-muted">Faça login para acessar seu perfil.</p>
        </section>
      </Container>
    );
  }

  return (
    <Container>
      {/* Removendo o Toaster, pois o ToastContainer já está no App.tsx */}
      <section className="edit-perfil-page">
        <div className="card shadow-sm p-4">
          <h2 className="mb-4">Editar Perfil</h2>
          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            {/* Avatar */}
            <div className="text-center">
              <img
                src={formData.avatarUrl || "https://i.pravatar.cc/150"}
                alt="Avatar"
                className="edit-avatar mb-3"
              />
              <InputField
                label="URL do Avatar"
                name="avatarUrl"
                type="url"
                placeholder="Digite a URL do avatar"
                value={formData.avatarUrl}
                onChange={handleChange}
              />
            </div>

            {/* Campos */}
            <InputField
              label="Nome"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextAreaField
              label="Bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            />

            <div className="d-flex justify-content-between mt-3">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => navigate(-1)}
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-gradient fw-bold"
                disabled={!isChanged || loading}
              >
                {loading ? "Salvando..." : "Salvar Alterações"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </Container>
  );
}

export default EditProfilePage;
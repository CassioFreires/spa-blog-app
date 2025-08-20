// pages/EditProfilePage.tsx
import Container from "../../../components/Container/Container.components";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEditProfileForm } from "../../../hooks/useEditProfileForm";
import { InputField } from "../../../components/InputField/InputField";
import { TextAreaField } from "../../../components/TextAreaField.tsx/TextAreaField";
import "./EditProfile.css";

function EditProfilePage() {
  const { user, token, login } = useAuth()!;
  const navigate = useNavigate();

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

  const { formData, handleChange, handleSubmit, isChanged, loading } = useEditProfileForm(
    user,
    token!,
    login,
    () => navigate("/painel/perfil")
  );

  return (
    <Container>
      <Toaster position="top-right" />
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

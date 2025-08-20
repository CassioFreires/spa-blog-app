// hooks/useEditProfileForm.ts
import { useState } from "react";
import { z } from "zod";
import toast from "react-hot-toast";
import type { IUser } from "../interfaces/user";
import UserService from "../services/users-service";

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

export function useEditProfileForm(
  user: IUser,
  token: string,
  login: (user: IUser, token: string) => void,
  onSuccess: () => void
) {
  // Estado do formulário inicializado com os dados do usuário
  const [formData, setFormData] = useState<FormData>({
    name: user.name,
    email: user.email,
    bio: user.bio,
    avatarUrl: user.avatarUrl,
  });

  // Estado de loading para desabilitar botão enquanto atualiza
  const [loading, setLoading] = useState(false);

  // Verifica se algum campo foi alterado
  const isChanged =
    formData.name !== user.name ||
    formData.email !== user.email ||
    formData.bio !== user.bio ||
    formData.avatarUrl !== user.avatarUrl;

  // Atualiza os valores do form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isChanged) return; // Bloqueia envio se nada mudou

    // Validação com Zod
    const parseResult = userSchema.safeParse(formData);
    if (!parseResult.success) {
      const firstError = Object.values(parseResult.error.flatten().fieldErrors)[0]?.[0] || "Erro no formulário";
      toast.error(firstError);
      return;
    }

    try {
      setLoading(true);

      // Atualiza usuário no backend
      const updatedUser = await new UserService().update(user.id!, formData, token);

      // Atualiza contexto mantendo token
      login(updatedUser, token);

      toast.success("Perfil atualizado com sucesso!");
      onSuccess(); // callback para navegação ou outra ação
    } catch (err: any) {
      console.error("Erro ao atualizar perfil:", err);
      toast.error(err.message || "Erro ao atualizar perfil");
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleSubmit, isChanged, loading };
}

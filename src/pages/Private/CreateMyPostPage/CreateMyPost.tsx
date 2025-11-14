// CreateMyPost.tsx

import { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Container from '../../../components/Container/Container.components';
import PostService from '../../../services/posts-service';
import CategoriesService from '../../../services/categories-service';
import type { ICategory } from '../../../interfaces/category';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-toastify';
import { FaPaperPlane, FaTimes, FaPlus, FaTrashAlt } from 'react-icons/fa';
import './CreateMyPost.css';

// --- Tipos para Postagem e Enquete ---
type PostType = 'standard' | 'poll';

// O schema principal será mais abrangente agora
const createPostSchema = z
  .object({
    postType: z.enum(['standard', 'poll']), // Novo campo para o tipo de postagem
    title: z.string().min(3, 'O título deve ter pelo menos 3 caracteres.'),
    // Subtítulo, Categoria e Conteúdo serão validados condicionalmente
    subtitle: z.string().optional(),
    category_id: z.string().optional(),
    content: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Validação específica para 'standard' (Postagem Padrão)
    if (data.postType === 'standard') {
      if (!data.subtitle || data.subtitle.length < 5) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'O subtítulo deve ter pelo menos 5 caracteres.',
          path: ['subtitle'],
        });
      }
      if (!data.category_id || data.category_id === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Selecione uma categoria.',
          path: ['category_id'],
        });
      }
      if (!data.content || data.content.length < 20) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'O conteúdo deve ter pelo menos 20 caracteres.',
          path: ['content'],
        });
      }
    }
  });

type CreatePostFormData = z.infer<typeof createPostSchema>;

export default function CreateMyPostPage() {
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const postService = useMemo(() => new PostService(), []);
  const categoriesService = useMemo(() => new CategoriesService(), []);

  // --- States para Categoria e Imagem ---
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(false);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // --- States para Enquete ---
  const [postType, setPostType] = useState<PostType>('standard');
  const [pollOptions, setPollOptions] = useState<string[]>(['', '']); // 2 opções iniciais
  const [pollOptionsError, setPollOptionsError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      postType: 'standard',
      title: '',
      subtitle: '',
      category_id: '',
      content: '',
    },
  });

  const formPostType = watch('postType');

  useEffect(() => {
    setPostType(formPostType);
  }, [formPostType]);

  // Função para lidar com mudança do input file (MANTIDA)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setSelectedImage(null);
      setPreviewImage(null);
    }
  };

  // Efeito para carregar as categorias (MANTIDO)
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoadingCategories(true);
        setCategoriesError(null);

        const res = await categoriesService.getAll(1, 100);

        const list: ICategory[] = Array.isArray(res) ? res : (res?.data ?? []);
        setCategories(list);
      } catch (err: any) {
        const message = err?.message || 'Erro ao carregar categorias.';
        setCategoriesError(message);
        toast.error(message);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    loadCategories();
  }, [categoriesService]);

  // --- Funções de gerenciamento das Opções da Enquete (MANTIDAS) ---
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const addOption = () => {
    if (pollOptions.length < 10) {
      setPollOptions([...pollOptions, '']);
    } else {
      toast.warn('Máximo de 10 opções para a enquete.');
    }
  };

  const removeOption = (index: number) => {
    if (pollOptions.length > 2) {
      const newOptions = pollOptions.filter((_, i) => i !== index);
      setPollOptions(newOptions);
    } else {
      toast.warn('A enquete deve ter no mínimo 2 opções.');
    }
  };

  // Função para limpar estados ao trocar o tipo de postagem (MANTIDA)
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as PostType;
    setPostType(newType);
    reset({
      ...watch(),
      postType: newType,
    });
    // Limpa estados específicos ao trocar o tipo
    setSelectedImage(null);
    setPreviewImage(null);
    setPollOptions(['', '']);
    setPollOptionsError(null);
  };

  // --- Função de Submissão (AJUSTADA) ---
  const onSubmit = async (data: CreatePostFormData) => {
    if (!user || !token) {
      toast.error('Você precisa estar logado para criar uma postagem.');
      return;
    }

    try {
      if (data.postType === 'standard') {
        // --- Lógica de Criação de Postagem Padrão ---
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('subtitle', data.subtitle!);
        formData.append('category_id', String(Number(data.category_id)));
        formData.append('content', data.content!);

        // Upload de imagem AQUI (mantida)
        if (selectedImage) {
          formData.append('postImage', selectedImage);
        }

        await postService.createPostByUserFormData(token, formData);

        toast.success('Artigo criado com sucesso!');
      } else if (data.postType === 'poll') {
        // --- Lógica de Criação de Enquete ---
        const validOptions = pollOptions.filter((o) => o.trim().length >= 1);

        if (validOptions.length < 2) {
          setPollOptionsError('A enquete deve ter no mínimo 2 opções válidas.');
          toast.error('A enquete deve ter no mínimo 2 opções válidas.');
          return;
        }
        setPollOptionsError(null);

        const pollData = {
          question: data.title,
          // Se a sua API de enquete suportar categoria, você pode incluir: categoryId: Number(data.category_id)
          user_id: user.id,
          options: validOptions,
          // Se a sua API de enquete suportar imagem, você precisará de uma forma de enviar
          // o 'selectedImage' para o seu serviço de enquete. Exemplo:
          // postImage: selectedImage // (Se o serviço de enquete aceitar File/FormData)
        };
        
        // Simulação de envio de FormData para Enquete (se sua API for unificada ou forçar)
        const pollFormData = new FormData();
        pollFormData.append('question', data.title);
        pollFormData.append('options', JSON.stringify(validOptions)); // Envia as opções como JSON
        // TODO: adicione outros campos que sua API de enquete precise (como category_id)

        if (selectedImage) {
           pollFormData.append('pollImage', selectedImage); // Nome do campo na API de enquete
        }


        // TODO: SUBSTITUA PELO SEU SERVIÇO REAL DE ENQUETE, possivelmente usando pollFormData
        console.log('Dados da Enquete a serem enviados:', pollData);
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Simula a requisição

        toast.success('Enquete criada com sucesso!');
      }

      navigate('/painel/perfil/minhas-postagens');
    } catch (err: any) {
      console.error('Erro ao criar postagem/enquete:', err);
      toast.error(err?.message || 'Erro ao criar a postagem. Tente novamente.');
    }
  };

  // O componente renderiza...
  return (
    <Container>
      <section className="create-article-page">
        <div className="header-actions mb-5 d-flex justify-content-between align-items-center">
          <h2>Nova Postagem</h2>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => navigate(-1)}
          >
            <FaTimes className="me-2" /> Cancelar
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* SELEÇÃO DO TIPO DE POSTAGEM */}
          <div className="form-group mb-4">
            <label htmlFor="postType">Tipo de Postagem</label>
            <select
              id="postType"
              className="form-control"
              {...register('postType')}
              onChange={handleTypeChange}
            >
              <option value="standard">Postagem Padrão (Artigo)</option>
              <option value="poll">Enquete</option>
            </select>
          </div>

          {/* TÍTULO (Pergunta da Enquete) */}
          <div className="form-group mb-3">
            <label htmlFor="title">
              {postType === 'poll' ? 'Pergunta da Enquete' : 'Título'}
            </label>
            <input
              id="title"
              className="form-control"
              placeholder={
                postType === 'poll'
                  ? 'Qual é a sua opinião sobre...?'
                  : 'Digite um título claro e impactante'
              }
              {...register('title')}
            />
            {errors.title && (
              <small className="text-danger">{errors.title.message}</small>
            )}
          </div>

          {/* CAMPOS ESPECÍFICOS PARA POSTAGEM PADRÃO */}
          {postType === 'standard' && (
            <>
              {/* SUBTÍTULO */}
              <div className="form-group mb-3">
                <label htmlFor="subtitle">Subtítulo</label>
                <input
                  id="subtitle"
                  className="form-control"
                  placeholder="Adicione um subtítulo que complemente a ideia principal"
                  {...register('subtitle')}
                />
                {errors.subtitle && (
                  <small className="text-danger">
                    {errors.subtitle.message}
                  </small>
                )}
              </div>

              {/* CATEGORIA */}
              <div className="form-group mb-3">
                <label htmlFor="category">Categoria</label>
                <select
                  id="category"
                  className="form-control"
                  disabled={isLoadingCategories || !!categoriesError}
                  {...register('category_id')}
                >
                  <option value="">
                    {isLoadingCategories
                      ? 'Carregando categorias...'
                      : categoriesError
                        ? 'Erro ao carregar categorias'
                        : 'Selecione uma categoria'}
                  </option>

                  {categories?.map((cat) => (
                    <option key={cat.id} value={String(cat.id)}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                {errors.category_id && (
                  <small className="text-danger">
                    {errors.category_id.message}
                  </small>
                )}

                {!isLoadingCategories &&
                  !categoriesError &&
                  categories.length === 0 && (
                    <small className="text-muted d-block mt-1">
                      Nenhuma categoria disponível.
                    </small>
                  )}
                {categoriesError && (
                  <small className="text-danger d-block mt-1">
                    {categoriesError}
                  </small>
                )}
              </div>

              {/* CONTEÚDO */}
              <div className="form-group mb-4">
                <label htmlFor="content">Conteúdo</label>
                <textarea
                  id="content"
                  className="form-control"
                  rows={8}
                  placeholder="Escreva aqui o conteúdo do artigo..."
                  {...register('content')}
                ></textarea>
                {errors.content && (
                  <small className="text-danger">{errors.content.message}</small>
                )}
              </div>
            </>
          )}

          {/* CAMPOS ESPECÍFICOS PARA ENQUETE */}
          {postType === 'poll' && (
            <div className="poll-options mb-4">
              <label className="d-block mb-2">Opções da Enquete (Mínimo 2)</label>

              {pollOptions.map((opt, index) => (
                <div key={index} className="input-group mb-2">
                  <span className="input-group-text">Opção {index + 1}</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={`Ex: Opção ${index + 1}`}
                    value={opt}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                  />
                  {pollOptions.length > 2 && (
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => removeOption(index)}
                      title="Remover opção"
                    >
                      <FaTrashAlt />
                    </button>
                  )}
                </div>
              ))}

              {pollOptionsError && (
                <small className="text-danger d-block mb-2">
                  {pollOptionsError}
                </small>
              )}

              <button
                type="button"
                className="btn btn-outline-secondary mt-2"
                onClick={addOption}
                disabled={pollOptions.length >= 10}
              >
                <FaPlus className="me-2" /> Adicionar Opção
              </button>
            </div>
          )}
          
          {/* UPLOAD DE IMAGEM (Comum a ambos, mas opcional para Enquete) */}
          <div className="form-group mb-4">
            <label htmlFor="image">
              Imagem de Destaque
              {postType === 'standard' ? ' do Artigo' : ' da Enquete'}
              (Opcional)
            </label>
            <input
              type="file"
              id="image"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Pré-visualização"
                className="mt-2 img-thumbnail"
                style={{ maxHeight: '200px' }}
              />
            )}
          </div>

          {/* BOTÕES DE AÇÃO */}
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  Enviando...
                </>
              ) : (
                <>
                  <FaPaperPlane className="me-2" /> Publicar{' '}
                  {postType === 'poll' ? 'Enquete' : 'Artigo'}
                </>
              )}
            </button>
          </div>
        </form>
      </section>
    </Container>
  );
}
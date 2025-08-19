import Container from "../../../components/Container/Container.components";
import { useEffect, useState } from "react";
import CategoriesService from "../../../services/categories-service";
import CategoryList from "../../../components/CategoryList/CategoryList";
import type { ICategory } from "../../../interfaces/category";

const categoryService = new CategoriesService();

const ICONS_MAP: Record<string, string> = {
  tecnologia: "bi-cpu",
  negocios: "bi-briefcase",
  design: "bi-palette",
  mobile: "bi-phone",
  ia: "bi-robot",
  carreira: "bi-person-badge",
};


function CategoryPage() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await categoryService.getAll(1, 100);
        const data = Array.isArray(result.data) ? result.data : result || [];
        setCategories(data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return <Container><p className="text-center py-5">Carregando categorias...</p></Container>;
  if (categories.length === 0) return <Container><p className="text-center py-5">Nenhuma categoria disponível no momento.</p></Container>;

  return (
    <Container>
      <section className="categorias-page pt-5">
        <header className="text-center mb-5 fade-in">
          <h1 className="display-5 fw-bold">Categorias</h1>
          <p className="lead text-secondary">Navegue pelos temas mais relevantes do blog.</p>
        </header>

        <CategoryList categories={categories} iconsMap={ICONS_MAP} />
      </section>
    </Container>
  );
}

export default CategoryPage;

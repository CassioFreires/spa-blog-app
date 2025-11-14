// components/PosterFilter/PosterFilter.tsx
import type { FC } from "react";
import './PosterFilter.css'

interface PostFiltersProps {
    search: string;
    setSearch: (value: string) => void;
    selectedCategory: string;
    setSelectedCategory: (value: string) => void;
    sortBy: string;
    setSortBy: (value: string) => void;
    showAdvancedFilters: boolean; // Mantemos o estado, mas mudamos o uso
    setShowAdvancedFilters: (value: boolean) => void;
    applyFilters: () => void;
    handleSearchChange: (value: string) => void;
}

const CATEGORIES = [
    { value: "", label: "Todas" },
    { value: "tecnologia", label: "Tecnologia" },
    { value: "desenvolvimento", label: "Desenvolvimento" },
    { value: "inovacao", label: "Inovação" },
    { value: "negocios", label: "Negócios" },
];

const SORT_OPTIONS = [
    { value: "newest", label: "Mais Recentes" },
    { value: "likes", label: "Mais Curtidos" },
    { value: "oldest", label: "Mais Antigos" },
];

const PostFilters: FC<PostFiltersProps> = ({
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    applyFilters,
    handleSearchChange,
}) => {
    // A função applyFilters será chamada automaticamente após a seleção da categoria ou ordenação

    return (
        <div className="filters-container mb-5">
            {/* 1. BARRA DE BUSCA CENTRALIZADA (Instagram/Facebook) */}
            <div className="search-bar-wrapper mb-4">
                <div className="input-group">
                    <span className="input-group-text search-icon">
                        <i className="bi bi-search"></i>
                    </span>
                    <input
                        type="search"
                        value={search}
                        placeholder="Pesquisar por títulos ou tags..."
                        className="form-control filter-search-input"
                        onChange={(e) => {
                            setSearch(e.target.value);
                            handleSearchChange(e.target.value);
                        }}
                    />
                </div>
            </div>

            {/* 2. FILTROS RÁPIDOS (Categoria e Ordenação lado a lado) */}
            <div className="d-flex flex-wrap justify-content-center justify-content-md-start gap-4">
                
                {/* Filtro de CATEGORIA (Chips/Botões) */}
                <div className="filter-group">
                    <label className="filter-label d-none d-md-block">Categorias:</label>
                    <div className="d-flex flex-wrap gap-2 category-chips">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.value}
                                className={`btn btn-sm filter-chip ${selectedCategory === cat.value ? 'active' : ''}`}
                                onClick={() => {
                                    setSelectedCategory(cat.value);
                                    applyFilters();
                                }}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Ordenação (Select Estilizado ou Abas) */}
                <div className="filter-group sort-group">
                    <label htmlFor="sortSelect" className="filter-label d-none d-md-block">Ordenar por:</label>
                    <select
                        id="sortSelect"
                        className="form-select filter-select"
                        value={sortBy}
                        onChange={(e) => {
                            setSortBy(e.target.value);
                            applyFilters();
                        }}
                    >
                        {SORT_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default PostFilters;
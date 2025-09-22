import type { FC } from "react";

interface PostFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  showAdvancedFilters: boolean;
  setShowAdvancedFilters: (value: boolean) => void;
  applyFilters: () => void;
  handleSearchChange: (value: string) => void;
}

const PostFilters: FC<PostFiltersProps> = ({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  showAdvancedFilters,
  setShowAdvancedFilters,
  applyFilters,
  handleSearchChange,
}) => {
  return (
    <>
      {/* Barra de busca + botão de toggle */}
      <div className="d-flex align-items-center gap-2 mb-4">
        <div className="input-group">
          <input
            type="search"
            value={search}
            placeholder="Buscar postagens..."
            className="form-control form-control-lg"
            onChange={(e) => {
              setSearch(e.target.value);
              handleSearchChange(e.target.value);
            }}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            title="Filtro avançado"
          >
            <i className={`bi bi-${showAdvancedFilters ? 'x-lg' : 'sliders'}`}></i>
          </button>
        </div>
      </div>

      {/* Painel de Filtro Avançado */}
      <div className={`advanced-filters-panel ${showAdvancedFilters ? 'show' : ''} mb-4`}>
        <div className="p-4 rounded-3 shadow-sm bg-light">
          <h5 className="mb-3 text-secondary">Filtros Adicionais</h5>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="categorySelect" className="form-label fw-bold text-muted">
                Categoria
              </label>
              <select
                id="categorySelect"
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Todas</option>
                <option value="tecnologia">Tecnologia</option>
                <option value="desenvolvimento">Desenvolvimento</option>
                <option value="inovacao">Inovação</option>
                <option value="negocios">Negócios</option>
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="sortSelect" className="form-label fw-bold text-muted">
                Ordenar por
              </label>
              <select
                id="sortSelect"
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Mais Recentes</option>
                <option value="oldest">Mais Antigos</option>
                <option value="likes">Mais Curtidos</option>
              </select>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-4">
            <button className="btn btn-primary rounded-pill px-4" onClick={applyFilters}>
              Aplicar Filtros
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostFilters;

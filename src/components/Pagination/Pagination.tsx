import type { IPaginationProps } from "../../interfaces/paginationProps";

export default function Pagination({ currentPage, totalPages, onPageChange }: IPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="d-flex justify-content-center align-items-center mt-5 flex-wrap gap-2 mb-4">
      <button
        className="btn btn-outline-secondary"
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        Anterior
      </button>

      {pages.map(page => (
        <button
          key={page}
          className={`btn ${page === currentPage ? 'btn-primary' : 'btn-outline-primary'} mx-1`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="btn btn-outline-secondary"
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Próxima
      </button>
    </div>
  );
}

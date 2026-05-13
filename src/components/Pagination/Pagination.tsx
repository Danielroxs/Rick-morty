type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function getVisiblePages(currentPage: number, totalPages: number) {
  const pages = new Set<number>();

  pages.add(1);
  pages.add(totalPages);
  pages.add(currentPage);

  if (currentPage > 1) {
    pages.add(currentPage - 1);
  }

  if (currentPage < totalPages) {
    pages.add(currentPage + 1);
  }

  return Array.from(pages).sort((a, b) => a - b);
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const visiblePages = getVisiblePages(currentPage, totalPages);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="pagination" aria-label="Paginación">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        {'<'}
      </button>

      {visiblePages.map((page, index) => {
        const previousPage = visiblePages[index - 1];
        const shouldShowDots = previousPage && page - previousPage > 1;

        return (
          <span key={page} className="pagination__item">
            {shouldShowDots && <span className="pagination__dots">...</span>}

            <button
              type="button"
              className={page === currentPage ? 'is-active' : ''}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </span>
        );
      })}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        {'>'}
      </button>
    </nav>
  );
}
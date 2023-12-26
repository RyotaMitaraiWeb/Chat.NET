import { usePagination } from '@/app/hooks/usePagination/usePagination';
import { PaginationProps } from './types';
import './Pagination.scss';

function Pagination(props: PaginationProps): React.JSX.Element {
  const {
    className = '',
    page,
    onChangePage,
    pageSize,
    showNext,
    showPrev,
    totalItems,
    ...others
  } = props;
  const pagination = usePagination(totalItems, pageSize, page);

  function handleChangePage(value: number) {
    if (page === undefined) {
      pagination.setPage(value);
    } else {
      if (onChangePage) {
        onChangePage(value);
      }
    }
  }
  return (
    <div className={`component-pagination ${className}`} {...others}>
      <button
        onClick={() => handleChangePage(pagination.page - 1)}
        className={`previous-page-button ${showPrev ? 'visible' : 'invisible'}`}
      >
        Previous page
      </button>
      {pagination.pages.map((p) => (
        <button
          key={p.page}
          className={`component-page-item ${p.isSelected ? 'selected' : ''}`}
          onClick={() => handleChangePage(p.page)}
        >
          {p.page}
        </button>
      ))}
      <button
        onClick={() => handleChangePage(pagination.page + 1)}
        className={`next-page-button ${showNext ? 'visible' : 'invisible'}`}
      >
        Next page
      </button>
    </div>
  );
}

export default Pagination;

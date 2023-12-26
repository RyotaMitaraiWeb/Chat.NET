import { usePagination } from '@/app/hooks/usePagination/usePagination';
import { PaginationProps } from './types';
import './Pagination.scss';

function Pagination(props: PaginationProps): React.JSX.Element {
  const { className = '', page, onChangePage, pageSize, totalItems, ...others } = props;
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
      {pagination.pages.map((p) => (
        <button
          key={p.page}
          className={`component-page-item ${p.isSelected ? 'selected' : ''}`}
          onClick={() => handleChangePage(p.page)}
        >
          {p.page}
        </button>
      ))}
    </div>
  );
}

export default Pagination;

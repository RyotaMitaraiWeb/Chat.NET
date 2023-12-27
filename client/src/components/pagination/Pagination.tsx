import { usePagination } from '@/app/hooks/usePagination/usePagination';
import { PaginationProps } from './types';
import './Pagination.scss';
import { useEffect } from 'react';
import BaseButton from '../internal/baseButton/BaseButton';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import Icon from '../icon/Icon';
function Pagination(props: PaginationProps): React.JSX.Element {
  const {
    className = '',
    page,
    onChangePage,
    pageSize,
    showNext,
    showPrev,
    totalItems,
    disabled,
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

  useEffect(() => {
    if (page && onChangePage) {
      pagination.setPage(page);
    }
  }, [page, onChangePage, pagination]);

  return (
    <div className={`component-pagination ${className}`} {...others}>
      <BaseButton
        disabled={disabled || pagination.page === 1}
        aria-label="Go to previous page"
        onClick={() => handleChangePage(pagination.page - 1)}
        className={`component-page-item previous-page-button ${showPrev ? 'visible' : 'invisible'}`}
      >
        <Icon>
          <MdKeyboardArrowLeft />
        </Icon>
      </BaseButton>
      <div className="pages">
        {pagination.pages.map((p) => (
          <BaseButton
            key={p.page}
            disabled={disabled}
            className={`component-page-item ${p.isSelected ? 'selected' : ''}`}
            onClick={() => handleChangePage(p.page)}
          >
            {p.page}
          </BaseButton>
        ))}
      </div>
      <BaseButton
        onClick={() => handleChangePage(pagination.page + 1)}
        aria-label="Go to next page"
        disabled={disabled || pagination.page === pagination.pages.length}
        className={`component-page-item next-page-button ${showNext ? 'visible' : 'invisible'}`}
      >
        <Icon>
          <MdKeyboardArrowRight />
        </Icon>
      </BaseButton>
    </div>
  );
}

export default Pagination;

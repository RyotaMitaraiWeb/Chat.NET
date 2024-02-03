import { usePagination } from '@/hooks/usePagination/usePagination';
import { PaginationProps } from './types';
import './Pagination.scss';
import { useEffect } from 'react';
import BaseButton from '../internal/baseButton/BaseButton';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import Icon from '../icon/Icon';
import React from 'react';
import PaginationItem from '../internal/paginationItem/PaginationItem';

/**
 * A component that renders page buttons per the specified requirements.
 * Can be turned into a controlled one by passing ``page`` and ``onChangePage``
 * props.
 *
 * All pages are rendered as buttons by default. The ``renderItem`` prop
 * can be used to configure how the page buttons are rendered. The custom
 * "buttons" are implemented as closely to native buttons as possible
 * (they have styling for a disabled button, have a tab index of -1
 * when disabled, and do not trigger click handlers).
 */
function Pagination(props: PaginationProps): React.JSX.Element {
  const {
    className = '',
    page,
    onChangePage,
    showNext,
    showPrev,
    count,
    disabled,
    renderItem,
    ...others
  } = props;
  const pagination = usePagination(count || 1, page);

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
        {pagination.pages.map((p) => {
          const component = renderItem ? renderItem(p.page) : undefined;
          return (
            <PaginationItem
              component={component}
              page={p.page}
              onClick={handleChangePage}
              isSelected={p.isSelected}
              key={p.page}
              disabled={disabled}
            />
          );
        })}
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

import { usePagination } from '@/app/hooks/usePagination/usePagination';
import { PaginationProps } from './types';
import './Pagination.scss';
import { useEffect } from 'react';
import BaseButton from '../internal/baseButton/BaseButton';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import Icon from '../icon/Icon';

/**
 * A component that renders page buttons per the specified requirements.
 * Can be turned into a controlled one by passing ``page`` and ``onChangePage``
 * props. You can also pass an array of URLs which will turn the page buttons
 * into hyperlinks.
 *
 * When using URLs, you need to pass a state to ``page``, which will typically
 * be the current ``page`` query string (or whatever parameter you are using),
 * as the component will not be able to update the selected page otherwise.
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
    urls,
    ...others
  } = props;
  const pagination = usePagination(count, page);

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
    if (page && (onChangePage || urls)) {
      pagination.setPage(page);
    }
  }, [page, urls, onChangePage, pagination]);

  return (
    <div className={`component-pagination ${className}`} {...others}>
      <BaseButton
        disabled={disabled || pagination.page === 1}
        aria-label="Go to previous page"
        onClick={() => handleChangePage(pagination.page - 1)}
        className={`component-page-item previous-page-button ${showPrev ? 'visible' : 'invisible'}`}
        href={urls ? urls[pagination.page - 2] : undefined}
      >
        <Icon>
          <MdKeyboardArrowLeft />
        </Icon>
      </BaseButton>
      <div className="pages">
        {pagination.pages.map((p) => (
          <BaseButton
            key={p.page}
            data-page={p.page}
            disabled={disabled}
            className={`component-page-item ${p.isSelected ? 'selected' : ''}`}
            onClick={() => handleChangePage(p.page)}
            href={urls ? urls[p.page - 1] : undefined}
            aria-label={`Go to page ${p.page}`}
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
        href={urls ? urls[pagination.page] : undefined}
      >
        <Icon>
          <MdKeyboardArrowRight />
        </Icon>
      </BaseButton>
    </div>
  );
}

export default Pagination;

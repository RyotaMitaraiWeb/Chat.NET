import { usePagination } from '@/hooks/usePagination/usePagination';
import { PaginationProps } from './types';
import './Pagination.scss';
import { cloneElement, useEffect } from 'react';
import BaseButton from '../internal/baseButton/BaseButton';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import Icon from '../icon/Icon';
import React from 'react';

/**
 * A component that renders page buttons per the specified requirements.
 * Can be turned into a controlled one by passing ``page`` and ``onChangePage``
 * props. You can also pass an array of URLs which will turn the page buttons
 * into hyperlinks.
 *
 * All pages are rendered as buttons by default. The ``renderItem`` prop
 * can be used to configure how the page buttons are rendered.
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
          if (renderItem) {
            const Page = renderItem(p.page);
            const PureElement = cloneElement(Page);
            const CustomPageButton = cloneElement(PureElement, {
              className: `${PureElement.props.className} component-page-item ${
                p.isSelected ? 'selected' : ''
              }`,
              'data-page': p.page,
              onClick: () => handleChangePage(p.page),
              key: p.page,
              'aria-label': `Go to page ${p.page}`,
              disabled,
            });

            return CustomPageButton;
          }
          return (
            <BaseButton
              key={p.page}
              data-page={p.page}
              disabled={disabled}
              className={`component-page-item ${p.isSelected ? 'selected' : ''}`}
              onClick={() => handleChangePage(p.page)}
              aria-label={`Go to page ${p.page}`}
            >
              {p.page}
            </BaseButton>
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

import { useMemo, useState } from 'react';

type Page = {
  page: number;
  isSelected: boolean;
};

export const usePagination = (totalItems: number, pageSize = 5, startingPage: number = 1) => {
  const [page, setPage] = useState(startingPage || 1);
  const [pages, setPages] = useState([] as Page[]);
  const count = Math.ceil(totalItems / pageSize);

  useMemo(() => {
    const pages: Page[] = [];
    for (let i = 1; i <= count; i++) {
      pages.push({
        page: i,
        isSelected: i === page,
      });
    }

    setPages(pages);
  }, [page, count]);

  return { pages, page, setPage };
};

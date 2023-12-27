import { useMemo, useState } from 'react';

type Page = {
  page: number;
  isSelected: boolean;
};

export const usePagination = (count: number, startingPage: number = 1) => {
  const [page, setStatePage] = useState(startingPage || 1);
  const [pages, setPages] = useState([] as Page[]);

  function setPage(value: number) {
    if (value >= 1 && value <= count) {
      setStatePage(value);
    }
  }
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

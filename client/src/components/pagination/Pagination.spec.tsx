import { act, render, screen } from '@testing-library/react';
import Pagination from './Pagination';
import { useState } from 'react';

describe('Pagination component', () => {
  describe('General', () => {
    it('Page updates successfully', async () => {
      render(<Pagination count={9} showPrev />);
      const page1 = await screen.findByLabelText(/Go to page 1/im);
      expect(page1.classList.contains('selected')).toBe(true);

      const page2 = await screen.findByLabelText(/Go to page 2/im);
      act(() => page2.click());
      expect(page2.classList.contains('selected')).toBe(true);
      expect(page1.classList.contains('selected')).toBe(false);

      const page7 = await screen.findByLabelText(/Go to page 7/im);
      act(() => page7.click());
      expect(page7.classList.contains('selected')).toBe(true);
      expect(page2.classList.contains('selected')).toBe(false);
    });

    it('Works as a controlled component', async () => {
      function ControlledPagination() {
        const [state, setState] = useState(1);
        return <Pagination count={9} showPrev page={state} onChangePage={setState} />;
      }

      render(<ControlledPagination />);

      const page2 = await screen.findByLabelText(/Go to page 2/im);
      const page1 = await screen.findByLabelText(/Go to page 1/im);
      act(() => page2.click());

      expect(page2.classList.contains('selected')).toBe(true);

      const prev = await screen.findByLabelText(/Go to previous page/im);
      act(() => prev.click());
      expect(page1.classList.contains('selected')).toBe(true);
    });
  });

  describe('Next and previous buttons', () => {
    it('Shows next button', () => {
      render(<Pagination count={2} showNext />);

      const next = document.querySelectorAll('.visible');
      expect(next).toHaveLength(1);
    });

    it('Shows previous button', () => {
      render(<Pagination count={2} showPrev />);

      const next = document.querySelectorAll('.visible');
      expect(next).toHaveLength(1);
    });

    it('Disables next button if at last page', () => {
      render(<Pagination count={2} showNext page={2} />);
      const next = document.querySelector('.visible');
      expect(next).toBeDisabled();
    });

    it('Disables prev button if at page 1', () => {
      render(<Pagination count={2} showPrev page={1} />);
      const prev = document.querySelector('.visible');
      expect(prev).toBeDisabled();
    });

    it('Previous and next buttons work', async () => {
      render(<Pagination count={11} showPrev />);
      const prev = await screen.findByLabelText(/Go to previous page/im);
      const next = await screen.findByLabelText(/Go to next page/im);
      act(() => next.click());
      act(() => next.click());

      const selected = document.querySelector('.selected');
      expect(selected?.textContent).toBe('3');

      act(() => prev.click());

      const selected2 = document.querySelector('.selected');
      expect(selected2?.textContent).toBe('2');
    });
  });

  it('Generates correct amount of pages and hides arrow buttons by default', () => {
    render(<Pagination count={2} />);
    const pages = document.querySelectorAll('button[data-page]');
    expect(pages.length).toBe(2);

    const nextAndPrev = document.querySelector('.visible');
    expect(nextAndPrev).toBeNull();
  });

  describe('renderItem', () => {
    it('Renders custom button elements', () => {
      render(
        <Pagination count={9} renderItem={(p) => <strong className="custom-page">{p}</strong>} />,
      );

      const pages = document.querySelectorAll('strong.custom-page');
      expect(pages).toHaveLength(9);
    });

    it('Click functionality works', () => {
      render(
        <Pagination count={9} renderItem={(p) => <strong className="custom-page">{p}</strong>} />,
      );

      const pages = document.querySelectorAll('strong.custom-page');

      const page3 = pages[2] as HTMLButtonElement;
      act(() => page3.click());
      expect(page3.classList.contains('selected')).toBe(true);
    });

    it('Does not override any class names provided by the parent', () => {
      render(
        <Pagination count={9} renderItem={(p) => <strong className="custom-page">{p}</strong>} />,
      );

      const pages = document.querySelectorAll('strong.custom-page');
      const page3 = pages[2] as HTMLButtonElement;

      expect(page3.classList.contains('component-page-item')).toBe(true);
      expect(page3.classList.contains('custom-page')).toBe(true);
    });

    it(`Does not change page if disabled and the 
    rendered element is not a disableable element`, () => {
      render(
        <Pagination
          disabled
          count={9}
          renderItem={(p) => <strong className="custom-page">{p}</strong>}
        />,
      );

      const pages = document.querySelectorAll('strong.custom-page');
      const page3 = pages[2] as HTMLButtonElement;
      act(() => page3.click());

      expect(page3.classList.contains('selected')).toBe(false);
    });
  });
});

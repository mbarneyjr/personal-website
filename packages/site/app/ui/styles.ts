import { css } from 'remix/component';

export const mainContent = css({
  maxWidth: '1024px',
  margin: 'auto',
});

export const card = css({
  padding: '1rem',
  backgroundColor: 'var(--dim-color)',
  boxShadow: [
    'rgba(0, 0, 0, 0.25) 0px 54px 55px',
    'rgba(0, 0, 0, 0.12) 0px -12px 30px',
    'rgba(0, 0, 0, 0.12) 0px 4px 6px',
    'rgba(0, 0, 0, 0.17) 0px 12px 13px',
    'rgba(0, 0, 0, 0.09) 0px -3px 5px',
  ].join(', '),
  '@media print': { boxShadow: 'none' },
});

export const sectionHeader = css({
  textAlign: 'center',
  fontFamily: 'Acme, sans-serif',
});

export const title = css({
  fontFamily: 'Acme, sans-serif',
  fontSize: '2rem',
  textAlign: 'center',
  margin: 0,
});

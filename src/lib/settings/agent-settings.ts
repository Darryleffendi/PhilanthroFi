export const host =
  process.env.DFX_NETWORK === 'local'
    ? 'http://localhost:3000'
    : 'https://ic0.app';

export const fetchOptions = {
  headers: {
    'X-Custom-Header': 'value',
  },
};

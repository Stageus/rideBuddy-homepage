import { atom } from 'recoil';

export const selectedDataState = atom({
  key: 'selectedDataState',
  default: [],
});

export const markerSourceState = atom({
  key: 'markerSourceState',
  default: '',
});

export const selectedSearchState = atom({
  key: 'selectedSearchState',
  default: null,
});

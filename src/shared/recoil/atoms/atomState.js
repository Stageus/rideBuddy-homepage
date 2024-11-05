import { atom } from 'recoil';

export const selectedDataState = atom({
  key: 'selectedDataState',
  default: [],
});

export const markerSourceState = atom({
  key: 'markerSourceState',
  default: '',
});

export const selectedDetailState = atom({
  key: 'selectedDetailState',
  default: null,
});

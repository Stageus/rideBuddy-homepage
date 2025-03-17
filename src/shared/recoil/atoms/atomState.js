// shared/recoil/atoms/atomState.js
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
  default: {},
});

export const centersState = atom({
  key: 'centersState',
  default: [],
});

export const roadsState = atom({
  key: 'roadsState',
  default: [],
});

export const selectedResultState = atom({
  key: 'selectedResultState',
  default: null,
});

export const currentMarkerState = atom({
  key: 'currentMarkerState',
  default: null,
});

export const searchResultsState = atom({
  key: 'searchResultsState',
  default: [],
});

export const searchQueryState = atom({
  key: 'searchQueryState',
  default: [],
});

export const selectedItemState = atom({
  key: 'selectedItemState',
  default: null,
});


export const likeCount = atom({
  key: 'likeCount',
  default: null,
});
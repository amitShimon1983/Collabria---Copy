export type Item = {
  name?: string;
  address: string;
};

export interface Terms {
  freeText?: string;
  from?: string;
  to?: string;
  subject?: string;
  [key: string]: any;
}

export type SearchInfo = {
  searchString: string;
  terms: Terms;
};

export type AsyncSearch = {
  loading: boolean;
  error?: Error;
  data: Item[];
};

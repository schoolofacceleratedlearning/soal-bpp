import { components } from '../../types/schema';

export interface SearchDTO {
  context: components['schemas']['Context'];
  message: { intent: components['schemas']['Intent'] };
}

export interface OnSearchDTO {
  context: components['schemas']['Context'];
  message?: {
    catalog: components['schemas']['Catalog'];
  };
  error?: components['schemas']['Error'];
}

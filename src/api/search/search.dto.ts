import { components } from '../../types/schema';

export interface SearchDTO {
  context: components['schemas']['Context'];
  message: { intent: components['schemas']['Intent'] };
}

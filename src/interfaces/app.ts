import { Location } from './location';
import { Rate } from './rate';
import { Error } from './error';

export interface App {
  stepName: string;
  stepNumber: number;
  origin: Location;
  destination: Location;
  packageCount: number;
  rate: Rate;
  errors: Error[];
}

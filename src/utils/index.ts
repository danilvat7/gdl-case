/**
 * Helper methods
 */
import { DataLayerState } from './../interfaces';
import { EventData } from './../actions';

/**
 * Modifies published event data to the storage form data
 */
export const modifyPublishedEventDataForStore = ({
  name,
  payload,
}: EventData): { [key: string]: any } => {
  if (name === 'viewStep' || name === 'packagesComplete') return payload;
  if (name === 'originComplete') return { origin: payload };
  if (name === 'destinationComplete') return { destination: payload };
  if (name === 'viewRate') return { rate: payload };
};

/**
 * Generates dimensions object from the storage data
 */
export const generateDimensionsObj = (
  tracker: 'trackPage' | 'trackEvent' | 'trackConversion',
  dataLayerState: DataLayerState
): { [key: string]: any } => {
  const { page, app } = dataLayerState;
  const { pageId, countryCode, languageCode } = page;

  // Dimensions for trackPage event
  if (tracker === 'trackPage') {
    return {
      dimension01: pageId,
      dimension02: countryCode,
      dimension03: languageCode,
    };
  }

  // Dimensions for all events
  const {
    stepName,
    stepNumber,
    origin,
    destination,
    packageCount,
    rate,
    errors,
  } = app || {};
  return {
    dimension01: pageId,
    dimension02: countryCode,
    dimension03: languageCode,
    dimension04: stepName,
    dimension05: stepNumber,
    dimension06: stringifyObject(origin) || '',
    dimension07: stringifyObject(destination) || '',
    dimension08: packageCount || '',
    dimension09: rate?.currency || '',
    dimension10: errors?.map(stringifyObject).join(',') || '',
  };
};

/**
 * Stringifies object to the dimension value type
 */
const stringifyObject = (obj: object = {}): string => {
  return Object.values(obj).reduce((acc, val, i, arr) => {
    return (acc += `<${val}>${i !== arr.length - 1 ? '_' : ''}`);
  }, '');
};

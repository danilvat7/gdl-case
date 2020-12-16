import { Dispatch } from 'redux';
import { publishEvent, EventName } from './actions';

/**
 * Creates event publisher for using publishEvent action outside the library
 */
export const createEventPublisher = (dispatch: Dispatch) => (
  name: EventName,
  payload: any
) => {
  dispatch(publishEvent({ name, payload }));
};

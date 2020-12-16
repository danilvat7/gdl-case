/**
 * Logs middleware
 * Dispatches information about each published event to logs storage
 * Prints events to the browser console
 */
import { Middleware } from 'redux';
import { addLogToHistory, PublishEvent, PUBLISH_EVENT } from '../actions';
import { RootState } from '../interfaces/root-state';

export const loggerMiddleware: Middleware<{}, RootState> = (store) => (
  next
) => (action: PublishEvent) => {
  const returnValue = next(action);
  if (action.type === PUBLISH_EVENT && action.data) {
    const {
      data: { name: eventName, payload },
    } = action;
    const date = new Date().toLocaleString();
    store.dispatch(addLogToHistory({ date, eventName, payload }));
    console.log(`[${date}]:: ${eventName} event was handled`);
    console.log(`[Payload Data]:: `, JSON.stringify(payload));
    console.log('==================================================');
  }
  return returnValue;
};

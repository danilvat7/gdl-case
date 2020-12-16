/**
 * Actions tests
 */
import {
  PUBLISH_EVENT,
  publishEvent,
  EventData,
  addLogToHistory,
  ADD_LOG_TO_HISTORY,
} from './../actions';
import { HistoryItem } from '../interfaces';

describe('actions', () => {
  it('should create an action to publish event', () => {
    const data: EventData = { name: 'pageInfo', payload: 'test' };
    const expectedAction = {
      type: PUBLISH_EVENT,
      data,
    };
    expect(publishEvent(data)).toEqual(expectedAction);
  });

  it('should create an action to add log to history', () => {
    const payload: HistoryItem = {
      date: new Date().toLocaleString(),
      eventName: 'pageInfo',
      payload: 'test',
    };
    const expectedAction = {
      type: ADD_LOG_TO_HISTORY,
      payload,
    };
    expect(addLogToHistory(payload)).toEqual(expectedAction);
  });
});

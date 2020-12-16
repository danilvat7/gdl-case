/**
 * Actions
 */
import { HistoryItem } from '../interfaces';

/**
 * publishEvent action
 */
export const PUBLISH_EVENT = 'PUBLISH_EVENT';
export type EventName =
  | 'pageInfo'
  | 'viewStep'
  | 'originComplete'
  | 'destinationComplete'
  | 'packagesComplete'
  | 'viewRate'
  | 'shipmentComplete'
  | 'shipAgain'
  | 'error';
export type EventData = { name: EventName; payload: any };

export interface PublishEvent {
  type: typeof PUBLISH_EVENT;
  data: EventData;
}

export const publishEvent = (data: EventData): PublishEvent => {
  return {
    type: PUBLISH_EVENT,
    data,
  };
};

/**
 * addLogToHistory action
 */
export const ADD_LOG_TO_HISTORY = 'ADD_LOG_TO_HISTORY';

export interface AddLogToHistory {
  type: typeof ADD_LOG_TO_HISTORY;
  payload: HistoryItem;
}

export const addLogToHistory = (payload: HistoryItem): AddLogToHistory => {
  return {
    type: ADD_LOG_TO_HISTORY,
    payload,
  };
};

export type ActionTypes = PublishEvent | AddLogToHistory;

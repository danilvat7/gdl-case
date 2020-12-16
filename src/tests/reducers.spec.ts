/**
 * Reducers tests
 */
import { dataLayerReducer, logsReducer } from './../reducers';
import { ActionTypes, EventData, ADD_LOG_TO_HISTORY } from './../actions';
import { PUBLISH_EVENT } from '../actions/index';
import { HistoryItem } from '../interfaces/history-item';

describe('dataLayer reducer', () => {
  it('should return the initial state', () => {
    expect(dataLayerReducer(undefined, {} as ActionTypes)).toEqual({
      page: null,
      app: null,
    });
  });

  it('should handle PUBLISH_EVENT', () => {
    const pageInfoEventData: EventData = {
      name: 'pageInfo',
      payload: { pageId: 'GB|en|apps|simple-shipping' },
    };
    expect(
      dataLayerReducer(undefined, {
        type: PUBLISH_EVENT,
        data: pageInfoEventData,
      })
    ).toEqual({
      app: null,
      page: {
        pageId: 'GB|en|apps|simple-shipping',
        countryCode: 'GB',
        languageCode: 'en',
        pageName: 'apps|simple-shipping',
      },
    });

    const originCompleteEventData: EventData = {
      name: 'originComplete',
      payload: { country: 'BR', city: 'São Paulo' },
    };
    expect(
      dataLayerReducer(undefined, {
        type: PUBLISH_EVENT,
        data: originCompleteEventData,
      })
    ).toEqual({
      app: { origin: { city: 'São Paulo', country: 'BR' } },
      page: null,
    });

    const errorEventData: EventData = {
      name: 'error',
      payload: { id: 1, message: 'Error' },
    };

    expect(
      dataLayerReducer(undefined, {
        type: PUBLISH_EVENT,
        data: errorEventData,
      })
    ).toEqual({
      app: { errors: [errorEventData.payload] },
      page: null,
    });
  });
});

describe('logs reducer', () => {
  it('should return the initial state', () => {
    expect(logsReducer(undefined, {} as ActionTypes)).toEqual({
      history: null,
    });
  });
  it('should handle ADD_LOG_TO_HISTORY', () => {
    const payload: HistoryItem = {
      date: new Date().toLocaleString(),
      eventName: 'pageInfo',
      payload: 'test',
    };
    expect(
      logsReducer(undefined, {
        type: ADD_LOG_TO_HISTORY,
        payload,
      })
    ).toEqual({
      history: {
        [payload.date]: payload,
      },
    });
  });
});

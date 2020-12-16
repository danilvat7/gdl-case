/**
 * Middlewares tests
 */
// Mocks analytics methods
const analyticsMock = {
  trackPage: jest.fn(),
  trackConversion: jest.fn(),
  trackEvent: jest.fn(),
};
(global.window as any).analytics = analyticsMock;

import { loggerMiddleware } from '../middlewares/logger';
import { trackerMiddleware } from '../middlewares/tracker';
import { PUBLISH_EVENT, addLogToHistory } from '../actions';

// Mocks store
const create = (middleware: (store: any) => any) => {
  const store = {
    getState: jest.fn(() => ({
      dataLayer: {
        page: {
          pageId: 'GB|en|apps|simple-shipping',
          countryCode: 'GB',
          languageCode: 'en',
          pageName: 'apps|simple-shipping',
        },
        app: null,
      },
    })),
    dispatch: jest.fn(),
  };
  const next = jest.fn();

  const invoke = (action: any) => middleware(store)(next)(action);

  return { store, next, invoke };
};

describe('logger middleware', () => {
  it('should dispatch addLogToHistory action', () => {
    const { store, invoke } = create(loggerMiddleware);
    const data = { name: 'pageInfo', payload: 'test' };
    invoke({ type: PUBLISH_EVENT, data });
    expect(store.dispatch).toHaveBeenCalledWith(
      addLogToHistory({
        date: new Date().toLocaleString(),
        eventName: data.name,
        payload: data.payload,
      })
    );
  });
});

describe('trackerMiddleware middleware', () => {
  let invokeMiddleware: (action: any) => any;
  beforeEach(() => {
    invokeMiddleware = create(trackerMiddleware).invoke;
  });
  it('should call analytics.trackPage', () => {
    const data = { name: 'pageInfo', payload: 'test' };
    invokeMiddleware({ type: PUBLISH_EVENT, data });
    expect(analyticsMock.trackPage).toHaveBeenCalled();
  });

  it('should call analytics.trackConversion', () => {
    const data = { name: 'shipmentComplete', payload: 'test' };
    invokeMiddleware({ type: PUBLISH_EVENT, data });
    expect(analyticsMock.trackConversion).toHaveBeenCalled();
  });

  it('should call analytics.trackEvent', () => {
    const data = { name: 'viewStep', payload: 'test' };
    invokeMiddleware({ type: PUBLISH_EVENT, data });
    expect(analyticsMock.trackEvent).toHaveBeenCalled();
  });
});

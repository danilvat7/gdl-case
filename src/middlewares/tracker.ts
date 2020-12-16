/**
 * Tracker middleware
 * Calls analytic API methods for each published events
 */
import { Middleware } from 'redux';
import { PublishEvent, PUBLISH_EVENT } from './../actions';
import { generateDimensionsObj } from './../utils';
import { RootState } from '../interfaces/root-state';

const analytics = (window as any).analytics || {};

export const trackerMiddleware: Middleware<{}, RootState> = (store) => (
  next
) => (action: PublishEvent) => {
  const returnValue = next(action);

  if (action.type === PUBLISH_EVENT && action.data) {
    const {
      data: { name: eventName },
    } = action;
    const dataLayerState = store.getState().dataLayer;

    // Calls trackPage
    if (eventName === 'pageInfo') {
      analytics.trackPage(
        dataLayerState.page?.pageName,
        generateDimensionsObj('trackPage', dataLayerState)
      );
      // Calls trackConversion
    } else if (eventName === 'shipmentComplete') {
      analytics.trackConversion(
        dataLayerState.app?.rate?.amount,
        generateDimensionsObj('trackConversion', dataLayerState)
      );
      // Calls trackEvent
    } else {
      analytics.trackEvent(
        eventName,
        generateDimensionsObj('trackEvent', dataLayerState)
      );
    }
  }

  return returnValue;
};

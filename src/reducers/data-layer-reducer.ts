/**
 * Data layer reducer
 */
import { ActionTypes, PUBLISH_EVENT } from '../actions';
import { DataLayerState } from '../interfaces/data-layer-state';
import { modifyPublishedEventDataForStore } from '../utils';

const initialState: DataLayerState = {
  app: null,
  page: null,
};

export const dataLayerReducer = (
  state = initialState,
  action: ActionTypes
): DataLayerState => {
  switch (action.type) {
    case PUBLISH_EVENT:
      const { name, payload } = action.data || {};

      // Changes page state
      if (name === 'pageInfo') {
        const pageId = payload.pageId;
        const [countryCode, languageCode, ...pageNameArr] = pageId.split('|');
        return {
          ...state,
          page: {
            pageId,
            countryCode,
            languageCode,
            pageName: pageNameArr.join('|'),
          },
        };
      }

      // Changes errors state
      if (name === 'error') {
        return {
          ...state,
          app: {
            ...state.app,
            errors: [...(state.app?.errors || []), payload],
          },
        };
      }

      // Changes app state
      const appData = modifyPublishedEventDataForStore(action.data);
      if (appData) {
        return {
          ...state,
          app: {
            ...state.app,
            ...appData,
          },
        };
      }

    default:
      return state;
  }
};

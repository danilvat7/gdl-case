/**
 * Root module
 */
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { dataLayerReducer, logsReducer } from './reducers';
import { createEventPublisher } from './event-publisher';
import { middlewares } from './middlewares';
import { RootState } from './interfaces/root-state';

const composeEnhancers = composeWithDevTools({});

/**
 * Creates gdl instance
 */
const createGdl = () => {
  // Registers reducers
  const reducers = combineReducers<RootState>({
    dataLayer: dataLayerReducer,
    logs: logsReducer,
  });

  // Creates store
  const store = createStore(
    reducers,
    {},
    composeEnhancers(applyMiddleware(...middlewares))
  );

  // Public methods and properties
  return {
    publishEvent: createEventPublisher(store.dispatch),
    // DataLayer state
    get dataLayer() {
      return store.getState().dataLayer;
    },
    // Logs state
    get logs() {
      return store.getState().logs;
    },
  };
};

(window as any).gdl = createGdl();

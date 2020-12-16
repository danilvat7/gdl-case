/**
 * Logs reducer
 */
import { ActionTypes, ADD_LOG_TO_HISTORY } from '../actions';
import { LogsState } from '../interfaces';

const initialState: LogsState = {
  history: null,
};

export const logsReducer = (
  state = initialState,
  action: ActionTypes
): LogsState => {
  switch (action.type) {
    case ADD_LOG_TO_HISTORY:
      const payload = action.payload;
      return {
        ...state,
        history: { ...state.history, [payload.date]: payload },
      };
    default:
      return state;
  }
};

import { DataLayerState } from './data-layer-state';
import { LogsState } from './logs-state';

export interface RootState {
  dataLayer: DataLayerState;
  logs: LogsState;
}

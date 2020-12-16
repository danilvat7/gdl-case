import { HistoryItem } from './history-item';

export interface LogsState {
  history: { [key: string]: HistoryItem };
}

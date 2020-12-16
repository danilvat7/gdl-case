import { loggerMiddleware } from './logger';
import { trackerMiddleware } from './tracker';

export const middlewares = [trackerMiddleware, loggerMiddleware];

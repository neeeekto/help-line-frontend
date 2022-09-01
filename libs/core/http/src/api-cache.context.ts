import { createContext } from 'react';
import { ApiFactory } from './api.types';

// eslint-disable-next-line @typescript-eslint/ban-types
export type ApiCache = Map<ApiFactory, any>;
export const ApiCacheContext = createContext<ApiCache>(null!);

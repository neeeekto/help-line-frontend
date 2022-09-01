import { useContext } from 'react';
import { HttpContext } from './http.context';
import { ApiCacheContext } from './api-cache.context';
import { ApiFactory } from './api.types';

export const useHttpClient = () => useContext(HttpContext);

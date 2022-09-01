import { ApiFactory } from './api.types';
import { useContext } from 'react';
import { ApiCacheContext } from './api-cache.context';
import { useHttpClient } from './http.hooks';

export const useApiClient = <T>(apiFactory: ApiFactory<T>): T => {
  const http = useHttpClient();
  const apiCache = useContext(ApiCacheContext);
  if (typeof apiFactory !== 'function') {
    throw new Error('apiFactory must be function');
  }
  if (!http) {
    throw new Error('http context not found');
  }

  if (!apiCache) {
    throw new Error('apiCache context not found');
  }

  let api = apiCache.get(apiFactory);
  if (!api) {
    api = apiFactory(http);
    apiCache.set(apiFactory, api);
  }
  return api;
};

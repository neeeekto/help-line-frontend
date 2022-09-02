import React, { PropsWithChildren, useMemo, createElement } from 'react';
import { HttpClient } from './http.client';
import { AxiosHttpBackend } from './axios.http-backend';
import { HttpContext } from './index';
import { HttpInterceptor } from './http.types';
import { ApiCacheContext } from './api-cache.context';

interface HttpProviderProps extends PropsWithChildren {
  serverUrl?: string;
  interceptors: HttpInterceptor[];
}

export const HttpProvider: React.FC<HttpProviderProps> = React.memo((props) => {
  const httpClient = useMemo(
    () =>
      new HttpClient(
        new AxiosHttpBackend(props.serverUrl || ''),
        props.interceptors || []
      ),
    []
  );

  const apiCache = useMemo(() => new Map(), []);

  // Do not change, cypress dont know tsx files
  return createElement(HttpContext.Provider, {
    value: httpClient,
    children: createElement(ApiCacheContext.Provider, {
      value: apiCache,
      children: props.children,
    }),
  });
  /*return (
    <HttpContext.Provider value={httpClient}>
      <ApiCacheContext.Provider value={apiCache}>
        {props.children}
      </ApiCacheContext.Provider>
    </HttpContext.Provider>
  );*/
});

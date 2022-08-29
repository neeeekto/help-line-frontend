import React, { PropsWithChildren, useRef } from 'react';
import { HttpClient } from './http.client';
import { AxiosHttpBackend } from './axios.http-backend';
import { HttpContext } from './http.context';
import { HttpInterceptor } from './http.types';

export const HttpProvider: React.FC<
  PropsWithChildren<{ serverUrl?: string; interceptors: HttpInterceptor[] }>
> = React.memo((props) => {
  const httpClient = useRef(
    new HttpClient(
      new AxiosHttpBackend(props.serverUrl || ''),
      props.interceptors || []
    )
  );

  return (
    <HttpContext.Provider value={httpClient.current}>
      {props.children}
    </HttpContext.Provider>
  );
});

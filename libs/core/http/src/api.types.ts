import { HttpClient } from './http.client';

export type ApiFactory<T = any> = (http: HttpClient) => T;

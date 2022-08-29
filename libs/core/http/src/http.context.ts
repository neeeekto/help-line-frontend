import { createContext } from 'react';
import { HttpClient } from './http.client';

export const HttpContext = createContext<HttpClient>(null!);

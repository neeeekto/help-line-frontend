import { HttpClient } from './http.client';
import { renderHook, act } from '@testing-library/react-hooks';
import React, { PropsWithChildren, useMemo } from 'react';
import { HttpContext } from './http.context';
import { useApiClient } from './api.hooks';
import { ApiCacheContext } from './api-cache.context';

describe('api.hooks', () => {
  const http = new HttpClient({
    handle: jest.fn(),
  });
  const wrapper: React.FC<PropsWithChildren> = ({ children }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const apiCache = useMemo(() => new Map(), []);

    return (
      <HttpContext.Provider value={http}>
        <ApiCacheContext.Provider value={apiCache}>
          {children}
        </ApiCacheContext.Provider>
      </HttpContext.Provider>
    );
  };
  const apiFactory = jest
    .fn()
    .mockImplementation((http: HttpClient) => ({ get: () => http.get('') }));

  beforeEach(() => {
    apiFactory.mockClear();
  });

  it('should throw error if factory is not function', () => {
    const { result } = renderHook(() => useApiClient({} as any), { wrapper });

    expect(result.error).toBeTruthy();
  });

  it('should throw error if http context not defined', () => {
    const { result } = renderHook(() => useApiClient(apiFactory));

    expect(result.error).toBeTruthy();
  });

  it('should throw error if apiCache context not defined', () => {
    const { result } = renderHook(() => useApiClient(apiFactory), {
      wrapper: (({ children }) => (
        <HttpContext.Provider value={http}>{children}</HttpContext.Provider>
      )) as React.FC<PropsWithChildren>,
    });

    expect(result.error).toBeTruthy();
  });

  it('should create', () => {
    const { result } = renderHook(() => useApiClient(apiFactory), { wrapper });

    expect(result.current).toBeTruthy();
  });

  it('should call factory for first usage', () => {
    renderHook(() => useApiClient(apiFactory), { wrapper });
    expect(apiFactory).toBeCalled();
  });

  it('should pass http in argument', () => {
    renderHook(() => useApiClient(apiFactory), { wrapper });
    expect(apiFactory).toBeCalledWith(http);
  });

  it('should use cache if factory call some times', () => {
    const { rerender } = renderHook(() => useApiClient(apiFactory), {
      wrapper,
    });
    rerender();

    expect(apiFactory).toBeCalledTimes(1);
  });
});

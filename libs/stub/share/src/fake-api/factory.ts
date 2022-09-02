import { ApiFactory } from '@help-line/core/http';
import {
  DefaultBodyType,
  defaultContext,
  MockedRequest,
  ResponseResolver,
  rest,
  RestContext,
  RestHandler,
} from 'msw';

type FunctionType<TRes = any> = (...args: any[]) => Promise<TRes>;
type StubFactory<TRes = any> = (
  handler: ResponseResolver<MockedRequest, RestContext, TRes>
) => RestHandler<MockedRequest<DefaultBodyType>>;

type Setups<T extends Record<string, FunctionType>> = {
  [method in keyof T]: StubFactory<Awaited<ReturnType<T[method]>>>;
};

export const createGetStubFactory = <TResult>(url: string) => {
  return (handler: ResponseResolver<MockedRequest, RestContext, TResult>) => {
    return rest.get(url, handler);
  };
};

export const createPostStubFactory = <TResult>(url: string) => {
  return (handler: ResponseResolver<MockedRequest, RestContext, TResult>) => {
    return rest.post(url, handler);
  };
};

export const createPutStubFactory = <TResult>(url: string) => {
  return (handler: ResponseResolver<MockedRequest, RestContext, TResult>) => {
    return rest.put(url, handler);
  };
};

export const createPathStubFactory = <TResult>(url: string) => {
  return (handler: ResponseResolver<MockedRequest, RestContext, TResult>) => {
    return rest.patch(url, handler);
  };
};

export const createDeleteStubFactory = <TResult>(url: string) => {
  return (handler: ResponseResolver<MockedRequest, RestContext, TResult>) => {
    return rest.delete(url, handler);
  };
};

export const createFakeApi = <T extends Record<string, FunctionType>>(
  apiFatory: ApiFactory<T>,
  setups: Setups<T>
) => {
  return setups;
};

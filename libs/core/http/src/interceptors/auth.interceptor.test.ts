import { AuthInterceptor, AuthToken } from './auth.interceptor';
import { mock, instance, anything, when } from 'ts-mockito';
import { HttpHandler, HttpRequest } from '../http.types';

describe('AuthInterceptor', () => {
  const token: AuthToken = { type: 'test', value: '123' };
  const tokenGetter = jest.fn();
  const interceptor = new AuthInterceptor(tokenGetter);
  let nextMock: HttpHandler;

  beforeEach(() => {
    tokenGetter.mockClear();
    tokenGetter.mockReturnValue(token);
    nextMock = mock<HttpHandler>();
    when(nextMock.handle(anything())).thenResolve({} as any);
  });

  it('does nothing if there is no token', async () => {
    tokenGetter.mockClear().mockReturnValue(null);
    const req: HttpRequest = {};
    await interceptor.intercept(req, instance(nextMock));

    expect(req?.headers?.['Authorization']).toBeFalsy();
  });

  it('set token', async () => {
    const req: HttpRequest = {};
    await interceptor.intercept(req, instance(nextMock));

    expect(tokenGetter).toBeCalled();
    expect(req?.headers?.['Authorization']).toBeTruthy();
  });
});

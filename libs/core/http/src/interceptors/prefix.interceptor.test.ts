import { PrefixInterceptor } from './prefix.interceptor';
import { HttpRequest } from '@help-line/core/http';

describe('PrefixInterceptor', () => {
  const prefix = 'test';
  const serverUrl = 'http://localhost:123';
  const endpoint = 'stub/endpoint';

  it('should create', () => {
    expect(() => new PrefixInterceptor(prefix, serverUrl)).not.toThrow();
  });

  describe('should throw error if serverUrl is ', () => {
    it('empty', () => {
      expect(() => new PrefixInterceptor('', '')).toThrow();
    });

    it('invalid', () => {
      expect(() => new PrefixInterceptor('', 'test')).toThrow();
    });
  });

  it('should set correct path', async () => {
    const req: HttpRequest = { url: `/api/${endpoint}` };

    const interceptor = new PrefixInterceptor(prefix, serverUrl);
    await interceptor.intercept(req, {
      handle: jest.fn().mockReturnValue(Promise.resolve()),
    });

    expect(req.url).toBe(`${serverUrl}/${prefix}/${endpoint}/`);
  });

  it('should ignore handling if raw path doesnt contains "/api" string', async () => {
    const req: HttpRequest = { url: endpoint };

    const interceptor = new PrefixInterceptor(prefix, serverUrl);
    await interceptor.intercept(req, {
      handle: jest.fn().mockReturnValue(Promise.resolve()),
    });
    expect(req.url).toBe(endpoint);
  });

  it('should delete skip segments', async () => {
    const segment = 'abc';
    const initialUrl = `//${segment}//${segment}//`;
    const req: HttpRequest = { url: `/api/${initialUrl}` };

    const interceptor = new PrefixInterceptor('', serverUrl);
    await interceptor.intercept(req, {
      handle: jest.fn().mockReturnValue(Promise.resolve()),
    });
    expect(req.url).toBe(`${serverUrl}/${segment}/${segment}/`);
  });
});

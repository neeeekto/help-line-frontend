import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '../http.types';

export class PrefixInterceptor extends HttpInterceptor {
  private readonly apiPrefix: string;
  private readonly serverUrl: string;

  constructor(apiPrefix: string, serverUrl: string) {
    super();
    this.apiPrefix = apiPrefix;
    this.serverUrl = serverUrl;
    this.throwIfUrlIsInvalid(serverUrl);
  }

  async intercept(req: HttpRequest, next: HttpHandler): Promise<HttpResponse> {
    if (req?.url?.includes('/api')) {
      const url = new URL(req.url, this.serverUrl);
      const path = url.pathname.replace('/api', '/');
      const segments = path.split('/').filter(Boolean);
      const resultPath = [this.serverUrl, this.apiPrefix, ...segments].filter(
        Boolean
      );
      req.url = `${resultPath.join('/')}/${url.search}${url.hash}`;
    }
    return next.handle(req);
  }

  private throwIfUrlIsInvalid(url: string) {
    try {
      new URL('', url);
    } catch (e) {
      throw new Error('Server url is invalid');
    }
  }
}

import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '../http.types';

import set from 'lodash/set';

export interface AuthToken {
  value: string;
  type: string;
}

export class AuthInterceptor extends HttpInterceptor {
  private readonly tokenGetter: () => Promise<AuthToken | undefined>;
  constructor(tokenGetter: () => Promise<AuthToken | undefined>) {
    super();
    this.tokenGetter = tokenGetter;
  }

  async intercept(req: HttpRequest, next: HttpHandler): Promise<HttpResponse> {
    const token = await this.tokenGetter();
    if (token) {
      set(req, ['headers', 'Authorization'], `${token.type} ${token.value}`);
    }
    return next.handle(req);
  }
}

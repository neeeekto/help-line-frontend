import React, { PropsWithChildren, useMemo, useState } from 'react';
import {
  AuthFacade,
  AuthInterceptor,
  HttpProvider,
} from '@help-line/core/http';
import { environment } from '../environments/environment';
import { PrefixInterceptor } from '@help-line/core/http';
import { useAuthStore$ } from '@help-line/core/auth';

export const Http: React.FC<PropsWithChildren> = React.memo(({ children }) => {
  const authStore$ = useAuthStore$();
  const authFacade = useMemo(() => {
    return {
      getToken: () => {
        const user = authStore$.state?.user;
        return user
          ? {
              type: user.token_type,
              value: user.access_token,
            }
          : null;
      },
      logout: () => {
        return authStore$.logoutLocal();
      },
    } as AuthFacade;
  }, [authStore$]);

  const [interceptors] = useState([
    new PrefixInterceptor(environment.apiPrefix, environment.serverUrl),
    new AuthInterceptor(authFacade),
  ]);
  return <HttpProvider interceptors={interceptors}>{children}</HttpProvider>;
});

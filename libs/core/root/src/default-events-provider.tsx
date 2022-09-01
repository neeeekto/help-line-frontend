import React, { PropsWithChildren, useCallback } from 'react';
import { EventsProvider } from '@help-line/core/events';
import { useAuthStore$ } from '@help-line/core/auth';
import { IEnvironment } from './environment.type';

interface DefaultEventsProviderProps extends PropsWithChildren {
  env: IEnvironment;
}

export const DefaultEventsProvider: React.FC<DefaultEventsProviderProps> = ({
  children,
  env,
}) => {
  const authStore$ = useAuthStore$();
  const tokenResolver = useCallback(
    () => authStore$.state?.user?.access_token,
    [authStore$]
  );

  return (
    <EventsProvider authTokenResolver={tokenResolver} serverUrl={env.serverUrl}>
      {children}
    </EventsProvider>
  );
};

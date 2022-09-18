import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { AuthProvider } from '@help-line/core/auth';
import { AuthGuard } from '@help-line/core/auth';
import {
  DefaultHttpProvider,
  DefaultEventsProvider,
  QueryProvider,
} from '@help-line/core/root';
import { environment } from '@app/env';
import { SystemProvider } from './core/system/components';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <QueryProvider>
      <AuthProvider settings={environment.oauth}>
        <SystemProvider>
          <DefaultHttpProvider env={environment}>
            <DefaultEventsProvider env={environment}>
              <AuthGuard>
                <App />
              </AuthGuard>
            </DefaultEventsProvider>
          </DefaultHttpProvider>
        </SystemProvider>
      </AuthProvider>
    </QueryProvider>
  </StrictMode>
);

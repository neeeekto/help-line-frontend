import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { Http } from './core/http';
import { AuthProvider } from '@help-line/core/auth';
import { AuthGuard } from '@help-line/core/auth';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <AuthProvider>
      <Http>
        <AuthGuard>
          <App />
        </AuthGuard>
      </Http>
    </AuthProvider>
  </StrictMode>
);

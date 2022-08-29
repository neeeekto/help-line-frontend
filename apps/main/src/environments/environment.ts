// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

export const environment = {
  production: false,
  apiPrefix: process.env['REACT_APP_API_PREFIX'] || 'api',
  serverUrl: process.env['REACT_APP_API_SERVER'] || window.location.origin,
};

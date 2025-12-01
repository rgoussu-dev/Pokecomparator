/**
 * Environment configuration for remote module URLs
 * This file is replaced during build for different environments
 */
export const environment = {
  production: false,
  remotes: {
    catalog: 'http://localhost:4210/remoteEntry.js',
    detail: 'http://localhost:4220/remoteEntry.js',
    compare: 'http://localhost:4230/remoteEntry.js',
  }
};

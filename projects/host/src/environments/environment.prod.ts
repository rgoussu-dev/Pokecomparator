/**
 * Production environment configuration for remote module URLs
 * Uses relative paths for GitLab Pages deployment
 */
export const environment = {
  production: true,
  remotes: {
    // Relative paths work on GitLab Pages since everything is under the same domain
    catalog: './catalog/remoteEntry.js',
    detail: './detail/remoteEntry.js',
    compare: './compare/remoteEntry.js',
  }
};

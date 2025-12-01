# GitLab Pages Deployment

This document describes how to deploy the PokeComparator microfrontends to GitLab Pages.

## Architecture

```
https://<username>.gitlab.io/<project>/
├── index.html          # Host application
├── remoteEntry.js      # Host's webpack federation entry (if any)
├── assets/
├── catalog/
│   ├── index.html      # Catalog remote (standalone capable)
│   └── remoteEntry.js  # Catalog's federation entry
├── detail/
│   ├── index.html      # Detail remote (standalone capable)
│   └── remoteEntry.js  # Detail's federation entry
└── compare/
    ├── index.html      # Compare remote (standalone capable)
    └── remoteEntry.js  # Compare's federation entry
```

## How It Works

### Module Federation on Static Hosting

GitLab Pages is a static file server, but Module Federation works because:

1. **remoteEntry.js** files are loaded dynamically via `<script>` tags
2. The host application uses relative URLs (`./catalog/remoteEntry.js`) in production
3. All apps are served from the same origin, avoiding CORS issues

### URL Configuration

The host uses environment-based configuration:

**Development** (`environment.ts`):
```typescript
remotes: {
  catalog: 'http://localhost:4210/remoteEntry.js',
  detail: 'http://localhost:4220/remoteEntry.js',
  compare: 'http://localhost:4230/remoteEntry.js',
}
```

**Production** (`environment.prod.ts`):
```typescript
remotes: {
  catalog: './catalog/remoteEntry.js',
  detail: './detail/remoteEntry.js',
  compare: './compare/remoteEntry.js',
}
```

### Base Href

Each application is built with a specific `--base-href`:

| App | Base Href |
|-----|-----------|
| Host | `/<project>/` |
| Catalog | `/<project>/catalog/` |
| Detail | `/<project>/detail/` |
| Compare | `/<project>/compare/` |

This ensures assets and routing work correctly when served from subdirectories.

## CI/CD Pipeline

The `.gitlab-ci.yml` pipeline:

1. **install**: Installs npm dependencies
2. **build**: 
   - Builds libraries (domain, infra, ui)
   - Builds remotes with correct base-href
   - Builds host with correct base-href
   - Assembles everything into `public/` directory
3. **pages**: Deploys `public/` to GitLab Pages

## Configuration

### Update Base URL

Edit `.gitlab-ci.yml` and change `PAGES_BASE_HREF`:

```yaml
variables:
  PAGES_BASE_HREF: "/your-project-name/"
```

For user/group pages (e.g., `username.gitlab.io`), use `/`:
```yaml
PAGES_BASE_HREF: "/"
```

### Custom Domain

If using a custom domain, update:

1. GitLab Pages settings to add the custom domain
2. `PAGES_BASE_HREF` to `/` (since you're at the root)

## SPA Routing

GitLab Pages doesn't support server-side routing rewrites. To handle Angular's client-side routing:

1. Each `index.html` is copied to `404.html`
2. When a route like `/catalog/some-page` is requested:
   - GitLab returns 404 (serves `404.html`)
   - Angular router takes over and handles the route

**Note**: This causes a 404 HTTP status code even though the page works. For production, consider using a proper web server or CDN with rewrite rules.

## Local Testing

To test the production build locally:

```bash
# Build everything
npm run ng build domain -- --configuration=production
npm run ng build infra -- --configuration=production  
npm run ng build ui -- --configuration=production
npm run ng build remote-catalog -- --configuration=production --base-href=/
npm run ng build remote-detail -- --configuration=production --base-href=/
npm run ng build remote-compare -- --configuration=production --base-href=/
npm run ng build host -- --configuration=production --base-href=/

# Assemble
mkdir -p dist/public
cp -r dist/host/* dist/public/
mkdir -p dist/public/catalog dist/public/detail dist/public/compare
cp -r dist/remote-catalog/* dist/public/catalog/
cp -r dist/remote-detail/* dist/public/detail/
cp -r dist/remote-compare/* dist/public/compare/

# Serve with any static server
npx serve dist/public
```

## Troubleshooting

### Assets Not Loading

- Check that `base-href` is set correctly
- Verify asset paths use relative URLs or start with the base href

### Remote Modules Not Loading

- Check browser console for CORS errors (shouldn't happen on same origin)
- Verify `remoteEntry.js` files exist in the correct subdirectories
- Check that `environment.prod.ts` has correct relative paths

### Routing Issues

- Ensure `404.html` files exist in each subdirectory
- Check that `<base href>` in `index.html` matches the deployment path

### Build Failures

- Ensure libraries are built before applications
- Check for circular dependencies between projects

## Standalone Remote Access

Each remote can also be accessed directly:

- `https://<url>/catalog/` - Catalog standalone app
- `https://<url>/detail/` - Detail standalone app  
- `https://<url>/compare/` - Compare standalone app

These show the remote's home page and can navigate to their feature routes.

# Deployment Guide

## Firebase Hosting Configuration

### Project Setup
- **Default Project**: `your-project-id` (needs configuration)
- **Staging Project**: `hybridcloudinsights`
- **Hosting Directory**: `dist/` (Vite build output)

### Configuration Stack

#### Firebase Configuration (`firebase.json`)
- **Public Directory**: `dist/` - Serves Vite production build
- **SPA Routing**: All routes redirect to `/index.html` for client-side routing
- **Caching**: Static assets (JS/CSS) cached for 1 year
- **Ignored Files**: Firebase config, hidden files, node_modules

#### Build Process
1. **Pre-build**: Generates LLM content via `tools/generate-llms.js`
2. **Vite Build**: Creates optimized production bundle in `dist/`
3. **Asset Optimization**: Minification, code splitting, cache headers

### Deployment Commands

```bash
# Manual deployment
npm run firebase:deploy

# Automated deployment with validation
npm run deploy

# Local preview
npm run firebase:serve
```

### Environment Requirements
- Node.js version specified in `.nvmrc`
- Firebase CLI installed globally
- Environment variables configured (see `.env.example`)

### Deployment Validation
The `deploy.js` script performs:
- Dependency installation
- Linting validation
- Build verification
- Output validation (checks `dist/` folder exists)
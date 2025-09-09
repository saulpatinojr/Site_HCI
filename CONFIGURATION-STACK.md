# Configuration Stack Overview

## Build & Development Stack
- **Build Tool**: Vite 4.4.5
- **Framework**: React 18.2.0
- **Styling**: Tailwind CSS 3.3.3
- **Backend**: Supabase (authentication & data)
- **Hosting**: Firebase Hosting

## Configuration Files

### Core Configuration
- `vite.config.js`: Build configuration and plugins
- `tailwind.config.js`: Styling configuration
- `postcss.config.js`: CSS processing
- `.eslintrc.json`: Code quality rules
- `.prettierrc`: Code formatting

### Deployment Configuration
- `firebase.json`: Firebase hosting settings
- `.firebaserc`: Firebase project mapping
- `deploy.js`: Automated deployment script
- `.nvmrc`: Node.js version specification

### Environment Configuration
- `.env.example`: Environment variable template
- `.gitignore`: Version control exclusions

## Deployment Pipeline

### Local Development
1. `npm run dev` → Vite dev server
2. Hot reload enabled
3. Environment variables from `.env`

### Production Build
1. `tools/generate-llms.js` → Content generation
2. `vite build` → Optimized bundle creation
3. Output to `dist/` directory
4. Asset optimization and code splitting

### Deployment Process
1. `npm run deploy` → Validation and build
2. **Cache clearing** → Removes `dist/` folder
3. **Fresh build** → Creates new files with unique hashes
4. `firebase deploy` → Upload to hosting
5. Cache headers applied automatically
6. SPA routing configured

### Cache Management
To prevent deployment issues:
- Always clear `dist/` before building
- Use `npm run deploy` for automated cache clearing
- Manual clearing: `rm -rf dist && npm run build`

## Dependencies Overview
- **UI Components**: Radix UI primitives
- **Animation**: Framer Motion
- **Routing**: React Router DOM
- **State Management**: React Context
- **Authentication**: Supabase Auth
- **Build Tools**: Vite, ESLint, Prettier
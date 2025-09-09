# GitHub Integration Setup

## Repository Configuration

### Required Files
- `.gitignore`: Excludes build artifacts, dependencies, environment files
- `package.json`: Defines deployment scripts and dependencies
- `.nvmrc`: Specifies Node.js version for consistency

### Environment Variables
Environment variables are managed via `.env` file (not committed):
- Copy `.env.example` to `.env`
- Configure Supabase credentials
- Set API keys as needed

## Automated Deployment Options

### Option 1: GitHub Actions (Recommended)
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Firebase
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version-file: '.nvmrc'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          projectId: hybridcloudinsights
```

### Option 2: Manual Deployment
```bash
git push origin main
npm run deploy
npm run firebase:deploy
```

## Required Secrets (for GitHub Actions)
- `FIREBASE_SERVICE_ACCOUNT`: Firebase service account JSON
- `VITE_SUPABASE_URL`: Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anonymous key

## Branch Strategy
- **Main Branch**: Production deployments
- **Feature Branches**: Development work
- **Staging**: Uses `hybridcloudinsights` Firebase project
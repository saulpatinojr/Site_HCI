# Firebase Integration

## Services Used
- **Firebase Hosting**: Static site hosting for React SPA
- **Firebase SDK**: v12.2.1 (configured in package.json)

## Configuration Files

### `.firebaserc`
```json
{
  "projects": {
    "default": "your-project-id",
    "staging": "hybridcloudinsights"
  }
}
```

### `firebase.json`
- **Hosting Configuration**: Serves from `dist/` directory
- **Rewrites**: SPA routing support (all routes → `/index.html`)
- **Headers**: Cache control for static assets
- **Ignore Patterns**: Excludes config files and dependencies

## Project Environments
- **Default**: `your-project-id` (requires setup)
- **Staging**: `hybridcloudinsights` (configured)

## Hosting Features
- **SPA Support**: Client-side routing enabled
- **Asset Caching**: 1-year cache for JS/CSS files
- **Build Integration**: Automated deployment from `dist/` folder

## Required Setup
1. Update default project ID in `.firebaserc`
2. Ensure Firebase CLI authentication
3. Configure environment variables for build process
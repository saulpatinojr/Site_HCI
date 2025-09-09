# Cache Management for Firebase Deployments

## Issue
Firebase hosting can serve cached versions of old builds, causing:
- JavaScript errors from outdated code
- Blank pages or broken functionality
- Inconsistent behavior between local and production

## Solution
Always clear the build cache before deployment:

### Automated (Recommended)
```bash
npm run deploy  # Includes automatic cache clearing
```

### Manual
```bash
# Windows
rmdir /s /q dist && npm run build && firebase deploy

# Unix/Linux/macOS  
rm -rf dist && npm run build && firebase deploy
```

## Implementation
The `deploy.js` script now automatically:
1. Removes existing `dist/` folder
2. Runs fresh build with new file hashes
3. Deploys clean build to Firebase

## Apply to HCW Project
This same cache clearing process should be implemented in the HCW project to prevent similar deployment issues.

Update the HCW `deploy.js` script with the same cache clearing logic.
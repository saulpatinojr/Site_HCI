#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';

console.log('🚀 Starting deployment process...');

try {
  // Check if .env file exists
  if (!fs.existsSync('.env')) {
    console.warn('⚠️  Warning: .env file not found. Make sure environment variables are set.');
  }

  // Clean and install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm ci', { stdio: 'inherit' });

  // Run linting
  console.log('🔍 Running linter...');
  execSync('npm run lint', { stdio: 'inherit' });

  // Build the project
  console.log('🏗️  Building project...');
  execSync('npm run build', { stdio: 'inherit' });

  // Check if dist folder was created
  if (!fs.existsSync('dist')) {
    throw new Error('Build failed: dist folder not found');
  }

  console.log('✅ Build completed successfully!');
  console.log('📁 Files ready for deployment in the dist/ folder');
  
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}
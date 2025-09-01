#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const componentName = process.argv[2];
const componentType = process.argv[3] || 'layout'; // layout, ui

if (!componentName) {
  console.error('❌ Please provide a component name');
  console.log('Usage: npm run create-component ComponentName [type]');
  console.log('Types: layout, ui');
  process.exit(1);
}

const componentDir = path.join('src', 'components', componentType);
const componentPath = path.join(componentDir, `${componentName}.jsx`);

// Ensure directory exists
if (!fs.existsSync(componentDir)) {
  fs.mkdirSync(componentDir, { recursive: true });
}

// Component template
const componentTemplate = `import React from 'react';

const ${componentName} = () => {
  return (
    <div className="">
      <h1>${componentName}</h1>
    </div>
  );
};

export default ${componentName};
`;

// Create component file
fs.writeFileSync(componentPath, componentTemplate);

console.log(`✅ Component created: ${componentPath}`);
console.log(`📝 Don't forget to export it from the appropriate index file if needed!`);
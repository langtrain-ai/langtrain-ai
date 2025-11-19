#!/usr/bin/env node
try {
    require('../packages/cli/dist/index.js');
} catch (e) {
    console.error("Error loading CLI. Ensure you have built the project: npm run build");
    process.exit(1);
}

#!/bin/bash
# Publish NPM package to npm registry
# Usage: ./scripts/publish-npm.sh [--dry-run]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

DRY_RUN=false

# Parse arguments
for arg in "$@"; do
    case $arg in
        --dry-run)
            DRY_RUN=true
            shift
            ;;
        --help|-h)
            echo "Usage: ./scripts/publish-npm.sh [--dry-run]"
            echo ""
            echo "Options:"
            echo "  --dry-run    Build and pack without publishing"
            echo "  --help       Show this help message"
            exit 0
            ;;
    esac
done

echo -e "${GREEN}🚀 NPM Package Publisher${NC}"
echo "========================="

# Check if NPM_TOKEN is set (unless dry run)
if [ "$DRY_RUN" = false ] && [ -z "$NPM_TOKEN" ]; then
    echo -e "${YELLOW}⚠️  NPM_TOKEN environment variable not set${NC}"
    echo "Set it with: export NPM_TOKEN=your_token_here"
    echo "Get a token from: https://www.npmjs.com/settings/YOUR_USERNAME/tokens"
    echo ""
    echo "Running in dry-run mode instead..."
    DRY_RUN=true
fi

cd "$ROOT_DIR"

# Step 1: Install dependencies
echo -e "\n${GREEN}📦 Installing dependencies...${NC}"
npm ci

# Step 2: Build TypeScript packages
echo -e "\n${GREEN}🔨 Building packages...${NC}"
npm run build

# Step 3: Run tests
echo -e "\n${GREEN}🧪 Running tests...${NC}"
npm test || true

# Step 4: Navigate to npm package
cd "$ROOT_DIR/npm"

if [ "$DRY_RUN" = true ]; then
    echo -e "\n${YELLOW}📦 Dry run: Creating package tarball...${NC}"
    npm pack
    echo -e "\n${GREEN}✅ Dry run complete! Package tarball created.${NC}"
    echo "To publish for real, run: npm publish --access public"
else
    echo -e "\n${GREEN}📤 Publishing to npm...${NC}"
    npm publish --access public
    echo -e "\n${GREEN}✅ Successfully published to npm!${NC}"
fi

cd "$ROOT_DIR"
echo -e "\n${GREEN}Done!${NC}"

#!/bin/bash
# Publish Python packages to PyPI
# Usage: ./scripts/publish-pypi.sh [--dry-run]

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
            echo "Usage: ./scripts/publish-pypi.sh [--dry-run]"
            echo ""
            echo "Options:"
            echo "  --dry-run    Build packages without uploading to PyPI"
            echo "  --help       Show this help message"
            exit 0
            ;;
    esac
done

echo -e "${GREEN}🐍 PyPI Package Publisher${NC}"
echo "=========================="

# Check if PYPI_API_TOKEN is set (unless dry run)
if [ "$DRY_RUN" = false ] && [ -z "$PYPI_API_TOKEN" ]; then
    echo -e "${YELLOW}⚠️  PYPI_API_TOKEN environment variable not set${NC}"
    echo "Set it with: export PYPI_API_TOKEN=your_token_here"
    echo "Get a token from: https://pypi.org/manage/account/token/"
    echo ""
    echo "Running in dry-run mode instead..."
    DRY_RUN=true
fi

cd "$ROOT_DIR"

# Install build tools
echo -e "\n${GREEN}📦 Installing build tools...${NC}"
python -m pip install --upgrade pip build twine --quiet

# Clean previous builds
echo -e "\n${GREEN}🧹 Cleaning previous builds...${NC}"
rm -rf dist/ build/ *.egg-info

# Packages to build and publish
PACKAGES=("langtune" "langvision" "langtrain_ai")

for pkg in "${PACKAGES[@]}"; do
    PKG_DIR="$ROOT_DIR/pypi/$pkg"
    
    if [ ! -d "$PKG_DIR" ]; then
        echo -e "${RED}❌ Package directory not found: $PKG_DIR${NC}"
        continue
    fi
    
    echo -e "\n${GREEN}📦 Building $pkg...${NC}"
    python -m build "$PKG_DIR" --outdir dist/
    
    if [ "$DRY_RUN" = false ]; then
        echo -e "${GREEN}📤 Uploading $pkg to PyPI...${NC}"
        python -m twine upload --non-interactive \
            -u __token__ \
            -p "$PYPI_API_TOKEN" \
            dist/${pkg//_/-}* || echo -e "${YELLOW}⚠️  Upload may have failed for $pkg${NC}"
        
        # Clear dist for next package to avoid re-uploading
        rm -rf dist/*
    fi
done

if [ "$DRY_RUN" = true ]; then
    echo -e "\n${GREEN}✅ Dry run complete! Built packages are in dist/${NC}"
    ls -la dist/
    echo ""
    echo "To publish for real, run:"
    echo "  export PYPI_API_TOKEN=your_token_here"
    echo "  ./scripts/publish-pypi.sh"
else
    echo -e "\n${GREEN}✅ Successfully published all packages to PyPI!${NC}"
fi

echo -e "\n${GREEN}Done!${NC}"

import fs from 'fs';
import path from 'path';

const PACKAGES_DIR = path.join(__dirname, '../packages');
const PYPI_DIR = path.join(__dirname, '../pypi');

// Map JS package names (directory names) to Python package names (directory names)
const PACKAGE_MAP: Record<string, string> = {
    'langtune': 'langtune',
    'langvision': 'langvision',
    // 'langtrain-ai': 'langtrain_ai' // Uncomment if there is a JS counterpart or logic to handle it
};

function updatePyProjectVersion(pyPackageName: string, version: string) {
    const pyProjectPath = path.join(PYPI_DIR, pyPackageName, 'pyproject.toml');
    if (!fs.existsSync(pyProjectPath)) {
        console.warn(`Warning: ${pyProjectPath} not found.`);
        return;
    }

    let content = fs.readFileSync(pyProjectPath, 'utf-8');
    // Regex to find version = "x.y.z"
    const versionRegex = /^version\s*=\s*"(.*)"/m;

    if (versionRegex.test(content)) {
        content = content.replace(versionRegex, `version = "${version}"`);
        fs.writeFileSync(pyProjectPath, content);
        console.log(`Updated ${pyPackageName} to version ${version}`);
    } else {
        console.warn(`Warning: Could not find version key in ${pyProjectPath}`);
    }
}

function main() {
    for (const [jsPkg, pyPkg] of Object.entries(PACKAGE_MAP)) {
        const packageJsonPath = path.join(PACKAGES_DIR, jsPkg, 'package.json');
        if (!fs.existsSync(packageJsonPath)) {
            console.warn(`Warning: ${packageJsonPath} not found.`);
            continue;
        }

        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
        const version = packageJson.version;

        if (version) {
            updatePyProjectVersion(pyPkg, version);
        }
    }
}

main();

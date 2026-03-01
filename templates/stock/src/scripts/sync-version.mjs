import fs from 'fs';
import path from 'path';

const packageJsonPath = path.resolve('./package.json');
const appVersionPath = path.resolve('./src/config/appVersion.ts');

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

const content = `export const APP_VERSION = '${packageJson.version}';\n`;

fs.writeFileSync(appVersionPath, content);

console.log(`✔ APP_VERSION atualizado para ${packageJson.version}`);

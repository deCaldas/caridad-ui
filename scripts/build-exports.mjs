import fs, { Dirent } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJSONpath = path.join(__dirname, '..', 'package.json');
const componentsDir = path.join(__dirname, '..', 'dist', 'components');

const pkg = JSON.parse(fs.readFileSync(packageJSONpath, 'utf-8'));

const exportsMap = {
    '.': './dist/index.js'
};

const components = fs.readdirSync(componentsDir, { withFileTypes: true })
.filter(dirent => dirent.isDirectory())
.map(dirent => dirent.name);

components.forEach(name => {
	exportsMap[`./${name}`] = `./dist/components/${name}/${name}.js`;
});

pkg.exports = exportsMap;

fs.writeFileSync(packageJSONpath, JSON.stringify(pkg, null, 2));
console.log(`✅ Exports actualizados con ${components.length} componente(s).`)
const fs = require("fs");
const path = require("path");

const categoryDir = path.join(process.cwd(), "public/category");
const outputFile = path.join(process.cwd(), "data/categoryImages.json");

function readFilesRecursively(dir, prefix = "") {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const result = {};

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const relativePath = prefix ? path.join(prefix, entry.name) : entry.name;

        if (entry.isDirectory()) {
            Object.assign(result, readFilesRecursively(fullPath, relativePath));
        } else {
            const ext = path.extname(entry.name);
            const name = path.basename(entry.name, ext);
            const key = path.join(prefix, name).replace(/\\/g, "/");
            result[key] = relativePath.replace(/\\/g, "/");
        }
    }

    return result;
}

const map = readFilesRecursively(categoryDir);

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, JSON.stringify(map, null, 2));

console.log(`✅ Created category mapping with ${Object.keys(map).length} entries.`);

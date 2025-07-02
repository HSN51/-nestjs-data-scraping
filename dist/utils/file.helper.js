"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureDir = ensureDir;
exports.getFilePath = getFilePath;
exports.saveJsonToFile = saveJsonToFile;
const fs_1 = require("fs");
const path_1 = require("path");
const uuid_1 = require("uuid");
async function ensureDir(dir) {
    try {
        await fs_1.promises.mkdir(dir, { recursive: true });
    }
    catch (err) {
    }
}
function getFilePath(source) {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const dir = (0, path_1.join)('storage', `${yyyy}-${mm}-${dd}`);
    const filename = `${source}_${(0, uuid_1.v4)()}.json`;
    return (0, path_1.join)(dir, filename);
}
async function saveJsonToFile(source, data) {
    const filePath = getFilePath(source);
    const dir = (0, path_1.dirname)(filePath);
    await ensureDir(dir);
    await fs_1.promises.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}
//# sourceMappingURL=file.helper.js.map
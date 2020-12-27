"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSolidityFile = exports.getSolidityFilesFromFolderOrFile = exports.getSolidityFilesFromFolderOrFiles = exports.parseUmlClassesFromFiles = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const klaw_1 = __importDefault(require("klaw"));
const parser_1 = require("@solidity-parser/parser");
const verror_1 = require("verror");
const parser_2 = require("./parser");
const debug = require('debug')('sol2uml');
const parseUmlClassesFromFiles = async (filesOrFolders, ignoreFilesOrFolders, depthLimit = -1) => {
    const files = await getSolidityFilesFromFolderOrFiles(filesOrFolders, ignoreFilesOrFolders, depthLimit);
    let umlClasses = [];
    for (const file of files) {
        const node = await parseSolidityFile(file);
        const relativePath = path_1.relative(process.cwd(), file);
        const umlClass = parser_2.convertNodeToUmlClass(node, relativePath, true);
        umlClasses = umlClasses.concat(umlClass);
    }
    return umlClasses;
};
exports.parseUmlClassesFromFiles = parseUmlClassesFromFiles;
async function getSolidityFilesFromFolderOrFiles(folderOrFilePaths, ignoreFilesOrFolders, depthLimit = -1) {
    let files = [];
    for (const folderOrFilePath of folderOrFilePaths) {
        const result = await getSolidityFilesFromFolderOrFile(folderOrFilePath, ignoreFilesOrFolders, depthLimit);
        files = files.concat(result);
    }
    return files;
}
exports.getSolidityFilesFromFolderOrFiles = getSolidityFilesFromFolderOrFiles;
function getSolidityFilesFromFolderOrFile(folderOrFilePath, ignoreFilesOrFolders = [], depthLimit = -1) {
    debug(`About to get Solidity files under ${folderOrFilePath}`);
    return new Promise((resolve, reject) => {
        try {
            const folderOrFile = fs_1.lstatSync(folderOrFilePath);
            if (folderOrFile.isDirectory()) {
                const files = [];
                // filter out files or folders that are to be ignored
                const filter = (file) => {
                    return !ignoreFilesOrFolders.includes(path_1.basename(file));
                };
                klaw_1.default(folderOrFilePath, {
                    depthLimit,
                    filter,
                    preserveSymlinks: true,
                })
                    .on('data', (file) => {
                    if (path_1.extname(file.path) === '.sol')
                        files.push(file.path);
                })
                    .on('end', () => {
                    debug(`Got Solidity files to be parsed: ${files}`);
                    resolve(files);
                });
            }
            else if (folderOrFile.isFile()) {
                if (path_1.extname(folderOrFilePath) === '.sol') {
                    debug(`Got Solidity file to be parsed: ${folderOrFilePath}`);
                    resolve([folderOrFilePath]);
                }
                else {
                    reject(Error(`File ${folderOrFilePath} does not have a .sol extension.`));
                }
            }
            else {
                reject(Error(`Could not find directory or file ${folderOrFilePath}`));
            }
        }
        catch (err) {
            let error;
            if ((err === null || err === void 0 ? void 0 : err.code) === 'ENOENT') {
                error = Error(`No such file or folder ${folderOrFilePath}. Make sure you pass in the root directory of the contracts`);
            }
            else {
                error = new verror_1.VError(err, `Failed to get Solidity files under folder or file ${folderOrFilePath}`);
            }
            console.error(error.stack);
            reject(error);
        }
    });
}
exports.getSolidityFilesFromFolderOrFile = getSolidityFilesFromFolderOrFile;
function parseSolidityFile(fileName) {
    try {
        const solidityCode = fs_1.readFileSync(fileName, 'utf8');
        return parser_1.parse(solidityCode, {});
    }
    catch (err) {
        throw new verror_1.VError(err, `Failed to parse solidity file ${fileName}.`);
    }
}
exports.parseSolidityFile = parseSolidityFile;
//# sourceMappingURL=fileParser.js.map
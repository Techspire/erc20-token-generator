import { ASTNode } from '@solidity-parser/parser/dist/ast-types';
import { UmlClass } from './umlClass';
export declare const parseUmlClassesFromFiles: (filesOrFolders: string[], ignoreFilesOrFolders: string[], depthLimit?: number) => Promise<UmlClass[]>;
export declare function getSolidityFilesFromFolderOrFiles(folderOrFilePaths: string[], ignoreFilesOrFolders: string[], depthLimit?: number): Promise<string[]>;
export declare function getSolidityFilesFromFolderOrFile(folderOrFilePath: string, ignoreFilesOrFolders?: string[], depthLimit?: number): Promise<string[]>;
export declare function parseSolidityFile(fileName: string): ASTNode;

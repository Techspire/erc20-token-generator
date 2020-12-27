import { UmlClass } from './umlClass';
export interface ClassOptions {
    hideAttributes?: boolean;
    hideOperators?: boolean;
    hideStructs?: boolean;
    hideEnums?: boolean;
    hideLibraries?: boolean;
    hideInterfaces?: boolean;
}
export declare const dotUmlClass: (umlClass: UmlClass, options?: ClassOptions) => string;

import { WeightedDiGraph } from 'js-graph-algorithms';
import { UmlClass } from './umlClass';
export declare const classesConnectedToBaseContracts: (umlClasses: UmlClass[], baseContractNames: string[]) => UmlClass[];
export declare const classesConnectedToBaseContract: (umlClasses: UmlClass[], baseContractName: string, graph: WeightedDiGraph) => {
    [contractName: string]: UmlClass;
};

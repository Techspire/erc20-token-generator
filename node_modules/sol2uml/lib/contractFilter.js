"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classesConnectedToBaseContract = exports.classesConnectedToBaseContracts = void 0;
const js_graph_algorithms_1 = require("js-graph-algorithms");
const classesConnectedToBaseContracts = (umlClasses, baseContractNames) => {
    let filteredUmlClasses = {};
    const graph = loadGraph(umlClasses);
    for (const baseContractName of baseContractNames) {
        filteredUmlClasses = {
            ...filteredUmlClasses,
            ...exports.classesConnectedToBaseContract(umlClasses, baseContractName, graph),
        };
    }
    return Object.values(filteredUmlClasses);
};
exports.classesConnectedToBaseContracts = classesConnectedToBaseContracts;
const classesConnectedToBaseContract = (umlClasses, baseContractName, graph) => {
    // Find the base UML Class from the base contract name
    const baseUmlClass = umlClasses.find(({ name }) => {
        return name === baseContractName;
    });
    if (!baseUmlClass) {
        throw Error(`Failed to find base contract with name "${baseContractName}"`);
    }
    const dfs = new js_graph_algorithms_1.Dijkstra(graph, baseUmlClass.id);
    // Get all the UML Classes that are connected to the base contract
    const filteredUmlClasses = {};
    for (const umlClass of umlClasses) {
        if (dfs.hasPathTo(umlClass.id)) {
            filteredUmlClasses[umlClass.name] = umlClass;
        }
    }
    return filteredUmlClasses;
};
exports.classesConnectedToBaseContract = classesConnectedToBaseContract;
function loadGraph(umlClasses) {
    const graph = new js_graph_algorithms_1.WeightedDiGraph(umlClasses.length); // 6 is the number vertices in the graph
    for (const umlClass of umlClasses) {
        for (const association of Object.values(umlClass.associations)) {
            // Find the first UML Class that matches the target class name
            const targetUmlClass = umlClasses.find((_umlClass) => {
                return association.targetUmlClassName === _umlClass.name;
            });
            if (!targetUmlClass) {
                continue;
            }
            graph.addEdge(new js_graph_algorithms_1.Edge(umlClass.id, targetUmlClass.id, 1));
        }
    }
    return graph;
}
//# sourceMappingURL=contractFilter.js.map
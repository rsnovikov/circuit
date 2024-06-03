import * as mathjs from "mathjs";

interface IPhysData {
    I: number;
    U: number;
    R: number;
    extraEDS: number;
    extraCurrent: number;
}

interface IBranch {
    start: any;
    end: any;
    path: string[];
    objectsPath: any[];
    physData: IPhysData;
}

const analyzeCircuit = ({ nodes, elements }) => {
    // console.time()
    // console.log(elements)
    const apexNodes = nodes.filter((node) => node.connectionIds.length >= 3);
    const allR = elements.reduce(
        (acc, curr) => acc + (Number(curr.physData?.resistance?.value) || 0),
        0
    )
    const degree =
        Math.log10(
            allR / elements.length
        ) + 10;

    let gndNode = nodes.find((node) => node.gnd);

    const elementsRecord = elements.reduce(
        (acc, item) => ({ ...acc, [item.id]: { ...item } }),
        {}
    );

    nodes.forEach((node) => {
        const element = elementsRecord[node?.relatedElement?.elementId];
        if (!element) {
            return;
        }
        if (element.connectionIds) {
            element.connectionIds.push(node.id);
        } else {
            element.connectionIds = [node.id];
        }
    });
    elements = Object.values(elementsRecord);
    const VS = elements.filter((el) => el.type === "voltageSource");
    const composedArray = [...elements, ...nodes];
    if (!VS.length) {
        throw new Error("no voltage source found");
    }
    let allBranches: IBranch[] = [];
    // apexNodes.push(nodes.find(e=>VS.some(vsElem => vsElem.id == e.relatedElement?.elementId) && e.relatedElement.terminalId == 2))

    const findBranch = (firstNode, secondNode): IBranch[] => {
        const branches: IBranch[] = [];
        const analyzeConnection = (item, prevId, branchIndex) => {
            if (typeof item !== "object") {
                item = composedArray.find((el) => el.id === item);
            }
            if (!item) {
                return false;
            }
            const id = item.id;
            if (prevId) {
                if (id === secondNode.id) {
                    if (prevId === firstNode.id) {
                        if (
                            item.relatedElement &&
                            item.relatedElement.elementId 
                        ) {
                            const element = composedArray.find(
                                (el) => el.id === item.relatedElement.elementId
                            );
                            if (element.type !== 'relay' && element.type !== 'switch' || Number(item.relatedElement.terminalId) <= 2) {
                                branches[branchIndex].path.push(element.id);
                                branches[branchIndex].objectsPath.push(element);
                            }
                        }
                    }
                    return true;
                } else if (
                    id === prevId ||
                    apexNodes.find((node) => node.id === id)
                )
                    return false;
            }
            let foundConnection: boolean = false;
            item.connectionIds.forEach((connection: string) => {
                if (prevId === connection) return;
                if (analyzeConnection(connection, id, branchIndex)) {
                    foundConnection = true;
                }
            });
            if (foundConnection) {
                const lastElementInPath =
                    branches[branchIndex].path[
                        branches[branchIndex].path.length - 1
                    ] ?? "";
                branches[branchIndex].path.push(item.id);
                branches[branchIndex].objectsPath.push(item);
                if (
                    item.relatedElement &&
                    item.relatedElement.elementId &&
                    lastElementInPath !== item.relatedElement.elementId
                ) {
                    const element = composedArray.find(
                        (el) => el.id === item.relatedElement.elementId
                    );
                    console.log(item.relatedElement.terminalId, element?.type);

                    if (element?.type !== 'relay' && element?.type !== 'switch' || Number(item.relatedElement.terminalId) <= 2) {
                        branches[branchIndex].path.push(element.id);
                        branches[branchIndex].objectsPath.push(element);
                    }
                }
                return true;
            }
        };

        firstNode.connectionIds.forEach((connection, index) => {
            branches.push({
                path: [],
                objectsPath: [],
                end: firstNode,
                start: secondNode,
                physData: {
                    R: 0,
                    U: 0,
                    I: 0,
                    extraEDS: 0,
                    extraCurrent: 0,
                },
            });
            if (
                !analyzeConnection(
                    connection,
                    firstNode.id,
                    branches.length - 1
                )
            )
                branches.pop();
        });
        return branches;
    };

    console.log("apexNodes: ", apexNodes);

    if (apexNodes.length < 2) {
        apexNodes.push(
            ...nodes.filter((node) => VS[0].connectionIds.includes(node.id))
        );
        const V = elements.find((el) => el.id === VS[0].id);
        V.physData.resistance.value =
            Number(V.physData.resistance.value) &&
            Number(V.physData.resistance.value) > 0
                ? Number(V.physData.resistance.value)
                : 10 ** -degree;
        console.log("apexNodes: ", apexNodes);
    }

    if (!gndNode || !apexNodes.find((node) => node.id === gndNode.id)) {
        apexNodes[0].gnd = true;
        gndNode = apexNodes[0];
    }

    gndNode.fi = 0;

    for (let index = 0; index < apexNodes.length; index++) {
        const element = apexNodes[index];
        for (let ind2 = index; ind2 < apexNodes.length; ind2++) {
            const el = apexNodes[ind2];
            if (ind2 === index) continue;
            const branches: IBranch[] = findBranch(element, el);
            allBranches.push(...branches);
        }
    }

    //TODO: Убрать повторяющийся функционал
    const analyzeBranch = (branch: IBranch) => {
        const { objectsPath } = branch;
        for (let index = 0; index < objectsPath.length; index++) {
            const obj = objectsPath[index];
            if (obj.physData) {
                if (
                    obj.physData &&
                    obj.physData.resistance &&
                    obj.physData.resistance.value
                ) {
                    branch.physData.R += Number(obj.physData.resistance.value);
                }
                if (obj.type === "voltageSource") {
                    const prevObj = objectsPath[index - 1];
                    if (prevObj) {
                        if (prevObj.relatedElement?.terminalId == 1)
                            branch.physData.extraEDS -= Number(
                                obj.physData.voltage.value
                            );
                        else if (prevObj.relatedElement?.terminalId == 2)
                            branch.physData.extraEDS += Number(
                                obj.physData.voltage.value
                            );
                    } else if (branch.start.relatedElement?.terminalId == 1) {
                        branch.physData.extraEDS -= Number(
                            obj.physData.voltage.value
                        );
                    } else if (branch.start.relatedElement?.terminalId == 2) {
                        branch.physData.extraEDS += Number(
                            obj.physData.voltage.value
                        );
                    }
                } else if (obj.type === "current") {
                    branch.physData.extraCurrent += Number(
                        obj.physData.current.value
                    );
                    branch.physData.R = 10 ** degree;
                }
            }
        }
        return branch;
    };

    console.log("allBranches: ", allBranches);

    const topologMatrix: number[][] = [];

    allBranches = allBranches.map((branch) => analyzeBranch(branch));
    const Imtx = allBranches.map((branch) => branch.physData.extraCurrent ?? 0);
    const Emtx = allBranches.map((branch) => branch.physData.extraEDS ?? 0);
    const Ymtx = mathjs.diag(
        allBranches.map((branch) =>
            branch.physData.R ? 1 / branch.physData.R : 10 ** degree
        )
    );

    console.log("Imtx: ", Imtx);
    console.log("Emtx: ", Emtx);

    apexNodes.forEach((node) => {
        if (node.gnd) return;
        const row: number[] = [];
        allBranches.forEach((branch: IBranch) => {
            if (branch.start.id === node.id) {
                row.push(1);
            } else if (branch.end.id === node.id) {
                row.push(-1);
            } else {
                row.push(0);
            }
        });
        topologMatrix.push(row);
    });
    console.log("allBranches: ", allBranches);
    console.log("topologMatrix: ", topologMatrix);
    console.log("Ymtx: ", Ymtx);
    let Umtx
    try {
        const Gmtx = mathjs.multiply(
            mathjs.multiply(topologMatrix, Ymtx),
            mathjs.transpose(topologMatrix)
        );
        console.log("Gmtx: ", Gmtx);
        const IsubtractYEmtx = mathjs.subtract(Imtx, mathjs.multiply(Ymtx, Emtx));
        const Jmtx = mathjs.multiply(topologMatrix, IsubtractYEmtx);
        console.log("Jmtx: ", Jmtx);
        Umtx = mathjs.multiply(mathjs.inv(Gmtx), Jmtx);
        console.log("Umtx: ", Umtx);
    } catch (error) {
        return []
    }

    let ind = 0;
    for (let index = 0; index < apexNodes.length; index++) {
        const el = apexNodes[index];
        if (el.gnd) continue;
        el.fi = Umtx[ind];
        ind++;
    }
    console.log(apexNodes);

    //TODO:  требуется рефактор
    const calculatePhysicalData = (branch: IBranch) => {
        if (branch.physData.extraEDS === 0) {
            branch.objectsPath = branch.objectsPath.map((obj) => {
                if (obj.physData) {
                    if (obj.type !== "voltageSource") {
                        obj.physData.voltage = {
                            value:
                                Math.abs(branch.physData.I) *
                                    obj.physData.resistance?.value || 0,
                        };
                    }
                    if (obj.type !== "current") {
                        obj.physData.current = { value: Math.abs(branch.physData.I) };
                    }
                    delete obj.connectionIds;
                }
                return obj;
            });
        } else {
            let currentFi =
                apexNodes.find((node) => node.id === branch.start.id).fi || 0;
            let currentDelta = 0;
            branch.objectsPath = branch.objectsPath.map((obj) => {
                if (obj.physData) {
                    if (obj.type !== "voltageSource") {
                        currentDelta =
                            Math.abs(branch.physData.I) *
                                obj.physData.resistance?.value || 0;
                        obj.physData.voltage = {
                            value: currentDelta,
                        };
                    } else {
                        currentDelta = -obj.physData.voltage.value;
                    }

                    currentFi -= currentDelta;
                    obj.physData.current = { value: Math.abs(branch.physData.I) };
                }
                return obj;
            });
        }
        return branch;
    };
    //TODO: поменять на FOR (все или только поиск нод), убрать 2 find и использовать индексы, для знака из матрицы A. Возможно вообще делать проходку по матрице
    allBranches = allBranches.map((branch) => {
        const firstFi = apexNodes.find(
            (node) => node.id === branch.start.id
        ).fi;
        const secondFi = apexNodes.find((node) => node.id === branch.end.id).fi;
        branch.physData.U = secondFi - firstFi;
        branch.physData.I = branch.physData.extraEDS
            ? (branch.physData.extraEDS - branch.physData.U) / branch.physData.R
            : branch.physData.U / branch.physData.R;
        return calculatePhysicalData(branch);
    });
    console.log(allBranches);
    const newElements: any[] = [];
    allBranches.forEach((branch: IBranch) => {
        newElements.push(...branch.objectsPath.filter((obj) => obj.type));
    });
    // console.timeEnd()
    return newElements;
};

export { analyzeCircuit };

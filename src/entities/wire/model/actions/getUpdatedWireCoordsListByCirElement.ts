import { ICirElement } from "@/entities/cirElement/model/types";
import { ICirNode } from "@/entities/node";
import { ICirWire } from "../types";
import { getWirePosByElement } from "../../lib/getWirePosByElement";

export const getUpdatedWireCoordsListByCirElement = ({wires, cirElement, nodes}: {cirElement: ICirElement;nodes: ICirNode[]; wires: ICirWire[]}) => {
	const elementNodes = nodes.filter((node) => node.relatedElement?.elementId === cirElement.id);

	return wires
		.filter((wire) =>
			elementNodes.some((node) => node.id === wire.startNodeId || node.id === wire.endNodeId)
		)
		.map((wire) => {
			const endNode = elementNodes.find((node) => node.id === wire.endNodeId);
			if (endNode) {
				const { x, y } = getWirePosByElement({ element: cirElement, node: endNode });

				const updatedWire: ICirWire = {
					...wire,
					x2: x,
					y2: y,
				};
				return updatedWire;
			} else {
				const startNode = elementNodes.find((node) => node.id === wire.startNodeId);
				if (!startNode) return null;
				const { x, y } = getWirePosByElement({ element: cirElement, node: startNode });

				const updatedWire: ICirWire = {
					...wire,
					x1: x,
					y1: y,
				};
				return updatedWire;
			}
		}).filter(wire => wire !== null) as ICirWire[];
}
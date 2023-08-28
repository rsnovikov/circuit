
import { ICirElement } from "@/entities/cirElement/model/types";
import { ICirNode } from '@/entities/node';
import { degreesToRadians } from '@/shared/lib/degreesToRadians';

export const getWirePosByElement = ({
  element,
  node,
}: {
  element: ICirElement;
  node: ICirNode;
}) => {
  const cos = Math.round(Math.cos(degreesToRadians(element.rotate)));
  const sin = Math.round(Math.sin(degreesToRadians(element.rotate)));

  return {
    x: element.x + (cos !== 0 ? node.x * cos : node.y * sin),
    y: element.y + (cos !== 0 ? node.y * cos : -node.x * sin),
  };
};

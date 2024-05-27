import map from "lodash/map";

import { positions } from "./positions.ts";

export function getAllUsed() {
  const methodologiesUsed = map(positions, (position) => {
    return position.methodologiesUsed;
  })
    .flat()
    .sort((a, b) => {
      return a.localeCompare(b);
    });

  const techUsed = map(positions, (position) => {
    return position.techUsed;
  })
    .flat()
    .sort((a, b) => {
      return a.localeCompare(b);
    });

  return [methodologiesUsed, techUsed];
}

export function getUsedByPosition(position: keyof typeof positions) {
  const { methodologiesUsed } = positions[position];
  const { techUsed } = positions[position];

  return [methodologiesUsed, techUsed];
}

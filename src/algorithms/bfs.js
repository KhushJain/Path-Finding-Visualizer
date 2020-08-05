import { getUnvisitedNeighbors } from "./helperFunctions.js";

export const bfs = (grid, startNode, finishNode) => {
  const unvisited = [];
  const visitedNodesInOrder = [];
  startNode.isVisted = true;
  startNode.previousNode = null;
  unvisited.push(startNode);
  visitedNodesInOrder.push(startNode);
  while (unvisited.length !== 0) {
    let currentNode = unvisited.shift();
    if (currentNode === finishNode) {
      return visitedNodesInOrder;
    }
    let neighbors = getUnvisitedNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      neighbor.isVisited = true;
      neighbor.previousNode = currentNode;
      unvisited.push(neighbor);
      visitedNodesInOrder.push(neighbor);
    }
  }
  return visitedNodesInOrder;
}
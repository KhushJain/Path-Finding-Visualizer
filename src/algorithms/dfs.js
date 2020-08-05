import { getUnvisitedNeighbors } from "./helperFunctions.js";

export const dfs = (grid, startNode, finishNode) => {
  const unvisited = [];
  const visitedNodesInOrder = [];
  startNode.isVisted = true;
  startNode.previousNode = null;
  unvisited.push(startNode);
  visitedNodesInOrder.push(startNode);
  while (unvisited.length !== 0) {
    let currentNode = unvisited.pop();
    if (currentNode === finishNode) return visitedNodesInOrder;
    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);
    let neighbors = getUnvisitedNeighbors(currentNode, grid);

    for (const neighbor of neighbors) {
      neighbor.previousNode = currentNode;
      unvisited.push(neighbor);
    }
  }
  return visitedNodesInOrder;
}
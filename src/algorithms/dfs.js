import { getUnvisitedNeighbors } from "./helperFunctions.js";

export const dfs = (grid, startNode, finishNode) => {
  const unvisited = [];
  const visitedNodesInOrder = [];
  startNode.isVisted = true;
  startNode.previousNode = null;
  unvisited.push(startNode);
  visitedNodesInOrder.push(startNode);
  while (unvisited.length !== 0) {
    //console.log(unvisited);
    let currentNode = unvisited.pop();
    if (currentNode === finishNode) return visitedNodesInOrder;
    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);
    let neighbors = getUnvisitedNeighbors(currentNode, grid);

    // Random neighbor selection
    /*let n = neighbors.length;
    for (let i = 0; i < n; i++) {
      let remove = Math.floor(Math.random() * neighbors.length);
      let neighbor = neighbors.splice(remove, 1)[0];*/

    for (const neighbor of neighbors) {
      neighbor.previousNode = currentNode;
      unvisited.push(neighbor);
    }
  }
  return visitedNodesInOrder;
}

export const getUnvisitedNeighbors = (node, grid) => {
  let neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  neighbors = neighbors.filter((neighbor) => !neighbor.isVisited);
  return neighbors.filter(neighbor => !neighbor.isWall);
};

export const getAllNodes = (grid) => {
    const nodes = [];
    for (let i = 0; i < 19; i++) {
      for (let j = 0; j < 49; j++) {
        if (grid[i][j].isVisited || grid[i][j].isWall) continue;
        nodes.push(grid[i][j]);
      }
    }
    return nodes;
}

export const getNodesInShortestPathOrder = (startNode, finishNode) => {
    const shortestPath = [];
    let currentNode = finishNode;
    while (currentNode !== null && currentNode !== startNode) {     
     shortestPath.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    shortestPath.unshift(startNode);
    return shortestPath;
}
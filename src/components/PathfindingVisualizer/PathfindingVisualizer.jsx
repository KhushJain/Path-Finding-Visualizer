import React, { Component } from "react";
import Header from '../Header/Header';
import Node from "../Node/Node";
import { getNodesInShortestPathOrder } from "../../algorithms/helperFunctions";
import { dijkstra } from "../../algorithms/dijkstra";
import { bfs } from "../../algorithms/bfs";
import { dfs } from "../../algorithms/dfs";

import "./PathfindingVisualizer.css";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

const algorithmsImplemented = {
  'dijkstra': dijkstra,
  'bfs': bfs,
  'dfs': dfs,
};

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      isVisualizing: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    if (this.state.isVisualizing) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed || this.state.isVisualizing) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
	if (this.state.isVisualizing) return;
    this.setState({ mouseIsPressed: false });
  }

  animate(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          document.getElementById(`node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`).className = "node node-visited node-finish";
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className = "node node-visited";
        document.getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`).className = "node node-visited node-start";
        document.getElementById(`node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`).className = "node node-finish";
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className = "node node-shortest-path";
        document.getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`).className = "node node-start node-shortest-path";
        if (i === nodesInShortestPathOrder.length - 1) {
          document.getElementById(`node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`).className = "node node-finish node-shortest-path";
          this.setState({ isVisualizing: false });
        }
      }, 50 * i);
    }
  }

  visualize = (chosenAlgo) => {
    this.setState({ isVisualizing: true });
    this.unvisitNodes(false);
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = algorithmsImplemented[chosenAlgo](grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(
      startNode,
      finishNode
    );
    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  unvisitNodes(removeWalls) {
    const { grid } = this.state;
    for (let row = 0; row < 19; row++) {
      for (let col = 0; col < 49; col++) {
        let node = grid[row][col];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node ";
        node.isVisited = false;
        node.previous = null;
        node.distance = Infinity;
        if (removeWalls) {
          node.isWall = false;
        } else if (node.isWall) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-wall";
        }
        if (row === START_NODE_ROW && col === START_NODE_COL) {
          document.getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`).className = "node node-start";
          node.isStart = true;
        }
        if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) {
          document.getElementById(`node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`).className = "node node-finish";
          node.isEnd = true;
        }
      }
    }
    this.setState({ grid: grid });
  }

  clearBoard = () => {
    if (this.state.isVisualizing) return;
    this.unvisitNodes(true);
  }

  render() {
    const { grid, mouseIsPressed } = this.state;
    return (
      <>
        <Header visualize={this.visualize} isVisualizing={this.state.isVisualizing} clearBoard={this.clearBoard}/>
        <div className="main" style={{ display: 'block', boxSizing: 'border-box', textAlign: 'center', marginTop: '30px' }}>
          <ul className="cellunordered">
            <li className="celllist">
              <div className="cell cell-start"></div>Starting Node
            </li>
            <li className="celllist">
              <div className="cell cell-finish"></div>Target Node
            </li>
            <li className="celllist">
              <div className="cell" style={{ backgroundColor: 'white', border: '1px solid rgb(175, 216, 248)' }}></div>Unvisited Node
            </li>
            <li className="celllist">
              <div className="cell" style={{ backgroundColor: 'rgba(0, 217, 159, 0.75)' }}></div>
              <div className="cell" style={{ backgroundColor: 'rgba(0, 190, 218, 0.75)' }}></div>Visited Nodes
            </li>
            <li className="celllist">
              <div className="cell" style={{ backgroundColor: 'rgb(12, 53, 71)' }}></div>Wall Node
            </li>
            <li className="celllist">
              <div className="cell" style={{ backgroundColor: 'rgb(255, 254, 106)' }}></div>Shortest-Path Node
            </li>
          </ul>
        </div>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 19; row++) {
    const currentRow = [];
    for (let col = 0; col < 49; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

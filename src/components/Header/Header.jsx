import React, { Component } from "react";
import './Header.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class Header extends Component {

    render() {
        return (
          <Navbar className="color-nav" collapseOnSelect expand="lg" variant="dark">
            <Navbar.Brand href="">Path Finding Visualizer</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link title="Dijkstra's shortest path algorithm works on weighted graphs and guarantees the shortest path. This algorithm works similarly to breadth-first search in that it begins at the start node and then works it's way outward in all directions. As it works outwards it checks the edges (u,v,w) to see if u.distance + w is less than v.distance. If so it updates v.distance to hold u.distance + w. It continues this process until no more nodes can be visited, or until the destination node is found." 
                  onClick={() => this.props.visualize('dijkstra')} disabled={this.props.isVisualizing} href="">Dijkstra</Nav.Link>
                <Nav.Link title="Breadth-first search works on unweighted graphs and guarantees the shortest path. This algorithm works by beginning at the starting node and visiting each of its neighbors. It then moves to each neighbor and visits any of its unvisited neighbors. It repeats this process spreading out across the graph until all nodes that can be visited have been, or until we reach the destination node." 
                  onClick={() => this.props.visualize('bfs')} disabled={this.props.isVisualizing} href="">Breadth First Search</Nav.Link>
                <Nav.Link title="Depth-first search works on unweighted graphs and does not guarantee the shortest path. This algorithm visits one node at a time. At each node it visits it selects an unvisited neighbor and moves to that node. It repeats this process until it reaches a node with no unvisited neighbors. It then backtracks to a node which has unvisited neighbors and moves forward down that path. It repeats this until all nodes that can be visited have been, or until it reaches the destination node." 
                  onClick={() => this.props.visualize('dfs')} disabled={this.props.isVisualizing} href="">Depth First Search</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link onClick={() => this.props.clearBoard()} disabled={this.props.isVisualizing} href="">Clear Board <i className="fa fa-eraser" aria-hidden="true"></i></Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        );
    }
};

export default Header;
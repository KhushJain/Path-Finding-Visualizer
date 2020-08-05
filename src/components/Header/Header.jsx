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
                <Nav.Link onClick={() => this.props.visualize('dijkstra')} disabled={this.props.isVisualizing} href="">Dijkstra</Nav.Link>
                <Nav.Link onClick={() => this.props.visualize('bfs')} disabled={this.props.isVisualizing} href="">Breadth First Search</Nav.Link>
                <Nav.Link onClick={() => this.props.visualize('dfs')} disabled={this.props.isVisualizing} href="">Depth First Search</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link onClick={() => this.props.clearBoard()} disabled={this.props.isVisualizing} href="">Clear Board</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        );
    }
};

export default Header;
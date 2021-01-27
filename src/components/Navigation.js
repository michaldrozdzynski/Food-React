import React from 'react'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'

function Navigation(props) {

    const navSection = props.auth ? (
      <Nav>
        <Nav.Link href="/logout">Sign out</Nav.Link>
      </Nav>
    ) : (
      <Nav>
        <Nav.Link href="/login">Sign in</Nav.Link>
        <Nav.Link href="/register">Sign up</Nav.Link>
      </Nav>
    )

    return (   
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Your Recipe</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/foodrecipe">Find Recipe</Nav.Link>
            <Nav.Link href="/foodporn">Foodporn</Nav.Link>
          </Nav>
          {navSection}
        </Navbar.Collapse>
      </Navbar>
    )
}

export default Navigation
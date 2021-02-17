import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'

function Navigation(props) {

  console.log(props.user_name)
    const navSection = props.auth ? (
      <Nav>
        <Nav.Link href={`/user/${props.user_id}`}>{props.user_name}</Nav.Link>
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
            {props.auth ? <Nav.Link href="/foodrecipe/create">Create Recipe</Nav.Link> : null}
            {props.auth ? <Nav.Link href="/foodporn">Foodporn</Nav.Link> : null}
            {props.auth ? <Nav.Link href="/foodporn/create">Create Foodporn</Nav.Link> : null}
            
          </Nav>
          {navSection}
        </Navbar.Collapse>
      </Navbar>
    )
}

export default Navigation
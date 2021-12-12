import React from 'react'
import { Container, Navbar,Nav, NavDropdown} from 'react-bootstrap'
import { Link } from 'react-router-dom'
const NavBar = () => {
    return (

        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <Link to="/" className="nav-link">Inicio</Link>
                    <Link to="/usuarios" className="nav-link">Usuarios</Link>
                    <Link to="/gimnasios" className="nav-link">Gimnasios</Link>    


                    
                    <NavDropdown title="Link" id="navbarScrollingDropdown">
                    <NavDropdown.Item href="/informacion">Información</NavDropdown.Item>
                    <NavDropdown.Item href="/nosotros">Nosotros</NavDropdown.Item>
                    <NavDropdown.Item> Salir</NavDropdown.Item>
                    
                    </NavDropdown>
                    
                </Nav>
                
                </Navbar.Collapse>
            </Container>
    </Navbar>




        /* <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
          <Link to="/inicio" className="btn btn-dark">Inicio</Link> 
          <Link to="/usuarios" className="btn btn-dark">Usuarios</Link>
          <Link to="/gimnasios" className="btn btn-dark">Gimnasios</Link>    
          <Link to="/informacion" className="btn btn-dark">Información</Link>  
        </div> */
    )
}

export default NavBar

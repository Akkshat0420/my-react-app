import React from 'react';
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Button,
  Form,
  FormControl,
 
} from 'react-bootstrap';

import './navbar.css'; // Custom CSS for additional styles

const FixYantraNavbar = () => {
  
 

  return (
    <Navbar
      bg="black"
      expand="lg"
      className="py-3 shadow-sm"
      style={{
        fontFamily: 'Roboto, sans-serif',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
      }}
    >
      <Container fluid>
        {/* Logo and Brand Name */}
        <Navbar.Brand href="/" className="d-flex align-items-center">
          
          <span style={{ color: 'white', fontSize: '1.7rem',marginRight:'20px',marginLeft:'30%'  }}>FixYantra</span>
        </Navbar.Brand>


        <Form
            className="d-flex position-relative"
            
            style={{
              flexGrow: 1,
              Width: '900px',
              marginLeft: '120px',
             
            }}
          >
            <FormControl
              type="search"
              placeholder="Search Subversion..."
              className="me-2 search-icon"
              aria-label="Search"
             
             
              style={{
                
                borderRadius: '4px',
                border: '1px solid #ccc',
                width: '100%',
              }}
            />
            {/* Suggestions Dropdown */}
           
           
          </Form>


          <Button
            variant="outline-dark"
            style={{
              
              marginRight:'100px',
              borderColor: 'orange',
              color: 'orange',
              padding: '0 20px',
              borderRadius: '4px',
              fontSize: '1rem',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'orange';
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'orange';
              e.target.style.color = 'black';
            }}
          >
            Login
          </Button>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto align-items-center">
            {/* Dropdown for Services */}
            <NavDropdown title="Kanpur" id="services-dropdown"  style={{fontFamily:'sans-serif',fontSize:'1rem',borderBlock:'0.8rem',borderBlockColor:'white'}}>
              <NavDropdown.Item href="/repair">Repair</NavDropdown.Item>
              <NavDropdown.Item href="/buy">Buy</NavDropdown.Item>
              <NavDropdown.Item href="/sell">Sell</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/contact">Contact Us</NavDropdown.Item>
            </NavDropdown>

            {/* About Us and Other Links */}
           
          </Nav>

          {/* Search Bar */}
          

          {/* Login Button */}
        
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default FixYantraNavbar;

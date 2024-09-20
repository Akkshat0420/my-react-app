import React from 'react';
import { Navbar, Nav, NavDropdown, Container, Form, FormControl, Button } from 'react-bootstrap';
import './navbar.css';
import { FaSearch } from 'react-icons/fa'; // Custom CSS for additional styles
import { FaMapLocation } from 'react-icons/fa6';

const FixYantraNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
      <Container>
        {/* Logo */}
        <Navbar.Brand href="/">
          <img
            src="/logo.png" // Replace with your logo path
            alt="Cashify Logo"
            className="d-inline-block align-top logo"
          />
        </Navbar.Brand>
        <Form className="d-flex mx-auto search-bar">
            <div className="search-input-wrapper " style={{marginBottom:'0rem'}}>
              <FormControl
                type="search"
                placeholder="Search for services, phones, etc."
                className="search-input"
                aria-label="Search"
                style={{ paddingLeft: '2rem' }}
              />
              <FaSearch className="search-icon" />
            </div>
          </Form>

        {/* Navbar Toggler for mobile view */}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          
          {/* Center Links */}
          
          
          {/* Search Bar */}
          
          {/* Right Side (Account Options) */}
          <Nav>
          <Button variant="outline-light" className='btn btn-secondary'  style={{ height:'40px',width:'60px', marginTop: '10px',marginLeft:'1rem' }}>Login</Button>
            <FaMapLocation />
            <NavDropdown style={{padding:'10px',marginLeft:'40px'}} title="Kanpur" id="nav-dropdown">
              <NavDropdown.Item href="/services">Services</NavDropdown.Item>
              <NavDropdown.Item href="/contact">Contact Us</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default FixYantraNavbar;

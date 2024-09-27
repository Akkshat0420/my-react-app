import React from 'react';
import { Navbar, Nav, NavDropdown, Button, Form, FormControl, Container } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa'; // Import search icon from react-icons or use FontAwesome icons
import './navbar.css'; // Custom CSS for additional styles

const FixYantraNavbar = () => {
  return (
    <Navbar
      bg="dark" // Use a darker background for a more professional look
      expand="lg"
      className="py-3 shadow-sm"
      style={{
        fontFamily: 'Roboto, sans-serif',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)', // Light border for a sleek finish
        width: '100%', // Full width
      }}
    >
      <Container fluid>
        {/* Logo and Brand Name */}
        <Navbar.Brand
          href="/"
          className="d-flex align-items-center"
          style={{
            color: 'orange',
            fontSize: '1.8rem',
            fontWeight: 'bold', // Make the brand name stand out
            flexGrow: 1,
            letterSpacing: '0.05rem', // Slight letter spacing for a modern touch
          }}
        >
          FixYantra
        </Navbar.Brand>

        {/* Search Form with Icon */}
        <Form
          className="d-flex align-items-center position-relative"
          style={{
            flexGrow: 3, // Takes up more space
            marginLeft: '30px', // Adjust spacing
            marginRight: '20px',
          }}
        >
          {/* Search Icon */}
          <span
            className="position-absolute"
            style={{
              left: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#bbb', // Subtle gray color for the search icon
            }}
          >
            <FaSearch />
          </span>

          {/* Search Bar */}
          <FormControl
            type="search"
            placeholder="Search Subversion..."
            className="pl-5"
            aria-label="Search"
            style={{
              paddingLeft: '45px', // Padding for the search icon
              borderRadius: '50px', // Rounded search bar
              border: 'none', // Clean, borderless style
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
              width: '100%', // Full width for the search bar
              height: '42px', // Increase height for better accessibility
            }}
          />
        </Form>

        {/* Login Button */}
        <Button
          variant="outline-warning" // Orange color for the button (bootstrap variant)
          style={{
            padding: '0 30px',
            borderRadius: '50px', // Rounded button
            fontSize: '1rem',
            fontWeight: 'bold',
            transition: 'all 0.3s ease', // Smooth transition for hover effects
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'orange';
            e.target.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = 'orange';
          }}
        >
          Login
        </Button>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-3" />
        <Navbar.Collapse id="basic-navbar-nav" style={{ flexGrow: 1 }}>
          <Nav className="ms-auto align-items-center">
            {/* Dropdown for Services */}
            <NavDropdown
              title="Kanpur"
              id="services-dropdown"
              style={{
                color: '#fff',
                fontFamily: 'sans-serif',
                fontSize: '1rem',
              }}
              menuVariant="dark" // Dark variant for dropdown to match the navbar
            >
              <NavDropdown.Item href="/repair">Repair</NavDropdown.Item>
              <NavDropdown.Item href="/buy">Buy</NavDropdown.Item>
              <NavDropdown.Item href="/sell">Sell</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/contact">Contact Us</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default FixYantraNavbar;

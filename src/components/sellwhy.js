import React from 'react';
import { Container, Row, Col,  Card } from 'react-bootstrap';

const SellWhy = () => {
  return (
    <Container fluid className="p-4">
      {/* Category Buttons Section */}
     

      {/* Main Image and "Why Sell With Us" Section */}
      <Row className="align-items-center">
        <Col md={6}>
          <Card className="border-0">
            <Card.Img src="https://tse3.mm.bing.net/th?id=OIG2.6AUNQSKAc.modUXYHHjh&w=270&h=270&c=6&r=0&o=5&pid=ImgGn.png" />
          </Card>
        </Col>
        <Col md={6}>
          <h2>Why Sell With Us</h2>
          <ul className="list-unstyled">
            <li className="mb-3">
              <i className="bi bi-check-circle me-2"></i>
              <strong>Friendly Customer Service</strong><br />
              <small>Our Team is always ready to assist you with a smile.</small>
            </li>
            <li className="mb-3">
              <i className="bi bi-check-circle me-2"></i>
              <strong>Transparent Pricing</strong><br />
              <small>We believe in fair and transparent pricing for all our products and services.</small>
            </li>
            <li className="mb-3">
              <i className="bi bi-check-circle me-2"></i>
              <strong>Quick & Hassle-Free</strong><br />
              <small>Get mobile care in a click at your home or office.</small>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default SellWhy;

import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const WarrantyClaimProcess = () => {
  return (
    <Container className="text-center my-5">
      <h2 className="text-warning">Our Warranty Claim Process</h2>
      <p>Experience Simplified Mobile Restoration Without Making them Too Hard on Your Wallet</p>
      
      <Row className="g-4">
        <Col md={3}>
          <Card className="shadow-sm border-warning">
            <Card.Body>
              <Card.Title><i className="bi bi-calendar3"></i> Register a Claim</Card.Title>
              <Card.Text>
                At Toll Free Number : 1800 258 5829 <br />
                Register Your Claim & Book Door-Step Pick up
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="shadow-sm border-warning">
            <Card.Body>
              <Card.Title><i className="bi bi-box-seam"></i> Hassle Free Pickup</Card.Title>
              <Card.Text>
                Get Doorstep Pickup by Our Warranty Partner
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="shadow-sm border-warning">
            <Card.Body>
              <Card.Title><i className="bi bi-clock-history"></i> Time Limit</Card.Title>
              <Card.Text>
                Make sure the device is under the specified warranty time.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="shadow-sm border-warning">
            <Card.Body>
              <Card.Title><i className="bi bi-truck"></i> Warranty Terms</Card.Title>
              <Card.Text>
                Warranty cannot be claimed for physical and liquid damage.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default WarrantyClaimProcess;

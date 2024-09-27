import React from 'react';
import { Container, Row, Col,  Card } from 'react-bootstrap';

const SellPage = () => {
  return (
    <div>
      {/* Category Buttons Section */}
     
      {/* Heading Section */}
      <Container className="text-center my-5">
        <h2>Sell Your Gadget in 3 Steps</h2>
        <p>
          We try to make things easy and simple for you, so you don’t face any issue while selling your device.
          Just follow these three steps and sell your device effortlessly.
        </p>
      </Container>

      {/* 3 Steps Section */}
      <Container className="text-center my-5">
        <Row>
          <Col>
            <Card className="text-center">
              <Card.Body>
                <img src="/icons/check-price-icon.png" alt="Check Price" className="mb-2" style={{ width: '50px' }} />
                <Card.Title>Check Price</Card.Title>
                <Card.Text>
                  Select your model, give proper information about it and our AI will determine the best price.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="text-center">
              <Card.Body>
                <img src="/icons/schedule-pickup-icon.png" alt="Schedule Pickup" className="mb-2" style={{ width: '50px' }} />
                <Card.Title>Schedule Pickup</Card.Title>
                <Card.Text>
                  Schedule a free pickup from your home or workplace at a time that’s convenient for you.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="text-center">
              <Card.Body>
                <img src="/icons/get-paid-icon.png" alt="Get Paid Instantly" className="mb-2" style={{ width: '50px' }} />
                <Card.Title>Get Paid Instantly</Card.Title>
                <Card.Text>
                  Get paid instantly and securely as soon as our executive picks up your device.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SellPage;

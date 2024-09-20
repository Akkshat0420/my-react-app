import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';

const DownloadAppSection = () => {
  return (
    <Container fluid className="p-5 bg-light">
      {/* Download App Section */}
      <Row className="align-items-center text-center text-md-start">
        <Col md={6} className="mb-4 mb-md-0">
          <Image src="https://tse2.mm.bing.net/th?id=OIG1.6qw76jik0QZj2zjJKK4_&w=270&h=270&c=6&r=0&o=5&pid=ImgGn.png" alt="Phone App" fluid />
        </Col>
        <Col md={6}>
          <h2>Download the App</h2>
          <p>Get Exclusive Offers and Easy User Interface</p>
          <p><strong>Download From</strong></p>
          <div className="d-flex justify-content-center justify-content-md-start">
            <Button variant="light" className="me-3 border">
              <img
                src="https://ovantica.com/assets/images/Images/play_store.png"
                alt="Google Play Store"
                width="150"
              />
            </Button>
            <Button variant="light" className="border">
              <img
                src="https://ovantica.com/assets/images/Images/app_store.png"
                alt="Apple App Store"
                width="150"
              />
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DownloadAppSection;

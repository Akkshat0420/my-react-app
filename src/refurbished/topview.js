import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

function Top() {
  return (
    <Container fluid className="p-3">
      <Row>
        <Col>
          <img
            src="path-to-laptop-image"
            alt="Laptop"
            className="img-fluid w-100"
          />
        </Col>
      </Row>
      
      <Row className="text-center my-4">
  <Col>
    <Button variant="outline-primary">
      <img src="https://cdn-icons-png.flaticon.com/128/186/186239.png" alt="Phone" className="me-2" style={{ width: '40px', verticalAlign: 'middle' }} />
      Buy Phone
    </Button>
  </Col>
  <Col>
    <Button variant="outline-primary">
      <img src="https://cdn-icons-png.flaticon.com/128/2704/2704414.png" alt="Laptop" className="me-2" style={{ width: '40px', verticalAlign: 'middle' }} />
      Buy Laptop
    </Button>
  </Col>
  <Col>
    <Button variant="outline-primary">
      <img src="https://cdn-icons-png.flaticon.com/128/644/644425.png" alt="Tablet" className="me-2" style={{ width: '40px', verticalAlign: 'middle' }} />
      Buy Tablet
    </Button>
  </Col>
 
  <Col>
    <Button variant="outline-primary">
      <img src="https://cdn-icons-png.flaticon.com/128/9383/9383251.png" alt="Sell Phone" className="me-2" style={{ width: '40px', verticalAlign: 'middle' }} />
      Sell Phone
    </Button>
  </Col>
</Row>


      <Row>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Img variant="top"  className="img-fluid card-img-custom" src="https://ovantica.com/assets/images/Banners/1.3.jpg" />
              <Card.Text>Cash on Delivery</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Img variant="top"  className="img-fluid card-img-custom" src="https://ovantica.com/assets/images/Banners/1.2.jpg" />
              <Card.Text>Up to 1 Year Warranty</Card.Text>
            </Card.Body>
          </Card>
        </Col>
     

     
        <Col md={4}>
          <Card className="text-center">
            <Card.Img variant="top"  className="img-fluid card-img-custom" src="https://ovantica.com/assets/images/Banners/1.jpg" alt="Unboxed Mobiles" />
            <Card.Body>
              <Card.Text>UnBoxed Mobiles, like new at 30% off!</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="text-center my-4">
  <Col>
    <div>
      <img src="https://cdn-icons-png.flaticon.com/128/9093/9093071.png" alt="Replacement" className="img-fluid mb-2" style={{ width: '60px' }} />
      <div>7 Days Replacement</div>
    </div>
  </Col>
  <Col>
    <div>
      <img src="https://cdn-icons-png.flaticon.com/128/7875/7875821.png" alt="Cash on Delivery" className="img-fluid mb-2" style={{ width: '60px' }} />
      <div>Cash on Delivery</div>
    </div>
  </Col>
  <Col>
    <div>
      <img src="https://cdn-icons-png.flaticon.com/128/2116/2116339.png" alt="Easy EMI" className="img-fluid mb-2" style={{ width: '60px' }} />
      <div>Easy EMI</div>
    </div>
  </Col>
  <Col>
    <div>
      <img src="https://cdn-icons-png.flaticon.com/128/1813/1813870.png" alt="Safe Shopping" className="img-fluid mb-2" style={{ width: '60px' }} />
      <div>Safe Shopping</div>
    </div>
  </Col>
</Row>

    </Container>
  );
}

export default Top;
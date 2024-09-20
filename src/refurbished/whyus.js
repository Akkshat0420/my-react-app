import React from 'react';
import { Accordion, Container } from 'react-bootstrap';

const FAQ = () => {
  return (
    <Container className="my-5">
      <h2 className="text-warning mb-4">More About Us</h2>
      
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>1. What is FixYantra?</Accordion.Header>
          <Accordion.Body>
            FixYantra is a re-commerce company. Founded in July 2015, we specialize in offering an innovative platform for buying and selling high-end renewed smartphones and other electronic gadgets. With a mission to "Make Luxury Affordable," FixYantra focuses on providing unboxed, renewed, and refurbished high-end products like smartphones and laptops at accessible prices, catering to budget-conscious consumers across India. Its commitment to quality, affordability, and customer empowerment makes it a trusted name in re-commerce.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>2. What Devices do I can Buy From FixYantra?</Accordion.Header>
          <Accordion.Body>
            You can buy renewed smartphones, laptops, tablets, and other electronic gadgets from FixYantra. All of these are carefully inspected, refurbished, and sold at affordable prices.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>3. How many days of Warranty do you offer?</Accordion.Header>
          <Accordion.Body>
            We offer a standard warranty of up to 6 months on all renewed products. The specific warranty duration depends on the device and its condition at the time of purchase.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>4. Do you offer any Replacement Policy?</Accordion.Header>
          <Accordion.Body>
            Yes, FixYantra provides a replacement policy where you can request a replacement for any faulty product within 7 days of purchase, provided the issue meets our replacement criteria.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>5. Do you Offer COD? Is there any extra charge for this?</Accordion.Header>
          <Accordion.Body>
            Yes, we offer Cash on Delivery (COD) service. An additional small fee may be applied for COD orders depending on the delivery location.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="5">
          <Accordion.Header>6. Why Purchase a Refurbished or Renewed Gadget?</Accordion.Header>
          <Accordion.Body>
            Purchasing a refurbished or renewed gadget allows you to get high-end electronic devices at significantly lower prices while ensuring quality and reliability. It's an eco-friendly way to buy electronics and ensures that you don't break the bank while getting the devices you need.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default FAQ;

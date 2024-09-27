import React from 'react';

const About = () => {
  return (
    <div className="container py-5" style={{ maxWidth: '1200px' }}>
      <h1 className="text-center mb-4">About Fixyantra</h1>

      <div className="row">
        <div className="col-12">
          <p className="lead text-justify">
            At <strong>Fixyantra</strong>, we are committed to providing reliable, efficient, and expert mobile repair services as well as promoting sustainable solutions through smartphone refurbishment. Our mission is to ensure that your device functions optimally, whether it’s a simple repair or giving a second life to your smartphone through our refurbishment program.
          </p>

          <h2 className="h4 mt-4">Our Mission</h2>
          <p className="text-justify">
            At Fixyantra, our mission is to simplify the repair process and make it hassle-free for everyone. We believe in sustainability, transparency, affordability, and trust. With our refurbishment services, we aim to reduce e-waste by reviving older devices, thus minimizing the environmental impact and promoting a circular economy.
          </p>

          <h2 className="h4 mt-4">Why Choose Us?</h2>
          <ul className="list-unstyled">
            <li className="mb-2"><strong>Skilled Technicians:</strong> Our experts have years of experience in mobile device repair and refurbishment.</li>
            <li className="mb-2"><strong>Quality Assurance:</strong> We use only high-quality parts and ensure that refurbished devices meet strict performance and safety standards.</li>
            <li className="mb-2"><strong>Fast Turnaround:</strong> Whether it's repair or refurbishment, we deliver quick and reliable services.</li>
            <li className="mb-2"><strong>Affordable Pricing:</strong> Our competitive pricing ensures that you receive top-tier services without breaking the bank.</li>
            <li className="mb-2"><strong>Environmental Impact:</strong> Our refurbishment process helps reduce e-waste, contributing to a greener planet.</li>
            <li className="mb-2"><strong>Customer Support:</strong> Our dedicated support team is available to assist with any inquiries.</li>
          </ul>

          <h2 className="h4 mt-4">Our Refurbishment Process</h2>
          <p className="text-justify">
            We believe in extending the life cycle of smartphones. Through our comprehensive refurbishment process, we inspect, repair, and replace any defective parts, ensuring that each refurbished device operates like new. By choosing refurbished devices, customers can enjoy the latest technology at affordable prices, while also reducing their carbon footprint.
          </p>

          <h2 className="h4 mt-4">How We Help Reduce E-Waste</h2>
          <p className="text-justify">
            The average smartphone has a lifespan of just 2-3 years, but many devices are disposed of before they reach their full potential. At Fixyantra, we tackle this issue by refurbishing old devices, reducing the need for new production, and keeping more electronics out of landfills. Our efforts contribute to decreasing e-waste and fostering environmental sustainability.
          </p>

          <h2 className="h4 mt-4">What We Offer</h2>
          <ul className="list-unstyled">
            <li className="mb-2">Mobile Screen Repairs</li>
            <li className="mb-2">Battery Replacement</li>
            <li className="mb-2">Software and Diagnostics Solutions</li>
            <li className="mb-2">Water Damage Repair</li>
            <li className="mb-2">Smartphone Refurbishment Services</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;

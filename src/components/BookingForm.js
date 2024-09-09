import React from 'react';

const About = () => {
  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">About Fixyantra</h1>
      
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <p className="lead">
            At <strong>Fixyantra</strong>, we are dedicated to providing reliable, efficient, and expert mobile repair services. Our team of highly skilled technicians works diligently to ensure your device is back in perfect working condition in the shortest possible time. Whether it's a cracked screen, battery issues, or any other technical problem, we have the tools and expertise to fix it.
          </p>

          <h2 className="h4 mt-4">Our Mission</h2>
          <p>
            Our mission is to simplify the repair process and make it hassle-free for everyone. We believe in transparency, affordability, and trust. At Fixyantra, we provide a platform where users can easily connect with certified technicians to get their mobile devices repaired quickly and affordably.
          </p>

          <h2 className="h4 mt-4">Why Choose Us?</h2>
          <ul className="list-unstyled">
            <li><strong>Skilled Technicians:</strong> Our experts have years of experience in mobile device repair.</li>
            <li><strong>Quality Assurance:</strong> We use only high-quality parts to ensure that your device works as good as new.</li>
            <li><strong>Fast Turnaround:</strong> We offer quick and reliable repair services.</li>
            <li><strong>Affordable Pricing:</strong> We offer competitive pricing without compromising on quality.</li>
            <li><strong>Customer Support:</strong> Our support team is always ready to help with any questions or concerns.</li>
          </ul>

          <h2 className="h4 mt-4">What We Offer</h2>
          <ul className="list-unstyled">
            <li>Mobile Screen Repairs</li>
            <li>Battery Replacement</li>
            <li>Software Issues</li>
            <li>Water Damage</li>
            <li>Diagnostics</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;

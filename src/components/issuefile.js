import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './issue.css'; // Import custom CSS for horizontal scrolling

const Issue = () => {
  const navigate = useNavigate();

  // Hardcoded issue data
  const issues = [
    { issueName: 'Battery', imageUrl: 'https://cdn-icons-png.flaticon.com/128/2333/2333689.png' },
    { issueName: 'Mic', imageUrl: 'https://cdn-icons-png.flaticon.com/128/2061/2061145.png' },
    { issueName: 'Issue 3', imageUrl: '/path/to/image3.jpg' },
    { issueName: 'Issue 4', imageUrl: '/path/to/image4.jpg' },
    { issueName: 'Issue 5', imageUrl: '/path/to/image5.jpg' },
    // Add more issues as needed
  ];

  const handleCardClick = (issue) => {
    navigate('/brands');
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4 text-primary">Our Repair Services</h2>
      <div className="issues-container">
        {issues.map(issue => (
          <div
            key={issue.issueName}
            className="issue-card"
            onClick={() => handleCardClick(issue)}
            style={{ cursor: 'pointer' }}
          >
            <div className="card h-100 shadow-lg border-0 text-center" style={{ borderRadius: '15px', overflow: 'hidden' }}>
              <img src={issue.imageUrl} alt={issue.issueName} className="card-img-top" style={{ width: '80px', height: '80px', margin: '0 auto', objectFit: 'contain' }}  />
              <div className="card-body p-3">
                <h3 className="card-title fw-bold text-dark">{issue.issueName}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Issue;

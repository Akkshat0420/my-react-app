
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { auth } from './firebase';
import {  Row, Col, Button } from 'react-bootstrap';
import { collection, getDocs, query, where,addDoc } from 'firebase/firestore';
import Login from './login';
//import Signup from './signup';
import {  Route,   useParams, Routes, useNavigate, BrowserRouter } from 'react-router-dom';
import Signup from './signup';
import HomePage from './homefile';
import 'bootstrap/dist/css/bootstrap.min.css';
//import AddRefurbishedItem from '../refurbished/regurbihedentry';
import AllBrands from '../refurbished/firstrefurbish';
import RefurbishedModels from '../refurbished/secondrefurbish';
//import RefurbishedDetail from '../refurbished/refurbishedetail';
import ModelDetailPage from '../refurbished/refurbishedetail';
import ProfilePage from './Header';
import CartPage from './cart';
import OrderPage from './order';
import SellPage from './sellpag';
import SellWhy from './sellwhy';
import DownloadAppSection from './dowlodapp';
//import SellRequest from './sellService';
//import Navbar from './navfile';

const RepairRequest = () => {
  const [evaluation, setEvaluation] = useState({
    callsWorking: null,
    touchscreenWorking: null,
    screenConditions: null,
    // Add other fields as necessary
  });

  const updateEvaluation = (newEvaluation) => {
    setEvaluation((prev) => ({
      ...prev,
      ...newEvaluation,
    }));
  };
  return (
    <BrowserRouter>
      
      <Routes>
      <Route  path="/" element={<HomePage/>} />
        <Route  path="/brands" element={<CompaniesPage/>} />
        <Route path="/versions/:companyName" element={<VersionsPage />} />
        <Route path="/subversions/:companyName/:versionName" element={<SubVersionsPage />} />
        <Route path="/issues/:companyName/:versionName/:subVersionName" element={<IssuesPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/sell" element={<Companies/>} />
        <Route path="/refurbished" element={<AllBrands/>} />
        <Route path="/models/:category/:brand" element={<RefurbishedModels/>} />
        <Route path="/versions1/:companyName" element={<Versions />} />
        <Route path="/subversions2/:companyName/:versionName" element={<SubVersions />} />
        <Route path="/refurbished/:category/:brand/:modelId" element={<ModelDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/storage/:subVersionName" element={<StoragePage />} />
        <Route 
          path="/evaluation1/:subVersionName/:storage" 
          element={
            <div className="col">
              <EvaluationSummary evaluation={evaluation} />
              <EvaluationPageOne updateEvaluation={updateEvaluation} />
            </div>
          } 
        />
        {/* Add the second evaluation page as well */}
        <Route 
          path="/evaluation2" 
          element={
            <div className="col">
              <EvaluationSummary evaluation={evaluation} />
              <EvaluationPageTwo updateEvaluation={updateEvaluation} />
            </div>
          }  />
      </Routes>
      
    </BrowserRouter>
    
  );
};

const CompaniesPage = () => {
  const [companies, setCompanies] = useState([]);

  const history = useNavigate();

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    const companies = await fetchCompanies();
    setCompanies(companies);
  };

  const handleCompanyClick = (company) => {

    history(`/versions/${company.name}`);
  };

  return (
    <div className="container text-center py-5">
    {/* Main Heading */}
    <img src="Picsart-1.jpg" alt="" className="object-cover rounded" />
    <h1 className="mb-4 display-4 fw-bold">Repair Request</h1>
  
    {/* Sub-heading */}
    <h2 className="mb-5 text-primary">Choose Brand</h2>
  
    {/* Company Cards */}
    <div className="row">
      {companies.map(company => (
        <div
          key={company.id}
          className="col-4 col-md-3 col-lg-2 mb-2" // Reduced column size on medium screens
          onClick={() => handleCompanyClick(company)}
        >
          <div
            className="card shadow-lg"
            style={{
              cursor: 'pointer',
              borderRadius: '10px',
              width:'100px',
              height: '95px', // Reduced card height
              padding: '5px' // Added padding for spacing
            }}
          >
            <img
              src={company.iconUrl}
              alt={company.name}
              className="card-img-top p-1"
              style={{
                borderRadius: '8px',
                height: '40px', // Reduced image height
                objectFit: 'contain'
              }}
            />
            <div className="card-body p-2">
              <h6 className="card-title text-dark">{company.name}</h6> {/* Reduced font size */}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  
  );
};

const VersionsPage = () => {
  const [versions, setVersions] = useState([]);
  const { companyName } = useParams();
  const history = useNavigate();

  useEffect(() => {
    loadVersions(companyName);
  }, [companyName]);

  const loadVersions = async (companyName) => {
    const versions = await fetchVersions(companyName);
    setVersions(versions);
  };

  const handleVersionClick = (version) => {
    history(`/subversions/${companyName}/${version.versionName}`);
  };

  return (
    <div>
    <div className="container py-4">
    {/* Title */}
    <h2 className="text-start mb-4">Versions for {companyName}</h2>
    
    {/* Version Cards */}
    <div className="row">
      {versions.map(version => (
        <div 
          key={version.id} 
          className="col-6 col-md-4 col-lg-2 mb-3" 
          onClick={() => handleVersionClick(version)}
        >
          <div className="card  shadow-sm text-center"  style={{
              cursor: 'pointer',
              borderRadius: '10px',
              width:'100px',
              height: '95px', // Reduced card height
              padding: '5px' // Added padding for spacing
            }}>
            <img 
              src={version.description} 
              alt={version.versionName} 
              className="card-img-top p-2" 
              style={{    borderRadius: '8px',
                height: '40px', // Reduced image height
                objectFit: 'contain' }} 
            />
            <div className="card-body p-2">
              <p className="card-title fw-bold text-dark">{version.versionName}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  </div>
  );
};

const SubVersionsPage = () => {
  const [subVersions, setSubVersions] = useState([]);
  const { versionName } = useParams();
  const history = useNavigate();

  useEffect(() => {
    loadSubVersions(versionName);
  }, [versionName]);

  const loadSubVersions = async (versionName) => {
    const subVersions = await fetchSubVersions(versionName);

    setSubVersions(subVersions);
  };

  const handleSubVersionClick = (subVersion,companyName,versionName) => {
    history(`/issues/${companyName}/${versionName}/${subVersion.subVersionName}`);
  };

  return (
    
    <div className="container py-4">
    {/* Subheading */}
    <h2 className="text-center mb-4">SubVersions for {versionName}</h2>
    
    {/* SubVersion Cards */}
    <div className="row">
      {subVersions.map(subVersion => (
        <div 
          key={subVersion.id} 
          className="col-6 col-md-4 col-lg-2 mb-4" 
          onClick={() => handleSubVersionClick(subVersion)}
          style={{ cursor: 'pointer' }}
        >
          <div className="card  shadow-sm text-center" style={{ cursor: 'pointer',
              borderRadius: '10px',
              width:'100px',
              height: '95px', // Reduced card height
              padding: '5px' }}>
            <img 
              src={subVersion.description} 
              alt={subVersion.subVersionName} 
              className="card-img-top p-3" 
              style={{   borderRadius: '8px',
                height: '80px', // Reduced image height
                objectFit: 'contain' }} 
            />
            <div className="card-body p-2">
              <p className="card-title fw-bold text-dark" style={{ fontSize: '0.9rem' }}>{subVersion.subVersionName}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};
  const IssuesPage = () => {
    const [issues, setIssues] = useState([]);
    // To get the subversion name
    const { companyName } = useParams(); // To get the company name
    const { versionName } = useParams();
    const { subVersionName } = useParams();
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [description, setDescription] = useState('');
    const history=useNavigate();
    useEffect(() => {
      loadIssues(subVersionName);
    }, [subVersionName]);
  
    const loadIssues = async (subVersionName) => {
      const issues = await fetchIssues(subVersionName);

      setIssues(issues);
    };
    const handleIssueClick = (issue) => {
      setSelectedIssue(issue);
       // Update the selected issue
    };
    const handleInputChange = (event) => {
      setDescription(event.target.value);
    };
  
    // Handle form submission
    const handleFormSubmit = () => {
      // Your submit logic here, including handling the `description` value
      handleSubmit(description);
    };
    const handleSubmit = async () => {
      const user = auth.currentUser; // Check if the user is authenticated
      if (user) {
        if (selectedIssue) {
          try {
            await addDoc(collection(db, 'repair_request1'), {
              brand:companyName,
              version:versionName,
              subVersion:subVersionName,
              issueName: selectedIssue.issueName,
              description: selectedIssue.description,
              status:'pending',
              createdAt: new Date(),
              descri:description
            
            });
            setSuccessMessage('Your repair request has been added!');
            setErrorMessage('');
            setTimeout(() => {
              setSuccessMessage('');
              history('/'); // Redirect to the home page after submission
            }, 2000);
          } catch (error) {
            console.error('Error adding repair request: ', error);
            setErrorMessage('Failed to add repair request.');
          }
        }
      } else {
        // Redirect to login page if user is not authenticated
        history('/login');
      }
    };
    return (
      <div className="container py-4">
      {/* Heading */}
      <h2 className="text-center mb-4 text-primary">Issues for {subVersionName}</h2>
      
      {/* Issue Cards */}
      <div className="row">
        {issues.map(issue => (
          <div 
            key={issue.id} 
            className="col-4 col-md-6 col-lg-4 mb-3"
            onClick={() => handleIssueClick(issue)}
            
            style={{ cursor: 'pointer',borderColor:'orange' }}
          >
            <div className="card  shadow-lg border-0 text-center" style={{cursor: 'pointer',
              borderRadius: '10px',
              width:'100px',
              height: '95px', // Reduced card height
              padding: '5px' }}>
              <div className="card-body p-4">
                <h3 className="card-title fw-bold  mb-3" style={{ fontSize: '0.8rem' }}>{issue.issueName}</h3>
                <p className="card-text text-muted" style={{ height: '40px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{issue.description}</p>
              </div>
            </div>
          </div>
        ))}
        <div >
        <textarea 
            className="form-control mb-3"
            rows="4"
            placeholder="Enter description here..."
            value={description}
            onChange={handleInputChange}
            style={{ resize: 'none', maxWidth: '500px', margin: '0 auto' }}
          />
        </div>
      </div>

      {/* Text Area and Submit Button */}
      {selectedIssue && (
        <div className="text-center mt-4">
         
          <button 
            onClick={handleFormSubmit} 
            className="btn btn-success btn-lg px-4 py-2"
            style={{ borderRadius: '25px' }}
          >
            Submit Repair Request
          </button>
          {successMessage && <p className="text-success mt-3">{successMessage}</p>}
          {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
        </div>
      )}
    </div>
  );
    
  };
  
  // Fetch functions for companies, versions, subversions, and issues
  const Companies = () => {
    const [companies, setCompanies] = useState([]);
  
    const history = useNavigate();
  
    useEffect(() => {
      loadCompanies();
    }, []);
  
    const loadCompanies = async () => {
      const companies = await fetchCompanies();
      setCompanies(companies);
    };
  
    const handleCompanyClick = (company) => {
  
      history(`/versions1/${company.name}`);
    };
  
    return (
      <div>
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
<SellPage/>
      <div className="container text-center py-5">
        {/* Main Heading */}
        <h1 className="mb-4 display-4 fw-bold">Sell Your Phone</h1>
        
        {/* Sub-heading */}
        <h2 className="mb-5 text-primary">Select a Brand</h2>
        
        {/* Company Cards */}
        <div className="row">
          {companies.map(company => (
            <div 
              key={company.id} 
              className="col-6 col-md-4 col-lg-2 mb-3" 
              onClick={() => handleCompanyClick(company)}
            >
              <div className="card  shadow-lg" style={{ cursor: 'pointer',
              borderRadius: '10px',
              width:'100px',
              height: '95px', // Reduced card height
              padding: '5px' }}>
                <img 
                  src={company.iconUrl} 
                  alt={company.name} 
                  className="card-img-top p-3" 
                  style={{ borderRadius: '10px', height: '100px', objectFit: 'contain' }} 
                  
                />
                <div className="card-body">
                  <h5 className="card-title text-dark">{company.name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
       
        <SellWhy/>
      </div>
      <DownloadAppSection/>
      </div>
    );
  };
  
  const Versions = () => {
    const [versions, setVersions] = useState([]);
    const { companyName } = useParams();
    const history = useNavigate();
  
    useEffect(() => {
      loadVersions(companyName);
    }, [companyName]);
  
    const loadVersions = async (companyName) => {
      const versions = await fetchVersions(companyName);
      setVersions(versions);
    };
  
    const handleVersionClick = (version) => {
      history(`/subversions2/${companyName}/${version.versionName}`);
    };
  
    return (
      <div className="container py-4">
      {/* Title */}
      <h2 className="text-start mb-4">Versions for {companyName}</h2>
      
      {/* Version Cards */}
      <div className="row">
        {versions.map(version => (
          <div 
            key={version.id} 
            className="col-6 col-md-4 col-lg-2 mb-3" 
            onClick={() => handleVersionClick(version)}
          >
            <div className="card h-100 shadow-sm text-center" style={{ cursor: 'pointer', borderRadius: '10px' }}>
              <img 
                src={version.description} 
                alt={version.versionName} 
                className="card-img-top p-2" 
                style={{  height: '150px', margin: '0 auto', objectFit: 'contain' }} 
              />
              <div className="card-body p-2">
                <p className="card-title fw-bold text-dark">{version.versionName}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
  };
  
  const SubVersions = () => {
    const [subVersions, setSubVersions] = useState([]);
    const {  versionName } = useParams();  // Get params from the URL
    const navigate = useNavigate(); // Hook to navigate between pages
  
    useEffect(() => {
      loadSubVersions(versionName);
    }, [versionName]);
  
    const loadSubVersions = async (versionName) => {
      try {
        const subversionsQuery = query(
          collection(db, 'subversions'),
          where('version', '==', versionName)
        );
        const snapshot = await getDocs(subversionsQuery);
        const subVersions = snapshot.docs.map(doc => ({
          id: doc.id,
          subVersionName: doc.data().subname,
          description: doc.data().versionUrl,
        }));
        setSubVersions(subVersions);
      } catch (error) {
        console.error("Error fetching subversions: ", error);
      }
    };
  
    const handleSubVersionClick = (subVersion) => {
      // Navigate to the storage page with the selected subversion's name
      navigate(`/storage/${subVersion.subVersionName}`);
    };
  
    return (
      <div className="container py-4">
        <h2 className="text-center mb-4">SubVersions for {versionName}</h2>
        <div className="row">
          {subVersions.map(subVersion => (
            <div 
              key={subVersion.id} 
              className="col-6 col-md-4 col-lg-2 mb-4" 
              onClick={() => handleSubVersionClick(subVersion)} // Navigate on click
              style={{ cursor: 'pointer' }}
            >
              <div className="card h-100 shadow-sm text-center" style={{ borderRadius: '10px' }}>
                <img 
                  src={subVersion.description} 
                  alt={subVersion.subVersionName} 
                  className="card-img-top p-3" 
                  style={{ width: '80px', height: '80px', margin: '0 auto', objectFit: 'contain' }} 
                />
                <div className="card-body p-2">
                  <p className="card-title fw-bold text-dark" style={{ fontSize: '0.9rem' }}>{subVersion.subVersionName}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  const StoragePage = () => {
    const { subVersionName } = useParams();
    const navigate = useNavigate();
  
    // Function to handle storage button click and navigate to evaluation page
    const handleStorageClick = (storage) => {
      navigate(`/evaluation1/${subVersionName}/${storage}`);
    };
  
    return (
      <div className="container text-center py-5">
        {/* Heading */}
        <h1 className="mb-4 display-4 fw-bold">Select Storage Option</h1>
        
        {/* Subheading with selected Subversion name */}
        <h2 className="mb-5 text-primary">Subversion: {subVersionName}</h2>
        
        {/* Storage Buttons */}
        <div className="row justify-content-center">
          <div className="col-6 col-md-4 mb-3">
            <button 
              className="btn btn-lg btn-outline-primary w-100 py-3" 
              onClick={() => handleStorageClick('storage1')}
            >
              Storage 1
            </button>
          </div>
          <div className="col-6 col-md-4">
            <button 
              className="btn btn-lg btn-outline-primary w-100 py-3" 
              onClick={() => handleStorageClick('storage2')}
            >
              Storage 2
            </button>
          </div>
        </div>
  
        {/* Description (optional) */}
        <p className="mt-5 text-muted">Select the appropriate storage option for your device to continue the evaluation process.</p>
      </div>
    );
  };
  function EvaluationPageOne({ updateEvaluation }) {
    const navigate = useNavigate();

    const [answers, setAnswers] = useState({
      callsWorking: null,
      touchscreenWorking: null,
      originalScreen: null,
      underWarranty: null,
      hasValidBill: null,
    });
  
    const handleInputChange = (question, value) => {
      setAnswers((prev) => ({
        ...prev,
        [question]: value,
      }));
    };
  
    const handleContinue = () => {
      updateEvaluation(answers);
      navigate('/evaluation2');
    };
  
    return (
      <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 py-5">
          <h3 className="mb-4">Tell us more about your device</h3>

          <div className="mb-4">
            <p>Are you able to make and receive calls?</p>
            <button
              className={`btn ${answers.callsWorking === true ? 'btn-success' : 'btn-outline-primary'} me-2`}
              onClick={() => handleInputChange('callsWorking', true)}
            >
              Yes
            </button>
            <button
              className={`btn ${answers.callsWorking === false ? 'btn-danger' : 'btn-outline-secondary'}`}
              onClick={() => handleInputChange('callsWorking', false)}
            >
              No
            </button>
          </div>

          <div className="mb-4">
            <p>Is your device's touchscreen working properly?</p>
            <button
              className={`btn ${answers.touchscreenWorking === true ? 'btn-success' : 'btn-outline-primary'} me-2`}
              onClick={() => handleInputChange('touchscreenWorking', true)}
            >
              Yes
            </button>
            <button
              className={`btn ${answers.touchscreenWorking === false ? 'btn-danger' : 'btn-outline-secondary'}`}
              onClick={() => handleInputChange('touchscreenWorking', false)}
            >
              No
            </button>
          </div>

          {/* Add more questions similarly */}

          <div className="mt-4">
            <button className="btn btn-primary w-100" onClick={handleContinue}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  }
  function EvaluationPageTwo({ updateEvaluation }) {
    const [screenConditions, setScreenConditions] = useState({
      broken: false,
      dent: false,
    });
  
    const handleCardClick = (condition) => {
      setScreenConditions((prevConditions) => ({
        ...prevConditions,
        [condition]: !prevConditions[condition], // Toggle selection
      }));
    };
  
    const handleContinue = () => {
      // Update the evaluation with the selected conditions
      updateEvaluation(screenConditions);
      console.log('Submit final evaluation with conditions:', screenConditions);
    };
  
    return (
      <div className="container-fluid">
        <div className="row">
          {/* Left column: Evaluation Summary (This will be included in the parent component like EvaluationBookPage) */}
          <div className="col-md-6 bg-light p-4 d-none d-md-block">
            {/* EvaluationSummary goes here in the parent component */}
          </div>
  
          {/* Right column: EvaluationPageTwo */}
          <div className="col-md-6 p-4 d-flex flex-column justify-content-center" style={{ minHeight: '100vh' }}>
            <h3 className="mb-4 text-center">Physical Condition of Your Device</h3>
  
            {/* Cards for selecting the condition */}
            <div className="card mb-3" onClick={() => handleCardClick('broken')}>
              <div className={`card-body text-center ${screenConditions.broken ? 'bg-primary text-white' : ''}`}>
                Broken/Scratch on screen
              </div>
            </div>
  
            <div className="card" onClick={() => handleCardClick('dent')}>
              <div className={`card-body text-center ${screenConditions.dent ? 'bg-primary text-white' : ''}`}>
                Scratch/Dent on device body
              </div>
            </div>
  
            {/* Continue button */}
            <div className="text-center mt-4">
              <button className="btn btn-primary btn-lg" onClick={handleContinue}>
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  function EvaluationSummary({ evaluation }) {
   
    return (
      <div className="container h-100 bg-light border-end">
      <div className="row align-items-center h-100">
        <div className="col-md-6 mx-auto">
          <h3 className="mb-4">Evaluation Summary</h3>
          <ul className="list-group">
            {evaluation.callsWorking !== undefined && (
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Calls working:
                <span className={evaluation.callsWorking ? 'badge bg-success' : 'badge bg-danger'}>
                  {evaluation.callsWorking ? 'Yes' : 'No'}
                </span>
              </li>
            )}
            {evaluation.touchscreenWorking !== undefined && (
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Touchscreen working:
                <span className={evaluation.touchscreenWorking ? 'badge bg-success' : 'badge bg-danger'}>
                  {evaluation.touchscreenWorking ? 'Yes' : 'No'}
                </span>
              </li>
            )}
            {evaluation.screenConditions && (
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Screen Condition:
                <span className="fw-bold">{evaluation.screenConditions}</span>
              </li>
            )}
            {/* Add more fields similarly if needed */}
          </ul>
        </div>
      </div>
    </div>
  );
  }
  
  const fetchCompanies = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'companies'));
      const companies = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        iconUrl: doc.data().iconUrl,
      }));
      return companies;
    } catch (error) {
      console.error("Error fetching companies: ", error);
      return [];
    }
  };
  
  const fetchVersions = async (companyName) => {
    try {
      const versionsQuery = query(
        collection(db, 'versions'),
        where('companyUrl', '==', companyName)
      );
      const snapshot = await getDocs(versionsQuery);
      const versions = snapshot.docs.map(doc => ({
        id: doc.id,
        versionName: doc.data().name,
        description: doc.data().version,
      }));
      return versions;
    } catch (error) {
      console.error("Error fetching versions: ", error);
      return [];
    }
  };
  
  const fetchSubVersions = async (versionName) => {
    try {
      const subversionsQuery = query(
        collection(db, 'subversions'),
        where('version', '==', versionName)
      );
      const snapshot = await getDocs(subversionsQuery);
      const subVersions = snapshot.docs.map(doc => ({
        id: doc.id,
        subVersionName: doc.data().subname,
        description: doc.data().versionUrl,
      }));
      return subVersions;
    } catch (error) {
      console.error("Error fetching subversions: ", error);
      return [];
    }
  };
  
  const fetchIssues = async (subVersionName) => {
    try {
      const issuesQuery = query(
        collection(db, 'issue'),
        where('subversion', '==', subVersionName)
      );
      const snapshot = await getDocs(issuesQuery);
      const issues = snapshot.docs.map(doc => ({
        id: doc.id,
        issueName: doc.data().issuename,
        description: doc.data().price,
      }));
      return issues;
    } catch (error) {
      console.error("Error fetching issues: ", error);
      return [];
    }
  };
  
  

export default RepairRequest;
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
//import { auth } from './firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
//import Login from './login';
//import Signup from './signup';
import { BrowserRouter as Router, Route,   useParams, Routes, useNavigate } from 'react-router-dom';
//import Signup from './signup';
//import HomePage from './homefile';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddRefurbishedItem from '../refurbished/regurbihedentry';
//import Navbar from './navfile';

const SellRequest = () => {
  const [evaluation, setEvaluation] = useState({
    callsWorking: undefined,
    touchscreenWorking: undefined,
    // Add other states for evaluation here
  });

  const handleUpdateEvaluation = (newEvaluation) => {
    setEvaluation(prevState => ({
      ...prevState,
      ...newEvaluation,
    }));
  };
  return (
    <Router>
       <EvaluationSummary evaluation={evaluation}/>
      <Routes>
    
        <Route  path="/sell" element={<Companies/>} />
        <Route  path="/refurbished" element={<AddRefurbishedItem/>} />
        <Route path="/versions/:companyName" element={<Versions />} />
        <Route path="/subversions/:companyName/:versionName" element={<SubVersions />} />
        
        
        <Route path="/storage/:subVersionName" element={<StoragePage />} />
        <Route path="/evaluation1" element={<EvaluationPageOne updateEvaluation={handleUpdateEvaluation} />} />
        <Route path="/evaluation2" element={<EvaluationPageTwo updateEvaluation={handleUpdateEvaluation} />} />
      </Routes>
    </Router>
    
  );
};

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
  
      history(`/versions/${company.name}`);
    };
  
    return (
      <div className="container text-center py-5">
        {/* Main Heading */}
        <h1 className="mb-4 display-4 fw-bold">Repair Request</h1>
        
        {/* Sub-heading */}
        <h2 className="mb-5 text-primary">Select a Company</h2>
        
        {/* Company Cards */}
        <div className="row">
          {companies.map(company => (
            <div 
              key={company.id} 
              className="col-6 col-md-4 col-lg-2 mb-3" 
              onClick={() => handleCompanyClick(company)}
            >
              <div className="card h-100 shadow-lg" style={{ cursor: 'pointer', borderRadius: '10px' }}>
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
      history(`/subversions/${companyName}/${version.versionName}`);
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
      <div>
        <h3>Tell us more about your device</h3>
        <p>Are you able to make and receive calls?</p>
        <button onClick={() => handleInputChange('callsWorking', true)}>Yes</button>
        <button onClick={() => handleInputChange('callsWorking', false)}>No</button>
  
        <p>Is your device's touch screen working properly?</p>
        <button onClick={() => handleInputChange('touchscreenWorking', true)}>Yes</button>
        <button onClick={() => handleInputChange('touchscreenWorking', false)}>No</button>
  
        {/* Add other questions similarly */}
        <button onClick={handleContinue}>Continue</button>
      </div>
    );
  }
  function EvaluationPageTwo({ updateEvaluation }) {
    const [screenCondition, setScreenCondition] = useState(null);
  
    const handleCardClick = (condition) => {
      setScreenCondition(condition);
      updateEvaluation({ screenCondition: condition });
    };
    
    return (
      <div>
        <h3>Physical Condition of Your Device</h3>
        <div className={`card ${screenCondition === 'broken' ? 'selected' : ''}`} onClick={() => handleCardClick('broken')}>
          Broken/Scratch on screen
        </div>
        <div className={`card ${screenCondition === 'dent' ? 'selected' : ''}`} onClick={() => handleCardClick('dent')}>
          Scratch/Dent on device body
        </div>
  
        <button onClick={() => console.log('Submit final evaluation')}>Continue</button>
      </div>
    );
  }
  function EvaluationSummary({ evaluation }) {
   
    return (
      <div className="row">
        {/* Evaluation Summary (left side) */}
        <div className="evaluation-summary col-md-6 bg-light border-end">
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
            {evaluation.screenCondition && (
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Screen Condition:
                <span className="fw-bold">{evaluation.screenCondition}</span>
              </li>
            )}
            {/* Add more fields similarly if needed */}
          </ul>
        </div>
  
        {/* Evaluation Forms (right side) */}
        <div className="evaluation-forms col-md-6">
          {/* Form content goes here */}
          <h3 className="mb-4">Evaluation Forms</h3>
          {/* Add your form content */}
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
 
  export default SellRequest;
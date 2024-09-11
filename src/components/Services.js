
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { auth } from './firebase';
import { collection, getDocs, query, where,addDoc } from 'firebase/firestore';
import Login from './login';
//import Signup from './signup';
import { BrowserRouter as Router, Route,   useParams, Routes, useNavigate } from 'react-router-dom';
import Signup from './signup';
import HomePage from './homefile';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Navbar from './navfile';

const RepairRequest = () => {
  return (
    <Router>
      
      <Routes>
      <Route  path="/home" element={<HomePage/>} />
        <Route  path="/" element={<CompaniesPage/>} />
        <Route path="/versions/:companyName" element={<VersionsPage />} />
        <Route path="/subversions/:companyName/:versionName" element={<SubVersionsPage />} />
        <Route path="/issues/:companyName/:versionName/:subVersionName" element={<IssuesPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
       
      </Routes>
    </Router>
    
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
            className="col-12 col-md-6 col-lg-4 mb-3"
            onClick={() => handleIssueClick(issue)}
            
            style={{ cursor: 'pointer',borderColor:'orange' }}
          >
            <div className="card h-100 shadow-lg border-0 text-center" style={{ borderRadius: '15px', overflow: 'hidden' }}>
              <div className="card-body p-4">
                <h3 className="card-title fw-bold text-dark mb-3" style={{ fontSize: '1.25rem' }}>{issue.issueName}</h3>
                <p className="card-text text-muted" style={{ height: '100px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{issue.description}</p>
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
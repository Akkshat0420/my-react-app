
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { auth } from './firebase';
import { collection, getDocs, query, where,addDoc } from 'firebase/firestore';
import Login from './login';
//import Signup from './signup';
import { BrowserRouter as Router, Route,   useParams, Routes, useNavigate } from 'react-router-dom';
import Signup from './signup';

const RepairRequest = () => {
  return (
    <Router>
      <Routes>
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
    <div style={styles.container}>
      <h1>Repair Request</h1>
      <h2>Companies</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }} >
        {companies.map(company => (
          <div key={company.id} onClick={() => handleCompanyClick(company)} style={{ margin: 10 }}>
            <img src={company.iconUrl} alt={company.name}  style={styles.loginBox}/>
            <p>{company.name}</p>
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
    <div style={styles.container}>
      <h2 className='text-start h-8'>Versions for {companyName}</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {versions.map(version => (
          <div key={version.id} onClick={() => handleVersionClick(version)} style={{ margin: 10 }}>
            <img src={version.description} alt={version.versionName} style={{ width: 100, height: 100, cursor: 'pointer' }} />
            <p>{version.versionName}</p>
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
    
    <div style={styles.container}>
      <h2>SubVersions for {versionName}</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {subVersions.map(subVersion => (
          <div key={subVersion.id} onClick={() => handleSubVersionClick(subVersion)} style={{ margin: 10 }}>
            <img src={subVersion.description} alt={subVersion.subVersionName} style={{ width: 100, height: 100, cursor: 'pointer' }} />
            <p>{subVersion.subVersionName}</p>
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
    const history=useNavigate();
    useEffect(() => {
      loadIssues(subVersionName);
    }, [subVersionName]);
  
    const loadIssues = async (subVersionName) => {
      const issues = await fetchIssues(subVersionName);

      setIssues(issues);
    };
    const handleIssueClick = (issue) => {
      setSelectedIssue(issue); // Update the selected issue
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
      <div style={styles.container}>
        <h2>Issues for {subVersionName}</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {issues.map(issue => (
            <div key={issue.id}  onClick={() => handleIssueClick(issue)} style={{ margin: 10 }}>
              <h1 className='bold text-4xl gap-4 grid-flow-row' >{issue.issueName}</h1>
              <p style={{ width: 100, height: 100 }}>{issue.description}</p>
            </div>
          ))}
        </div>
        {selectedIssue && (
        <div>
          <button onClick={handleSubmit} style={{ marginTop: 20 }}>Submit Repair Request</button>
          {successMessage && <p style={{ color: 'green', marginTop: 10 }}>{successMessage}</p>}
          {errorMessage && < p>{errorMessage}</p>}
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
  
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Full viewport height
      backgroundColor: '#f0f0f0', // Adjust background color as needed
    },
    loginBox: {
      padding: '10px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      width: '100px',
      height:'100px',
      
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    input: {
      padding: '10px',
      fontSize: '16px',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    button: {
      padding: '10px',
      fontSize: '16px',
      backgroundColor: '#007BFF',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };

export default RepairRequest;
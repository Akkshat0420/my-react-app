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
//import Navbar from './navfile';



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
  export default SellRequest;
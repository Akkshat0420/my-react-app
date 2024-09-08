import React, { useState, useEffect } from 'react';
//import firebase from 'firebase/app';
import { db } from './firebase';
import { collection, getDocs,query,where } from 'firebase/firestore';
import 'firebase/auth';


const RepairRequestPage = () => {
  const [companies, setCompanies] = useState([]);
  const [versions, setVersions] = useState([]);
  const [subVersions, setSubVersions] = useState([]);
  const [issues, setIssues] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [selectedSubVersion, setSelectedSubVersion] = useState(null);
 

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    const companies = await fetchCompanies(); // Replace with your API call
    setCompanies(companies);
  };

  const loadVersions = async (companyName) => {
    const versions = await fetchVersions(companyName); // Replace with your API call
    setVersions(versions);
  };

  const loadSubVersions = async (versionName) => {
    const subVersions = await fetchSubVersions(versionName); // Replace with your API call
    setSubVersions(subVersions);
  };

  const loadIssues = async (subVersionName) => {
    const issues = await fetchIssues(subVersionName); // Replace with your API call
    setIssues(issues);
  };

 
  const handleCompanyClick = async (company) => {
    setSelectedCompany(company);
    await loadVersions(company.name);
  };

  const handleVersionClick = async (version) => {
    setSelectedVersion(version);
    await loadSubVersions(version.versionName);
  };

  const handleSubVersionClick = async (subVersion) => {
    setSelectedSubVersion(subVersion);
    await loadIssues(subVersion.subVersionName);
  };

  const handleIssueClick = (issue) => {
    //setSelectedIssue(issue);
  };

  
    return (
      <div>
        <h1>Repair Request</h1>
  
        <div>
          <h2>Companies</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {companies.map(company => (
              <div key={company.id} onClick={() => handleCompanyClick(company)} style={{ margin: 10 }}>
                <img src={company.iconUrl} alt={company.name} style={{ width: 100, height: 100, cursor: 'pointer' }} />
                <p>{company.name}</p>
              </div>
            ))}
          </div>
        </div>
  
        {selectedCompany && (
          <div>
            <h2>Versions for {selectedCompany.name}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {versions.map(version => (
                <div key={version.id} onClick={() => handleVersionClick(version)} style={{ margin: 10 }}>
                  <img src={version.description} alt={version.versionName} style={{ width: 100, height: 100, cursor: 'pointer' }} />
                  <p>{version.versionName}</p>
                </div>
              ))}
            </div>
          </div>
        )}
  
        {selectedVersion && (
          <div>
            <h2>SubVersions for {selectedVersion.versionName}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {subVersions.map(subVersion => (
                <div key={subVersion.id} onClick={() => handleSubVersionClick(subVersion)} style={{ margin: 10 }}>
                  <img src={subVersion.description} alt={subVersion.subVersionName} style={{ width: 100, height: 100, cursor: 'pointer' }} />
                  <p>{subVersion.subVersionName}</p>
                </div>
              ))}
            </div>
          </div>
        )}
  
        {selectedSubVersion && (
          <div>
            <h2>Issues for {selectedSubVersion.subVersionName}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {issues.map(issue => (
                <div key={issue.id} onClick={() => handleIssueClick(issue)} style={{ margin: 10 }}>
                  <img src={issue.iconUrl} alt={issue.issueName} style={{ width: 100, height: 100, cursor: 'pointer' }} />
                  <p>{issue.issueName}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
    );
};

const fetchCompanies = async () => {
  
  try {
    const snapshot = await getDocs(collection(db,'companies'));
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
      const subversionsQuery=query(
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
 
  
  const fetchIssues = async (issueName) => {
    
    try {
      const snapshot = await db.collection('issue')
                              .where('subversion', '==', issueName)
                              .get();
      
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
      
export default RepairRequestPage;

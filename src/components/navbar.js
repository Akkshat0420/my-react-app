import React, { useState } from 'react';
import { storage } from './firebase'; // Adjust import path as needed
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from './firebase';
//import { db } from './firebase';
import {  doc, setDoc } from 'firebase/firestore';
//import './App.css';
const DataEntryForm = () => {
  // State for brand
  const [brandId, setBrandId] = useState('');
  const [brandName, setBrandName] = useState('');

  // State for version
  const [versionId, setVersionId] = useState('');
  const [versionName, setVersionName] = useState('');
  const [versionImage, setVersionImage] = useState(null);

  // State for subversion
  const [subVersionId, setSubVersionId] = useState('');
  const [subVersionName, setSubVersionName] = useState('');
  const [subVersionImage, setSubVersionImage] = useState(null);

  // State for issue
  const [issueId, setIssueId] = useState('');
  const [issueName, setIssueName] = useState('');
  const [issuePrice, setIssuePrice] = useState('');
  const [issueWarrantyTime, setIssueWarrantyTime] = useState('');

  const handleFileChange = (e, setter) => {
    setter(e.target.files[0]);
  };

  const handleUpload = async (file, path) => {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const handleAddBrand = async () => {
    try {
      await setDoc(doc(db, 'brands', brandId), { name: brandName });
      alert('Brand added successfully');
    } catch (error) {
      console.error("Error adding brand: ", error);
      alert('Error adding brand');
    }
  };

  const handleAddVersion = async () => {
    try {
      let imageUrl = '';
      if (versionImage) {
        imageUrl = await handleUpload(versionImage, `versions/${versionId}/image`);
      }
      await setDoc(doc(db, 'brands', brandId, 'versions', versionId), { name: versionName, imageUrl });
      alert('Version added successfully');
    } catch (error) {
      console.error("Error adding version: ", error);
      alert('Error adding version');
    }
  };

  const handleAddSubVersion = async () => {
    try {
      let imageUrl = '';
      if (subVersionImage) {
        imageUrl = await handleUpload(subVersionImage, `subversions/${subVersionId}/image`);
      }
      await setDoc(doc(db, 'brands', brandId, 'versions', versionId, 'subversions', subVersionId), { name: subVersionName, imageUrl });
      alert('SubVersion added successfully');
    } catch (error) {
      console.error("Error adding subversion: ", error);
      alert('Error adding subversion');
    }
  };

  const handleAddIssue = async () => {
    try {
      await setDoc(doc(db, 'brands', brandId, 'versions', versionId, 'subversions', subVersionId, 'issues', issueId), { name: issueName, price: issuePrice, warrantyTime: issueWarrantyTime });
      alert('Issue added successfully');
    } catch (error) {
      console.error("Error adding issue: ", error);
      alert('Error adding issue');
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto gap-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Add Data to Firestore</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add Brand</h2>
        <input
          type="text"
          value={brandId}
          onChange={(e) => setBrandId(e.target.value)}
          placeholder="Brand ID"
          className="p-2 border border-gray-300 rounded w-full mb-2"
        />
        <input
          type="text"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          placeholder="Brand Name"
          className="p-2 border gap-4 border-gray-300 rounded w-full mb-2"
        />
        <button
          onClick={handleAddBrand}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Brand
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add Version</h2>
        <input
          type="text"
          value={versionId}
          onChange={(e) => setVersionId(e.target.value)}
          placeholder="Version ID"
          className="p-2 border border-gray-300 rounded w-full mb-2"
        />
        <input
          type="text"
          value={versionName}
          onChange={(e) => setVersionName(e.target.value)}
          placeholder="Version Name"
          className="p-2 border border-gray-300 rounded w-full mb-2"
        />
        <input
          type="file"
          onChange={(e) => handleFileChange(e, setVersionImage)}
          className="mb-2"
        />
        <button
          onClick={handleAddVersion}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Version
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add SubVersion</h2>
        <input
          type="text"
          value={subVersionId}
          onChange={(e) => setSubVersionId(e.target.value)}
          placeholder="SubVersion ID"
          className="p-2 border border-gray-300 rounded w-full mb-2"
        />
        <input
          type="text"
          value={subVersionName}
          onChange={(e) => setSubVersionName(e.target.value)}
          placeholder="SubVersion Name"
          className="p-2 border border-gray-300 rounded w-full mb-2"
        />
        <input
          type="file"
          onChange={(e) => handleFileChange(e, setSubVersionImage)}
          className="mb-2"
        />
        <button
          onClick={handleAddSubVersion}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add SubVersion
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Add Issue</h2>
        <input
          type="text"
          value={issueId}
          onChange={(e) => setIssueId(e.target.value)}
          placeholder="Issue ID"
          className="p-2 border border-gray-300 rounded w-full mb-2"
        />
        <input
          type="text"
          value={issueName}
          onChange={(e) => setIssueName(e.target.value)}
          placeholder="Issue Name"
          className="p-2 border border-gray-300 rounded w-full mb-2"
        />
        <input
          type="text"
          value={issuePrice}
          onChange={(e) => setIssuePrice(e.target.value)}
          placeholder="Issue Price"
          className="p-2 border border-gray-300 rounded w-full mb-2"
        />
        <input
          type="text"
          value={issueWarrantyTime}
          onChange={(e) => setIssueWarrantyTime(e.target.value)}
          placeholder="Issue Warranty Time"
          className="p-2 border border-gray-300 rounded w-full mb-2"
        />
        <button
          onClick={handleAddIssue}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Issue
        </button>
        
      </div>
    </div>
  );
};

export default DataEntryForm;

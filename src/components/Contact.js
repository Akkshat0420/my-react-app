// src/components/DataEntryForm.js

import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebase';

const DataEntry = () => {
  const [formData, setFormData] = useState({
    brandName: '',
    brandIconUrl: '',
    versionName: '',
    versionImageUrl: '',
    subVersionName: '',
    subVersionImageUrl: '',
    issueName: '',
    issuePrice: '',
    issueWarrantyTime: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add brand
      const brandRef = await addDoc(collection(db, 'brands'), {
        name: formData.brandName,
        iconUrl: formData.brandIconUrl
      });

      // Add version
      const versionRef = await addDoc(collection(db, `brands/${brandRef.id}/versions`), {
        name: formData.versionName,
        imageUrl: formData.versionImageUrl
      });

      // Add subversion
      const subVersionRef = await addDoc(collection(db, `brands/${brandRef.id}/versions/${versionRef.id}/subversions`), {
        name: formData.subVersionName,
        imageUrl: formData.subVersionImageUrl
      });

      // Add issue
      await addDoc(collection(db, `brands/${brandRef.id}/versions/${versionRef.id}/subversions/${subVersionRef.id}/issues`), {
        name: formData.issueName,
        price: formData.issuePrice,
        warrantyTime: formData.issueWarrantyTime
      });

      alert('Data added successfully!');
      setFormData({
        brandName: '',
        brandIconUrl: '',
        versionName: '',
        versionImageUrl: '',
        subVersionName: '',
        subVersionImageUrl: '',
        issueName: '',
        issuePrice: '',
        issueWarrantyTime: ''
      });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Data Entry Form</h2>
      <h3>Brand</h3>
      <input
        type="text"
        name="brandName"
        value={formData.brandName}
        onChange={handleChange}
        placeholder="Brand Name"
        required
      />
      <input
        type="text"
        name="brandIconUrl"
        value={formData.brandIconUrl}
        onChange={handleChange}
        placeholder="Brand Icon URL"
        required
      />

      <h3>Version</h3>
      <input
        type="text"
        name="versionName"
        value={formData.versionName}
        onChange={handleChange}
        placeholder="Version Name"
        required
      />
      <input
        type="text"
        name="versionImageUrl"
        value={formData.versionImageUrl}
        onChange={handleChange}
        placeholder="Version Image URL"
        required
      />

      <h3>Subversion</h3>
      <input
        type="text"
        name="subVersionName"
        value={formData.subVersionName}
        onChange={handleChange}
        placeholder="Subversion Name"
        required
      />
      <input
        type="text"
        name="subVersionImageUrl"
        value={formData.subVersionImageUrl}
        onChange={handleChange}
        placeholder="Subversion Image URL"
        required
      />

      <h3>Issue</h3>
      <input
        type="text"
        name="issueName"
        value={formData.issueName}
        onChange={handleChange}
        placeholder="Issue Name"
        required
      />
      <input
        type="number"
        name="issuePrice"
        value={formData.issuePrice}
        onChange={handleChange}
        placeholder="Issue Price"
        required
      />
      <input
        type="text"
        name="issueWarrantyTime"
        value={formData.issueWarrantyTime}
        onChange={handleChange}
        placeholder="Issue Warranty Time"
        required
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default DataEntry;

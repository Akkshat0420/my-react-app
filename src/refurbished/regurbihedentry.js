import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

const AddRefurbishedItem = () => {
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [modelName, setModelName] = useState("");
  const [price, setPrice] = useState(""); // Base price input
  const [priceOff, setPriceOff] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [reviews, setReviews] = useState("");
  const [storageOptions, setStorageOptions] = useState([{ storage: "", price: "" }]);

  const handleStorageChange = (index, field, value) => {
    const newStorageOptions = [...storageOptions];
    newStorageOptions[index][field] = value;
    setStorageOptions(newStorageOptions);
  };

  const handleAddStorage = () => {
    setStorageOptions([...storageOptions, { storage: "", price: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "refurbishedItems"), {
        category,
        brand,
        modelName,
        price, // Base price
        priceOff,
        imageUrl,
        reviews,
        storageOptions, // Storage options with prices
      });
      alert("Item added successfully!");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Refurbished Item</h2>
      <form onSubmit={handleSubmit} className="row g-3">

        <div className="col-md-6">
          <label className="form-label">Category</label>
          <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="smartphone">Smartphone</option>
            <option value="laptop">Laptop</option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Brand</label>
          <input
            type="text"
            className="form-control"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Model Name</label>
          <input
            type="text"
            className="form-control"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Base Price</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Price Off</label>
          <input
            type="number"
            className="form-control"
            value={priceOff}
            onChange={(e) => setPriceOff(e.target.value)}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Image URL</label>
          <input
            type="url"
            className="form-control"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Number of Reviews</label>
          <input
            type="number"
            className="form-control"
            value={reviews}
            onChange={(e) => setReviews(e.target.value)}
            required
          />
        </div>

        <div className="col-12">
          <h4>Storage Options</h4>
          {storageOptions.map((option, index) => (
            <div key={index} className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Storage</label>
                <input
                  type="text"
                  className="form-control"
                  value={option.storage}
                  onChange={(e) => handleStorageChange(index, "storage", e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  value={option.price}
                  onChange={(e) => handleStorageChange(index, "price", e.target.value)}
                  required
                />
              </div>
            </div>
          ))}
          <button type="button" className="btn btn-primary" onClick={handleAddStorage}>
            Add Another Storage Option
          </button>
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-success">Add Item</button>
        </div>
      </form>
    </div>
  );
};

export default AddRefurbishedItem;

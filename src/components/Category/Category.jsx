// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

import { db } from '../firebase-config';
import { collection, addDoc } from "firebase/firestore";
import Swal from 'sweetalert2';
import "./Category.css"

function Category() {
  const [category, setCategory] = useState({
    DanhMuc: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Category"), {
        DanhMuc: category.DanhMuc
      });
      Swal.fire({
        icon: 'success',
        title: 'Thêm Thành Công',
        showConfirmButton: false,
        timer: 1500
      });
      // Reset form
      setCategory({
        DanhMuc: ''
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: error.message,
    });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          
        </div>
        <div className="col-md-8 abc">
          <div style={styles.body}>
            <div style={styles.container}>
              <h2>Thêm Danh Mục</h2>
              <form id="categoryForm" onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                  <label htmlFor="categoryName" style={styles.label}>
                    Tên Danh Mục:
                  </label>
                  <input
                    type="text"
                    id="categoryName"
                    name="DanhMuc"
                    value={category.DanhMuc}
                    onChange={handleChange}
                    required
                    style={styles.inputText}
                  />
                </div>
                <div style={styles.formGroup}>
                  <input
                    type="submit"
                    value="Thêm Danh Mục"
                    style={styles.inputSubmit}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

const styles = {
  body: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f0f0f0",
    padding: "20px",
    marginTop: "-200px",
    
  },
  container: {
    maxWidth: "1000px", // Increased maximum width for better spacing
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    margin: "auto",
   
  },
  formGroup: {
    marginBottom: "20px",
     // Increased spacing between form groups
  },
  label: {
    fontWeight: "bold",
    display: "block",
    marginBottom: "5px",
  },
  inputText: {
    width: "100%", // Full width input field
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box", // Ensures padding is included in width calculation
  },
  inputSubmit: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    width: "100%", // Full width submit button
    marginTop: "10px", // Added margin for separation
  },
  inputSubmitHover: {
    backgroundColor: "#45a049",
    marginTop: "-100px"
  },
};

export default Category;

// EditCategory.js
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';

import { db } from '../firebase-config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import "./Category.css"



const EditCategory = () => {
    const { id } = useParams(); // Lấy id từ URL
    const [DanhMuc, setDanhMuc] = useState('');
    const [category,setCategory] = useState(null);
    const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
        try {
            const docRef = doc(db, 'Category', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setCategory(data);
                setDanhMuc(data.DanhMuc);
            } else {
                console.log('No such document!');
            }
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };

    fetchCategory();
}, [id]); 
const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const docRef = doc(db, 'Category', id);
        await updateDoc(docRef, { DanhMuc });
        console.log('Category updated successfully');
        Swal.fire({
          icon: 'success',
          title: 'Cập Nhập Thành Công',
          showConfirmButton: false,
          timer: 1500
        });
        // Sau khi cập nhật thành công, chuyển hướng về trang danh sách danh mục
        navigate('/categorylist');
    } catch (error) {
        console.error('Error updating category:', error);
    }
};


  return (
    <div className="container">
    <div className="row">
      <div className="col-md-3">
        {/* Interface component */} 
      </div>
      <div className="col-md-9 maginxuong ">
        <div className='vbn2' style={styles.body}>
          <div className='vbn' style={styles.container}>
            <h3>Chỉnh Sửa Danh Mục</h3>
            <form id="categoryForm" onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label htmlFor="editCategoryName" style={styles.label}>
                  Tên Danh Mục:
                </label>
                <input
                  type="text"
                  id="editCategoryName"
                  name="DanhMuc"
                  value={DanhMuc}
                  onChange={(e) => setDanhMuc(e.target.value)}
                  required
                  style={styles.inputText}
                  className="form-control" // Thêm class Bootstrap form-control
                />
              </div>
              <div style={styles.formGroup}>
                <button type="submit" className="btn btn-primary">
                  Cập Nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
};
const styles = {
  body: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f0f0f0",
    padding: "20px",
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
    marginBottom: "20px", // Increased spacing between form groups
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
  },
};

export default EditCategory;

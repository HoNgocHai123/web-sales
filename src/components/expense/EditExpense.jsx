// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase-config';
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import "./expense.css";

function EditExpense() {
  const { id } = useParams(); // Lấy id từ URL
  const navigate = useNavigate();
  const [editExpense, setEditExpense] = useState({
    DanhMuc: '',
    MoTa: '',
    NgayThang: '',
    SoTien: ''
  });
  const [categories, setCategories] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, "Category"));
      const categoriesData = querySnapshot.docs.map(doc => doc.data().DanhMuc); 
      setCategories(categoriesData);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const expenseRef = doc(db, 'Expense', id);
        const docSnap = await getDoc(expenseRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setEditExpense({
            DanhMuc: data.DanhMuc,
            MoTa: data.MoTa,
            NgayThang: data.NgayThang,
            SoTien: data.SoTien
          });
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching expense: ', error);
      }
    };

    fetchExpense();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update chi tiêu trong Firestore
      const expenseRef = doc(db, 'Expense', id);
      await updateDoc(expenseRef, {
        DanhMuc: editExpense.DanhMuc,
        MoTa: editExpense.MoTa,
        NgayThang: editExpense.NgayThang,
        SoTien: editExpense.SoTien
      });
      Swal.fire({
        icon: 'success',
        title: 'Cập nhật thành công',
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/expenseList'); 
    } catch (error) {
      console.error('Error updating expense: ', error);
      Swal.fire({
        icon: 'error',
        title: 'Cập nhật không thành công',
        text: error.message,
      });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          
        </div>
        <div className="col-md-9 abcb">
          <div style={styles.body}>
            <div className="abnm" style={styles.container}>
              <h2>Chỉnh Sửa Chi Tiêu</h2>
              <form id="expenseForm" onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                  <label htmlFor="editCategoryName" style={styles.label}>Tên Danh Mục:</label>
                  <select
                    id="categoryName"
                    name="DanhMuc"
                    value={editExpense.DanhMuc}
                    onChange={(e) => setEditExpense({ ...editExpense, DanhMuc: e.target.value })}
                    required
                    style={styles.inputText}
                  >
                    <option value="">Chọn danh mục</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div style={styles.formGroup}>
                  <label htmlFor="editDescription" style={styles.label}>Mô Tả:</label>
                  <input
                    type="text"
                    id="description"
                    name="MoTa"
                    value={editExpense.MoTa}
                    onChange={(e) => setEditExpense({ ...editExpense, MoTa: e.target.value })}
                    required
                    style={styles.inputText}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label htmlFor="editDate" style={styles.label}>Ngày Tháng:</label>
                  <input
                    type="date"
                    id="date"
                    name="NgayThang"
                    value={editExpense.NgayThang}
                    onChange={(e) => setEditExpense({ ...editExpense, NgayThang: e.target.value })}
                    required
                    style={styles.inputText}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label htmlFor="editAmount" style={styles.label}>Số Tiền:</label>
                  <input
                    type="number"
                    id="amount"
                    name="SoTien"
                    value={editExpense.SoTien}
                    onChange={(e) => setEditExpense({ ...editExpense, SoTien: e.target.value })}
                    required
                    style={styles.inputText}
                  />
                </div>
                <div style={styles.formGroup}>
                  <input
                    type="submit"
                    value="Cập Nhật"
                    style={{
                      ...styles.inputSubmit,
                      ...(isHovered && styles.inputSubmitHover),
                    }}
                    onMouseOver={() => setIsHovered(true)}
                    onMouseOut={() => setIsHovered(false)}
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
    marginTop: "-70px",
  },
  container: {
    maxWidth: "900px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    margin: "auto",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    fontWeight: "bold",
    display: "block",
    marginBottom: "5px",
  },
  inputText: {
    width: "90%",
    padding: "10px",
    fontSize: "15px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box",
  },
  inputSubmit: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    width: "100%",
    marginTop: "10px",
  },
  inputSubmitHover: {
    backgroundColor: "#45a049",
  },
};

export default EditExpense;

// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { db } from '../firebase-config';
import { collection, getDocs, addDoc } from "firebase/firestore";
import Swal from 'sweetalert2';
import "./expense.css"

function Expense() {
  const [expense, setExpense] = useState({
    DanhMuc: '',
    MoTa: '',
    NgayThang: '',
    SoTien: '',
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, "Category"));
      const categoriesData = querySnapshot.docs.map(doc => doc.data().DanhMuc); 
      setCategories(categoriesData);
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Expense"), {
        DanhMuc: expense.DanhMuc,
        MoTa: expense.MoTa,
        NgayThang: expense.NgayThang,
        SoTien: parseFloat(expense.SoTien),
      });
      Swal.fire({
        icon: 'success',
        title: 'Thêm chi tiêu thành công',
        showConfirmButton: false,
        timer: 1500
    });
      // Reset form
      setExpense({
        DanhMuc: '',
        MoTa: '',
        NgayThang: '',
        SoTien: '',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: error.message,
    });
    }
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          
        </div>
        <div className="col-md-9 abcb">
          <div  style={styles.body}>
            <div className="abnm" style={styles.container}>
              <h2>Thêm Chi Tiêu</h2>
              <form id="expenseForm" onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                  <label htmlFor="categoryName" style={styles.label}>
                    Tên Danh Mục:
                  </label>
                  <select
                    id="categoryName"
                    name="DanhMuc"
                    value={expense.DanhMuc}
                    onChange={handleChange}
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
                  <label htmlFor="description" style={styles.label}>
                    Mô Tả:
                  </label>
                  <input
                    type="text"
                    id="description"
                    name="MoTa"
                    value={expense.MoTa}
                    onChange={handleChange}
                    required
                    style={styles.inputText}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label htmlFor="date" style={styles.label}>
                    Ngày Tháng:
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="NgayThang"
                    value={expense.NgayThang}
                    onChange={handleChange}
                    required
                    style={styles.inputText}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label htmlFor="amount" style={styles.label}>
                    Số Tiền:
                  </label>
                  <input
                    type="number"
                    id="amount"
                    name="SoTien"
                    value={expense.SoTien}
                    onChange={handleChange}
                    required
                    style={styles.inputText}
                  />
                </div>
                <div style={styles.formGroup}>
                  <input
                    type="submit"
                    value="Thêm Chi Tiêu"
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
    marginTop: "0px",
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

export default Expense;

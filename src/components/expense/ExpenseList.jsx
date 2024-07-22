// ExpenseList.js
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase-config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

import '../css.css';
import Swal from 'sweetalert2';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Expense'));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setExpenses(data);
    } catch (error) {
      console.error('Error fetching expenses: ', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'Expense', id));
      Swal.fire({
        icon: 'success',
        title: 'Xóa thành công',
        showConfirmButton: false,
        timer: 1500
      });
      fetchExpenses(); // Fetch expenses again to update the list
    } catch (error) {
      console.error('Error removing expense: ', error);
      Swal.fire({
        icon: 'error',
        title: 'Xóa Không Thành công',
        text: error.message,
      });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          
        </div>
        <div className="col-md-9 abcc">
          <h3>Danh Sách Chi Tiêu</h3>
          <br />
          <div className="input-container">
            <table className="table table-bordered table-hover custom-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Danh mục</th>
                  <th>Mô tả</th>
                  <th>Ngày tháng</th>
                  <th>Số tiền</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map(expense => (
                  <tr key={expense.id}>
                    <td>{expense.id}</td>
                    <td>{expense.DanhMuc}</td>
                    <td>{expense.MoTa}</td>
                    <td>{expense.NgayThang}</td>
                    <td>{expense.SoTien} VND</td>
                    <td>
                      <Link
                        to={`/EditExpense/${expense.id}`}
                        className="btn"
                        style={{
                          backgroundColor: "#007bff", // Primary color
                          color: "white",
                          marginRight: "10px",
                          padding: "5px 10px",
                          fontSize: "14px",
                          textDecoration: "none",
                          border: "none",
                          borderRadius: "4px",
                        }}
                      >
                        ✏️
                      </Link>
                      <button
                        className="btn"
                        style={{
                          backgroundColor: "#dc3545", // Danger color
                          color: "white",
                          padding: "5px 10px",
                          fontSize: "14px",
                          border: "none",
                          borderRadius: "4px",
                        }}
                        onClick={() => handleDelete(expense.id)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;

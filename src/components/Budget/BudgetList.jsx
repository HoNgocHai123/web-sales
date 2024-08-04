// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase-config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import '../css.css';

// Helper function to format numbers with commas
const formatNumber = (number) => {
  return number.toLocaleString();
};

const BudgetList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'Budget')); // Fetch data from 'Budget'
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        NgayThang: doc.data().NgayThang?.toDate().toLocaleDateString(), 
      }));
      setItems(data);
    } catch (error) {
      console.error('Error fetching budgets: ', error);
      Swal.fire({
        icon: 'error',
        title: 'Lỗi khi tải dữ liệu',
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'Budget', id)); // Delete the budget document
      Swal.fire({
        icon: 'success',
        title: 'Xóa thành công',
        showConfirmButton: false,
        timer: 17500,
      });
      fetchData(); // Reload the list
    } catch (error) {
      console.error('Error removing budget: ', error);
      Swal.fire({
        icon: 'error',
        title: 'Xóa không thành công',
        text: error.message,
      });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
        </div>
        <div className="col-md-9 abcm">
          <h3>Danh Sách Ngân Sách</h3>
          <br />
          {loading ? (
            <p>Loading...</p> 
          ) : (
            <div className="input-container">
              <table className="table table-bordered table-hover ">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Danh mục</th>
                    <th>Ngày tháng</th>
                    <th>Số tiền</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.DanhMuc}</td>
                      <td>{item.NgayThang}</td>
                      <td>{formatNumber(item.SoTien)} VNĐ</td>
                      <td>
                        <Link
                          to={`/budgetedit/${item.id}`} // Update the link to BudgetEdit
                          className="btn"
                          style={{
                            backgroundColor: "#007bff",
                            color: "white",
                            marginRight: "10px",
                          }}
                        >
                          ✏️
                        </Link>
                        <button
                          className="btn"
                          style={{
                            backgroundColor: "#dc3545",
                            color: "white",
                          }}
                          onClick={() => handleDelete(item.id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BudgetList;

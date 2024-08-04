// ListComponent.js
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase-config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

import '../css.css';
import Swal from 'sweetalert2';

const ListComponent = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Category'));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setItems(data);
    } catch (error) {
      console.error('Error fetching categories: ', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'Category', id));
      Swal.fire({
        icon: 'success',
        title: 'Xóa thành công',
        showConfirmButton: false,
        timer: 1500,
      });
      fetchData(); // Fetch categories again to update the list
    } catch (error) {
      console.error('Error removing category: ', error);
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
          <h3>Danh Sách Danh Mục</h3>
          <br />
          <div className="input-container">
          <table className="table table-bordered table-hover ">
      <thead>
        <tr>
          <th>ID</th>
          <th>Danh mục</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
  {items.map((item) => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.DanhMuc}</td>
      <td>
        <Link
          to={`/EditCategory/${item.id}`}
          className="btn"
          style={{
            backgroundColor: "#007bff", // Bootstrap primary color
            color: "white",
            marginRight: "10px",
          }}
        >
          ✏️
        </Link>
        <button
          className="btn"
          style={{
            backgroundColor: "#dc3545", // Bootstrap danger color
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
        </div>
      </div>
    </div>
  );
};

export default ListComponent;

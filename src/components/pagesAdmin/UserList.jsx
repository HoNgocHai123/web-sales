// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import Swal from 'sweetalert2';
import '../css.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'users')); // Fetch data from 'Users'
      const data = querySnapshot.docs.map((doc) => {
        const userData = doc.data();
        return {
          id: doc.id,
          displayName: userData.displayName,
          email: userData.email,
          createdAt: userData.createdAt?.toDate().toLocaleDateString(), 
          role: userData.role,
          uid: userData.uid,
        };
      });
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users: ', error);
      Swal.fire({
        icon: 'error',
        title: 'Lỗi khi tải dữ liệu',
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          
        </div>
        <div className="col-md-9 abcc">
          <h3>Danh Sách Users</h3>
          <br />
          {loading ? (
            <p>Loading...</p> // Display loading message while fetching data
          ) : (
            <div className="input-container">
              <table className="table table-bordered table-hover custom-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Ngày tháng</th>
                    <th>Vai trò</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.displayName}</td>
                      <td>{user.email}</td>
                      <td>{user.createdAt}</td>
                      <td>{user.role}</td>
                     
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

export default UserList;

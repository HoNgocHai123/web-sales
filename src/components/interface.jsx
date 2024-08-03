// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Outlet } from "react-router-dom";

function Interface() {
  const [dropdownActive1, setDropdownActive1] = useState(false);
  const [dropdownActive2, setDropdownActive2] = useState(false);
  const [dropdownActive3, setDropdownActive3] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserEmail(null);
    Swal.fire({
      icon: "success",
      title: "Đăng xuất thành công",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/signin");
  };

  useEffect(() => {
    const userEmailFromStorage = localStorage.getItem("user");
    if (userEmailFromStorage) {
      const userEmailObject = JSON.parse(userEmailFromStorage);
      setUserEmail(userEmailObject.email); // Access the email property of the object
    } else {
      navigate("/signin");
    }
  }, [navigate]);

  const toggleDropdown1 = () => {
    setDropdownActive1(!dropdownActive1);
    // Đóng dropdown 2 và 3 nếu đang mở
    if (dropdownActive2) {
      setDropdownActive2(false);
    }
    if (dropdownActive3) {
      setDropdownActive3(false);
    }
  };

  const toggleDropdown2 = () => {
    setDropdownActive2(!dropdownActive2);
    // Đóng dropdown 1 và 3 nếu đang mở
    if (dropdownActive1) {
      setDropdownActive1(false);
    }
    if (dropdownActive3) {
      setDropdownActive3(false);
    }
  };

  const toggleDropdown3 = () => {
    setDropdownActive3(!dropdownActive3);
    // Đóng dropdown 1 và 2 nếu đang mở
    if (dropdownActive1) {
      setDropdownActive1(false);
    }
    if (dropdownActive2) {
      setDropdownActive2(false);
    }
  };
console.log(userEmail)
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar (4 columns) */}
        <div className="col-8 sidenav">
          <div>
            {userEmail ? (
              <div className="d-flex align-items-center" style={{ marginTop: "0px" }}>
                {/* Show user email */}
                <p className="mb-0" style={{ color: "white" }}>
                  <strong style={{ fontSize: "15px", marginLeft: "20px" }}>
                    {userEmail.split("@")[0]}
                  </strong>
                </p>
                <button
                  className="btn btn-danger ms-3"
                  onClick={handleLogout}
                  style={{ fontSize: "15px", padding: "5px 10px" }}
                >
                  Đăng Xuất
                </button>
              </div>
            ) : (
              <div></div>
            )}
          </div>

          <hr />
          <a href="/HomePages">
            <i className="fas fa-home"></i><b className="user">Trang Chủ</b> 
          </a>
          <button className="dropdown-btn bnm" onClick={toggleDropdown1}>
            <i className="fas fa-list"></i> <b className="TDM account">Thêm Danh Mục</b>
            <i className={`fa fa-caret-${dropdownActive1 ? "up" : "down"}`}></i>
          </button>
          <div className={`dropdown-container ${dropdownActive1 ? "active" : ""}`}>
            <a href="/category">Thêm danh mục</a>
            <a href="/categorylist">Danh sách</a>
          </div>
          <button className="dropdown-btn" onClick={toggleDropdown2}>
            <i className="fas fa-dollar-sign"></i> <b className="tct account">Tạo Chi Tiêu</b>
            <i className={`fa fa-caret-${dropdownActive2 ? "up" : "down"}`}></i>
          </button>
          <div className={`dropdown-container ${dropdownActive2 ? "active" : ""}`}>
            <a href="/expense">Thêm Chi Phí</a>
            <a href="/expenseList">Danh sách</a>
          </div>
          <button className="dropdown-btn" onClick={toggleDropdown3}>
            <i className="fas fa-book"></i> <b className="cns account">Cài Ngân Sách</b> 
            <i className={`fa fa-caret-${dropdownActive3 ? "up" : "down"}`}></i>
          </button>
          <div className={`dropdown-container ${dropdownActive3 ? "active" : ""}`}>
            <a href="/Budget">Thêm Chi Phí</a>
            <a href="/BudgetList">Danh sách</a>
          </div>
          <a href="/Total">
            <i className="fas fa-chart-bar"></i><b className="account user">Tổng Chi tiêu</b> 
          </a>
          {userEmail === "admin@gmail.com"? (
          <a href="/userList">
            <i className="fas fa-user"></i><b className="account user">Tài Khoản Users</b> 
          </a>
             ) : (
              <div style={{display:"none"}}>
           
           <a href="/userList">
            <i className="fas fa-user"></i><b className="account user">Tài Khoản Users</b> 
          </a> 
     
              </div>
            )}
         
          <br />
        </div>
        {/* Main content (8 columns) */}
        <div className="col-2">
          {/* Add your main content here */}
        </div>
      </div>
      <div className="flex-1 bg-white p-4">
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default Interface;

// eslint-disable-next-line no-unused-vars
import React from "react";
import "./App.css";

function App() {
  return (
    <div className="container">
      <aside className="sidebar">
        <div className="logo">QuikFin<br />Simplifi</div>
        <a href="/home">Admin</a>
        <nav>
  <ul>
    <li>Trang chủ</li>
    <li>Giới thiệu</li>
    <li className="active">Nội dung</li>
    <li className="dropdown">
      Danh mục
      <ul className="dropdown-content">
        <a href="./components/danhmuc.jsx"> <li> Thêm Danh Mục</li> </a>
        <li>Danh Sách</li>
      </ul>
    </li>
    <li className="dropdown">
    Thêm Chi phí
      <ul className="dropdown-content">
        <li>Thêm Chi Phí</li>
        <li>Danh Sách</li>
      </ul>
    </li>  
    <li>Reports</li>
    <li>Investments</li>
    <li>Goals</li>
  </ul>
</nav>

        <div className="settings">Settings</div>
      </aside>
      <main className="main-content">
        <header>
          <input type="text" placeholder="Search or type command..." />
          <div className="user-profile">Jane ▼</div>
        </header>
        <section className="overview">
          <div className="income-spending">
            <div className="card">Income after bills & savings<br />$00,000</div>
            <div className="card selected">Planned Spending<br />$00,000</div>
            <div className="card">Other Spending<br />$00,000</div>
          </div>
          <div className="details">
            <div className="balance">$6,788.21<br /><span>Available</span><br /><small>$271.53 per day</small></div>
            <div className="pie-chart">
              <div className="chart"></div>
              <div className="legend">
                <span className="available"></span> Available
                <span className="planned-spending"></span> Planned spending
                <span className="other-spending"></span> Other spending
              </div>
            </div>
          </div>
        </section>
        <section className="expenses">
          <div className="category">
            <h2>Rent</h2>
            <p>Spending Category: Rent</p>
            <div className="expense-bar">
              <span>$18.00 left</span>
              <div className="bar">
                <div className="filled" style={{ width: "90%" }}></div>
              </div>
            </div>
            <div className="last-six-months">
              <h3>Last 6 months</h3>
              <div className="chart">
                <div className="bar" style={{ height: "50%" }}>$1000</div>
                <div className="bar" style={{ height: "80%" }}>$800</div>
                <div className="bar" style={{ height: "60%" }}>$600</div>
                <div className="bar" style={{ height: "70%" }}>$700</div>
                <div className="bar" style={{ height: "90%" }}>$900</div>
                <div className="bar" style={{ height: "40%" }}>$400</div>
              </div>
            </div>
          </div>
          <div className="transactions">
            <h3>Transactions</h3>
            <table>
              <thead>
                <tr>
                  <th>Account</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Payee</th>
                  <th>Category</th>
                  <th>Tags</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>REITS</td>
                  <td>3 Mar 24</td>
                  <td>-</td>
                  <td>Opening Balance</td>
                  <td>Groceries</td>
                  <td></td>
                  <td>$3,500.00</td>
                </tr>
                {/* More rows as needed */}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

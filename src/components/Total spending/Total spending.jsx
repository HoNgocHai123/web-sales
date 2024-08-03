// eslint-disable-next-line no-unused-vars
import React from "react";
import "./Total.css";

// Helper function to format numbers with commas
const formatNumber = (number) => {
  return number.toLocaleString();
};

function MonthlyExpenseSummary() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-9 Totalchi">
          <div>
            <h3>Tổng Ngân Sách</h3>
            <table className="input-container table table-bordered table-hover custom-table">
              <thead>
                <tr>
                  <th>Ngày Tháng</th>
                  <th>Ngân Sách</th>
                  <th>Chi tiêu</th>
                  <th>Số dư</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>12/09/2004</td>
                  <td>{formatNumber(24000000)}</td>
                  <td>{formatNumber(10000000)}</td>
                  <td>{formatNumber(14000000)}</td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonthlyExpenseSummary;

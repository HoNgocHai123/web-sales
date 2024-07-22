// eslint-disable-next-line no-unused-vars
import React from "react";

import "./Pages.css";
import { BarChart } from "@mui/x-charts/BarChart";
const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
];
function HomePages() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
        </div>
        <div className="col-md-10 abcb">
          <main className="main-content">
            <section className="overview">
              <div className="income-spending">
                <div className="card">
                  Income after bills & savings
                  <br />
                  $00,000
                </div>
                <div className="card ">
                  Planned Spending
                  <br />
                  $00,000
                </div>
                <div className="card">
                  Other Spending
                  <br />
                  $00,000
                </div>
              </div>
              <div className="details">
                <BarChart
                  width={800}
                  height={300}
                  series={[
                    { data: pData, label: "pv", id: "pvId", stack: "total" },
                    { data: uData, label: "uv", id: "uvId", stack: "total" },
                  ]}
                  xAxis={[{ data: xLabels, scaleType: "band" }]}
                />
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
                    <div className="bar" style={{ height: "50%" }}>
                      $1000
                    </div>
                    <div className="bar" style={{ height: "80%" }}>
                      $800
                    </div>
                    <div className="bar" style={{ height: "60%" }}>
                      $600
                    </div>
                    <div className="bar" style={{ height: "70%" }}>
                      $700
                    </div>
                    <div className="bar" style={{ height: "90%" }}>
                      $900
                    </div>
                    <div className="bar" style={{ height: "40%" }}>
                      $400
                    </div>
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
                    </tr>
                    {/* More rows as needed */}
                  </tbody>
                </table>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default HomePages;

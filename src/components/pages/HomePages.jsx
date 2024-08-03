import React from "react";
import "./Pages.css";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { BarChart } from "@mui/x-charts/BarChart";

const otherSetting = {
  height: 350,
  yAxis: [{ label: "rainfall (mm)" }],
  grid: { horizontal: true },
  sx: {
    [`& .${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translateX(-10px)",
    },
  },
};

const dataset = [
  { london: 59, paris: 57, newYork: 86, seoul: 21, month: "Tháng 1" },
  { london: 50, paris: 52, newYork: 78, seoul: 28, month: "Tháng 2" },
  { london: 47, paris: 53, newYork: 106, seoul: 41, month: "Tháng 3" },
  { london: 54, paris: 56, newYork: 92, seoul: 73, month: "Tháng 4" },
  { london: 57, paris: 69, newYork: 92, seoul: 99, month: "Tháng 5" },
  { london: 60, paris: 63, newYork: 103, seoul: 144, month: "Tháng 6" },
  { london: 59, paris: 60, newYork: 105, seoul: 319, month: "Tháng 7" },
  { london: 65, paris: 60, newYork: 106, seoul: 249, month: "Tháng 8" },
  { london: 51, paris: 51, newYork: 95, seoul: 131, month: "Tháng 9" },
  { london: 60, paris: 65, newYork: 97, seoul: 55, month: "Tháng 10" },
  { london: 67, paris: 64, newYork: 76, seoul: 48, month: "Tháng 11" },
  { london: 61, paris: 70, newYork: 103, seoul: 25, month: "Tháng 12" },
];

const valueFormatter = (value) => `${value}mm`;

function HomePages() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-10 abcv">
          <main className="main-content">
            <section className="overview">
              <div className="income-spending">
                <div className="card">
                  <h6>
                    <b>Tiền Phí Sinh Hoạt</b>
                  </h6>
                  <p>12.000.000</p>
                </div>
                <div className="card">
                  <h5>Tiền Nhà</h5>
                  <p>12.000.000</p>
                </div>
                <div className="card">
                  <h5>Tiền Nhà</h5>
                  <p>12.000.000</p>
                </div>
                <div className="card">
                  <h5>Tiền Nhà</h5>
                  <p>12.000.000</p>
                </div>
              </div>
              <div className="details">
                <BarChart
                  dataset={dataset}
                  xAxis={[
                    {
                      scaleType: "band",
                      dataKey: "month",
                      valueFormatter: (month, context) =>
                        context.location === "tick" ? month : month,
                    },
                  ]}
                  series={[
                    {
                      dataKey: "seoul",
                      label: "Seoul rainfall",
                      valueFormatter,
                    },
                  ]}
                  {...otherSetting}
                />
              </div>
            </section>
            <section className="transactions">
              <h3></h3>
              <table>
                <thead>
                  <tr>
                    <th>Ngày Tháng</th>
                    <th>Cài Đặt Ngân Sách</th>
                    <th>Tổng Chi Tiêu Hàng Tháng</th>
                    <th>Số Dư</th>
                    
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>12/07/2024</td>
                    <td>4.000.000</td>
                    <td>2.300.000</td>
                    <td>2.700.000</td>
                    
                  </tr>
                  {/* More rows as needed */}
                </tbody>
              </table>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default HomePages;

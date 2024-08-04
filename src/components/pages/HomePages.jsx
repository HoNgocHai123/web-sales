import React, { useEffect, useState } from "react";
import "./Pages.css";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { BarChart } from "@mui/x-charts/BarChart";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../firebase-config";
import Swal from "sweetalert2";

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

const formatNumber = (number) => {
  return number ? number.toLocaleString() : '0';
};

function HomePages() {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBudgets();
    fetchExpenses();
  }, []);

  const fetchBudgets = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'Budget'));
      const data = querySnapshot.docs.map((doc) => {
        const docData = doc.data();
        return {
          id: doc.id,
          ...docData,
          NgayThang: docData.NgayThang instanceof Timestamp
            ? docData.NgayThang.toDate().toISOString().split('T')[0] // YYYY-MM-DD
            : new Date(docData.NgayThang).toISOString().split('T')[0],
        };
      });
      setBudgets(data);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu ngân sách: ', error);
      Swal.fire({
        icon: 'error',
        title: 'Lỗi khi tải dữ liệu',
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchExpenses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Expense'));
      const data = querySnapshot.docs.map((doc) => {
        const docData = doc.data();
        return {
          id: doc.id,
          ...docData,
          NgayThang: docData.NgayThang instanceof Timestamp
            ? docData.NgayThang.toDate().toISOString().split('T')[0] // YYYY-MM-DD
            : new Date(docData.NgayThang).toISOString().split('T')[0],
        };
      });
      setExpenses(data);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu chi tiêu: ', error);
      Swal.fire({
        icon: 'error',
        title: 'Lỗi khi tải dữ liệu',
        text: error.message,
      });
    }
  };

  // Helper function to get YYYY-MM from YYYY-MM-DD
  const getMonthYear = (dateString) => dateString.slice(0, 7);

  // Group by month and calculate totals
  const calculateTotals = (budgets, expenses) => {
    const totals = {};

    // Process budgets
    budgets.forEach((budget) => {
      const monthYear = getMonthYear(budget.NgayThang);
      if (!totals[monthYear]) {
        totals[monthYear] = {
          budget: 0,
          expense: 0,
        };
      }
      totals[monthYear].budget += budget.SoTien || 0;
    });

    // Process expenses
    expenses.forEach((expense) => {
      const monthYear = getMonthYear(expense.NgayThang);
      if (!totals[monthYear]) {
        totals[monthYear] = {
          budget: 0,
          expense: 0,
        };
      }
      totals[monthYear].expense += expense.SoTien || 0;
    });

    // Convert totals to an array for rendering
    return Object.entries(totals).map(([monthYear, { budget, expense }]) => ({
      monthYear,
      budget,
      expense,
      balance: budget - expense,
    }));
  };

  const monthlyTotals = calculateTotals(budgets, expenses);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-10 abcv">
          <main className="main-content">
            <section className="overview">
                <h2>CHI TIÊU CỦA THÁNG</h2>
              <div className="income-spending">
                <div className="card">
                  <h6>
                    <b>Tiền Phí</b>
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
              <h3>Tổng Ngân Sách và Chi Tiêu</h3>
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
                  {monthlyTotals.map((total, index) => (
                    <tr key={index}>
                      <td>{total.monthYear}</td>
                      <td>{formatNumber(total.budget)}</td>
                      <td>{formatNumber(total.expense)}</td>
                      <td>{formatNumber(total.balance)}</td>
                    </tr>
                  ))}
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

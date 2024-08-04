import React, { useEffect, useState } from "react";
import "./Total.css";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../firebase-config";
import Swal from "sweetalert2";

const formatNumber = (number) => {
  return number ? number.toLocaleString() : '0';
};

function MonthlyExpenseSummary() {
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
          NgayThang: doc.NgayThang instanceof Timestamp
            ? doc.NgayThang.toDate().toISOString().split('T')[0] // YYYY-MM-DD
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
    <div className="container">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-9 Totalchi">
          <div>
            <h3>Tổng Ngân Sách</h3>
            <table className="input-container table table-bordered table-hover">
              <thead>
                <tr>
                  <th>Ngày Tháng</th>
                  <th>Ngân Sách</th>
                  <th>Chi tiêu</th>
                  <th>Số dư</th>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonthlyExpenseSummary;

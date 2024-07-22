// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { db } from '../firebase-config';
import { collection, getDocs } from "firebase/firestore";
import Admin from "../interface";
import "./Total.css"

function MonthlyExpenseSummary() {
  const [monthlyExpense, setMonthlyExpense] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Tháng mặc định là tháng hiện tại

  useEffect(() => {
    const fetchMonthlyExpense = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Expense"));
        let totalExpense = 0;

        querySnapshot.forEach(doc => {
          const expenseData = doc.data();
          const expenseMonth = new Date(expenseData.NgayThang).getMonth() + 1;

          if (expenseMonth === selectedMonth) {
            totalExpense += parseFloat(expenseData.SoTien);
          }
        });

        setMonthlyExpense(totalExpense);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchMonthlyExpense();
  }, [selectedMonth]);

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  return (
    <div className="container ">
      <div className="row">
        <div className="col-md-3">
          {/* Admin Component */}
          <Admin />
        </div>
        <div className="col-md-9 Totalchi">
          {/* Main Content */}
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Tổng chi phí tháng {selectedMonth}</h2>
              <p className="card-text">{monthlyExpense} VNĐ</p>

              <form >
                <div className="mb-3">
                  <label htmlFor="selectMonth" className="form-label">Chọn tháng:</label>
                  <select id="selectMonth" className="form-select" value={selectedMonth} onChange={handleMonthChange}>
                    <option value={1}>Tháng 1</option>
                    <option value={2}>Tháng 2</option>
                    <option value={3}>Tháng 3</option>
                    <option value={4}>Tháng 4</option>
                    <option value={5}>Tháng 5</option>
                    <option value={6}>Tháng 6</option>
                    <option value={7}>Tháng 7</option>
                    <option value={8}>Tháng 8</option>
                    <option value={9}>Tháng 9</option>
                    <option value={10}>Tháng 10</option>
                    <option value={11}>Tháng 11</option>
                    <option value={12}>Tháng 12</option>
                  </select>
                </div>               
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonthlyExpenseSummary;

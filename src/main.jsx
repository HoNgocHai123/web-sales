// eslint-disable-next-line no-unused-vars
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import Category from './components/Category/Category.jsx';
import Expense from './components/expense/expense.jsx';
import ExpenseList from './components/expense/ExpenseList.jsx';
import ListComponent from './components/Category/CategoryList.jsx';
import SignUp from './components/auth/SignUp.jsx';
import SignIn from './components/auth/SignIn.jsx';
import MonthlyExpenseSummary from './components/Total spending/Total spending.jsx';
import HomePages from './components/pages/HomePages.jsx';
import Interface from './components/interface.jsx';
import UserList from './components/pagesAdmin/UserList.jsx';
import EditCategory from './components/Category/CategoryEdit.jsx';
import EditExpense from './components/expense/EditExpense.jsx';
import Budget from './components/Budget/Budget.jsx';
import BudgetList from './components/Budget/BudgetList.jsx';
import BudgetEdit from './components/Budget/BudgetEdit.jsx';


const router = createBrowserRouter([
  {
    element:<Interface></Interface>,
    children: [
      {
        path:"/category",
        element:<Category></Category>
       },
      {
          path:"/categorylist",
          element:<ListComponent></ListComponent>
      },
      {
        path:"/EditCategory/:id",
        element:<EditCategory></EditCategory>
      },
      {
        path:"/expense",
        element:<Expense></Expense>
       },
       {
        path:"/expenseList",
        element:<ExpenseList></ExpenseList>
       },
       {
        path:"/EditExpense/:id",
        element:<EditExpense></EditExpense>
      },
      {
        path:"/Budget",
        element:<Budget></Budget>
      },
      {
        path:"/BudgetList",
        element:<BudgetList></BudgetList>
      },
      {
        path:"/BudgetEdit/:id",
        element:<BudgetEdit></BudgetEdit>
      },
      {
        path:"/userList",
        element:<UserList></UserList>
      },
      {
        path:"/HomePages",
        element:<HomePages></HomePages>
      },
      {
        path:"/Total",
        element:<MonthlyExpenseSummary></MonthlyExpenseSummary>
      },
    ],
  },
     

 {
    path:"/",
    element:<App></App>
  },

{
  path:"/signup",
  element:<SignUp></SignUp>
},
{
  path:"/signin",
  element:<SignIn></SignIn>
},









]); 
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>,
)

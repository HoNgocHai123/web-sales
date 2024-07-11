// eslint-disable-next-line no-unused-vars
import React from "react";
import "./App.css";

function danhmucList() {
  return (
    <div className="App">
      <h1>Todo List App</h1>
      <div className="input-container">
        <input type="text" placeholder="Enter Task Title"  
        />
        <button>
          
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Danh mục</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td></td>
              <td></td>
              <td>
                <button>✏️</button>
                <button>🗑️</button>
              </td>
            </tr>
          
        </tbody>
      </table>
    </div>
  );
}

export default danhmucList;

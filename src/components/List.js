import React, { useState } from "react";
import "./List.css";
const List = (props) => {
  const [items, setItems] = useState([]);
  const [todo, setTodo] = useState("");

  const logout = () => {
    localStorage.removeItem("user");
    props.setUser(null);
  };

  const newItem = (e) => {
    e.preventDefault();
    const newTodo = {
      id: items.length + 1,
      task: "",
    };
    setItems([...items, newTodo]);
  };
  return (
    <div className="List container">
      <button className="btn-logout" onClick={logout}>
        Logout
      </button>
      <h1>
        My <span className="primary-color">To-Do</span> List
      </h1>
      <form>
        <div className="form-input">
          <div className="form-field">
            <div className="input-field">
              <i className="fas fa-search"></i>
              <input
                type="text"
                name="newItem"
                autoComplete="off"
                maxLength={25}
                /*       value={formData.email}
                onChange={handleChange} */
                placeholder="Search"
              />
            </div>
          </div>
          <button className="btn" onClick={newItem}>
            New
          </button>
        </div>
        <div className="form-items">
          <ul>
            {items.length > 0 &&
              items.map((item) => (
                <li key={item.id}>
                  <div className="task">{item.task}</div>
                  <div className="actions">
                    <button className="btn">
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                    <button className="btn">
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </form>
    </div>
  );
};

export default List;

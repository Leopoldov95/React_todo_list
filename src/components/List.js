import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./List.css";
const List = (props) => {
  const [items, setItems] = useState([]);
  const [display, setDisplay] = useState(items);
  useEffect(() => {
    if (localStorage.getItem("todo")) {
      setItems(JSON.parse(localStorage.getItem("todo")));
    } else {
      localStorage.setItem("todo", JSON.stringify(items));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(items));
    setDisplay(items);
  }, [items]);
  const logout = () => {
    localStorage.removeItem("user");
    props.setUser(null);
  };

  const newItem = (e) => {
    e.preventDefault();
    const newTodo = {
      id: uuidv4(),
      isEdit: true,
      task: "",
    };
    setItems([...items, newTodo]);
  };

  const handleSearch = async (e) => {
    const regex = new RegExp("" + e.target.value + "", "i");
    setDisplay(items.filter((item) => regex.test(item.task)));
  };
  const handleChange = (e) => {
    setItems(
      [...items].map((item) => {
        if (item.id === e.target.id) {
          return {
            ...item,
            [e.target.name]: e.target.value,
          };
        } else return item;
      })
    );
  };

  const toggleEdit = (e) => {
    e.preventDefault();
    setItems(
      [...items].map((item) => {
        if (item.id === e.target.id) {
          if (item.task.length < 1) {
            return item;
          }
          return {
            ...item,
            isEdit: !item.isEdit,
          };
        } else return item;
      })
    );
  };

  const deleteItem = (e) => {
    e.preventDefault();
    setItems(items.filter((item) => item.id !== e.target.id));
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
                /*  value={search} */
                onChange={handleSearch}
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
            {display.length > 0 &&
              display.map((item) => (
                <li key={item.id}>
                  {!item.isEdit ? (
                    <>
                      <div className="task">{item.task}</div>
                      <div className="actions">
                        <button
                          id={item.id}
                          onClick={toggleEdit}
                          className="btn-action"
                        >
                          <i id={item.id} className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          id={item.id}
                          onClick={deleteItem}
                          className="btn-action"
                        >
                          <i id={item.id} className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="task-edit">
                        <input
                          value={item.task}
                          onChange={handleChange}
                          placeholder="Type Todo"
                          name="task"
                          maxLength={25}
                          id={item.id}
                        />
                      </div>
                      <div className="actions">
                        <button
                          className="btn"
                          id={item.id}
                          onClick={toggleEdit}
                        >
                          Save
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </form>
    </div>
  );
};

export default List;

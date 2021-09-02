import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import List from "./components/List";
function App() {
  const [user, setUser] = useState(localStorage.getItem("user"));
  return (
    <div className="App">
      {!user ? <Login setUser={setUser} /> : <List setUser={setUser} />}
    </div>
  );
}

export default App;

import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import List from "./components/List";
function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  return (
    <div className="App">
      {!isLoggedIn ? <Login setisLoggedIn={setisLoggedIn} /> : <List />}
    </div>
  );
}

export default App;

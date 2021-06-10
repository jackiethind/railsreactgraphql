import "./styles/output.css";
import Users from "./components/Users";
import User from "./components/User";
import React, { useState } from "react";

function App(props) {
  console.dir(props);

  return (
    <div className="container mx-auto px-4">
      <Users />
    </div>
  );
}

export default App;

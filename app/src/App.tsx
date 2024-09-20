import "./App.css";

import React from "react";
import { useEffect, useState } from "react";

import { dbEntry } from "./types";
import api from "./services/api";

const App: React.FC = () => {
  const [entries, setEntries] = useState([]);

  // fetch full data from api
  useEffect(() => {
    api
      .getAll()
      .then((response: { data: dbEntry[] }) => {
        setEntries(response.data);
      })
      .catch((error: Error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>usd2bcv</h1>
      <p>Quickly compare USD to Bs. across time</p>

      <h2>Bs. D vs USD</h2>
      <p>Chart</p>
    </div>
  );
};

export default App;

import "./App.css";

import React from "react";
import { useEffect, useState } from "react";

import { dbEntry } from "./types";
import api from "./services/api";

import Chart from "./components/Chart";

const App: React.FC = () => {
  const [entries, setEntries] = useState<dbEntry[]>([]);

  // fetch full data from api on component mount
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
    <>
      <header>
        <h1>usd2bcv</h1>
        <p>Quickly compare USD to Bs. across time</p>
      </header>

      <main>
        <h2>Bs. D vs USD</h2>
        <Chart data={entries} />
      </main>

      <footer>
        <p>footer</p>
      </footer>
    </>
  );
};

export default App;

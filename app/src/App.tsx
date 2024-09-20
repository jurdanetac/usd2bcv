import "./App.css";

import React from "react";

import Chart from "./components/Chart";

import { dbEntry } from "./types";
import { isBsD } from "./utils";
import data from "./data.ts";

const App: React.FC = () => {
  const show: dbEntry[] = data().filter(isBsD);

  return (
    <>
      <header>
        <h1>usd2bcv</h1>
        <p>Quickly compare USD to Bs. across time in your browser</p>
        <p>Updated to: {show[show.length - 1].date}</p>
        <p>
          Powered by <a href="https://www.bcv.org.ve/">BCV</a> data
        </p>
      </header>

      <main>
        <h2>Bs. D vs USD</h2>
        <Chart data={show} />
      </main>

      <footer>
        <p>footer</p>
      </footer>
    </>
  );
};

export default App;

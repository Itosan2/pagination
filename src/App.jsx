import { useState } from "react";
import RenderData from "./components/RenderData";
import DataPage from "./components/DataPage";
// import "./App.css";
import Pagination from "./components/Pagination";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div className="App-header">
        {/* <Pagination /> */}
        <DataPage />
      </div>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";

const DataPage = () => {
  //   Provide these three info for Pagination and
  //   RenderDat [can refactor RenderData further]
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Pagination
        data={data}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};
export default DataPage;

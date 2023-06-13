import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import ErrorBoundary from "./ErrorBoundary";

const RenderData = ({ currentItems }) => {
  //   const [data, setData] = useState([]);
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const [itemsPerPage, setItemsPerPage] = useState(5);

  //   useEffect(() => {
  //     fetch("https://jsonplaceholder.typicode.com/todos")
  //       .then((response) => response.json())
  //       .then((json) => setData(json));
  //   }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1> Todo List</h1>
      {/* <ErrorBoundary fallback="there is an error"> */}
      <ul style={{ listStyleType: "none" }}>
        {currentItems.map((todo, index) => {
          return (
            <li key={index}>
              {todo.id} - {todo.title}
            </li>
          );
        })}
      </ul>
      {/* </ErrorBoundary> */}
    </div>
  );
};

export default RenderData;

import React, { useEffect, useState } from "react";
import RenderData from "./RenderData";
import "./style.css";

const Pagination = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(1);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit - 1) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage == number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  console.log(data);
  const handleNextBtn = () => {
    if (currentPage == pages.length) {
      return;
    }
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevBtn = () => {
    if (currentPage == 1) {
      return;
    }
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const handleNextBtn2 = () => {
    if (pages.length > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
      setCurrentPage(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevBtn2 = () => {
    setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
    setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    setCurrentPage(minPageNumberLimit - pageNumberLimit);
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextBtn2}> &hellip;</li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit > 1) {
    pageDecrementBtn = <li onClick={handlePrevBtn2}> &hellip;</li>;
  }

  const handleLoadMore = () => {
    setItemsPerPage(itemsPerPage + 5);
  };

  return (
    <div className="pagination-container">
      <h1> Todo List</h1>
      <br />
      {/* <RenderData currentItems={currentItems} data={data} /> */}

      <ul className="pageNumbers">
        <li
          onClick={handlePrevBtn}
          disabled={currentPage == pages[0]}
          className={`${currentPage === 1 ? "disabled" : ""}`}
        >
          {/* <button onClick={handlePrevBtn} disabled={currentPage == pages[0]}> */}
          Prev
          {/* </button> */}
        </li>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}
        <li
          onClick={handleNextBtn}
          disabled={currentPage == pages.length}
          className={`${currentPage === pages.length ? "disabled" : ""}`}
        >
          Next
        </li>
      </ul>
      {/* <button className="loadmore" onClick={handleLoadMore}>
        Load More
      </button> */}
    </div>
  );
};

export default Pagination;

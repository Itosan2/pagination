import React, { useEffect, useState } from "react";
import RenderData from "./RenderData";
import "./style.css";

// Note : call component to pass the following props :
// data , currentPage, setCurrentPage, itemsPerPage
// RenderData to receive the currentItems props and render styled display data

const Pagination = ({
  data,
  currentPage = { currentPage },
  setCurrentPage = { setCurrentPage },
  itemsPerPage = { itemsPerPage },
}) => {
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

  const handlePageIncrement = () => {
    if (pages.length > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
      setCurrentPage(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePageDecrement = () => {
    setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
    setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    setCurrentPage(minPageNumberLimit - pageNumberLimit);
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handlePageIncrement}> &hellip;</li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit > 1) {
    pageDecrementBtn = <li onClick={handlePageDecrement}> &hellip;</li>;
  }

  // const handleLoadMore = () => {
  //   setItemsPerPage(itemsPerPage + 5);
  // };

  return (
    <div className="pagination-container">
      {/* <h1> Todo List</h1> */}
      <br />
      <RenderData currentItems={currentItems} />

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

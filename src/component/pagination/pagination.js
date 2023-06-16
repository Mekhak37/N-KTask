import React from "react";
import ReactPaginate from "react-paginate";
import "./pagination.css";
const PaginatedItems = ({ itemsPerPage, totalCount, setElectedPage }) => {
  const pageCount = Math.ceil(totalCount / itemsPerPage);
  const handlePageClick = (event) => {
    setElectedPage(event.selected + 1);
  };

  return (
    <>
      <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel="..."
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </>
  );
};
export default PaginatedItems;

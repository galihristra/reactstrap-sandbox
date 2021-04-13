import React, { useEffect, useState } from "react";
import { Button, ButtonGroup } from "reactstrap";
import PropTypes from "prop-types";

const CustomPagination = ({ totalItems, pageSize, maxPages, onChangePage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [startIndex, setStartIndex] = useState(null);
  const [endIndex, setEndIndex] = useState(null);

  // ? calculate total pages
  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / pageSize));
  }, [totalPages, pageSize, totalItems]);

  useEffect(() => {
    const calculateStartEnd = () => {
      if (totalPages <= maxPages) {
        // total pages less than max so show all pages
        setStartPage(1);
        setEndPage(totalPages);
      } else {
        // total pages more than max so calculate start and end pages
        let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
        let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
        if (currentPage <= maxPagesBeforeCurrentPage) {
          // current page near the start
          setStartPage(1);
          setEndPage(maxPages);
        } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
          // current page near the end
          setStartPage(totalPages - maxPages + 1);
          setEndPage(totalPages);
        } else {
          // current page somewhere in the middle
          setStartPage(currentPage - maxPagesBeforeCurrentPage);
          setEndPage(currentPage + maxPagesAfterCurrentPage);
        }
      }
    };
    const generatePages = () => {
      setPages(
        Array.from(Array(endPage + 1 - startPage).keys()).map(
          (i) => startPage + i
        )
      );
    };
    calculateStartEnd();
    generatePages();
  }, [totalPages, maxPages, currentPage, startPage, endPage]);

  // calculate start and end item indexes
  useEffect(() => {
    setStartIndex((currentPage - 1) * pageSize);
    setEndIndex(Math.min(startIndex + pageSize - 1, totalItems - 1));
    onChangePage(startIndex, endIndex);
  }, [currentPage, pageSize, startIndex, totalItems, endIndex, onChangePage]);

  // ensure current page isn't out of range
  useEffect(() => {
    if (currentPage < 1) {
      setCurrentPage(1);
    } else if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <ButtonGroup size="sm" color="secondary" style={{ float: "right" }}>
      {currentPage !== 1 && (
        <>
          <Button color="outline-secondary" onClick={() => setCurrentPage(1)}>
            First
          </Button>
          <Button
            color="outline-secondary"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </Button>
        </>
      )}
      {pages.map((page) => {
        return (
          <Button
            key={page}
            color={page === currentPage ? "primary" : "outline-secondary"}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Button>
        );
      })}
      {currentPage !== totalPages && (
        <>
          <Button
            color="outline-secondary"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
          <Button
            color="outline-secondary"
            onClick={() => setCurrentPage(totalPages)}
          >
            Last
          </Button>
        </>
      )}
    </ButtonGroup>
  );
};

CustomPagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  pageSize: PropTypes.number,
  maxPages: PropTypes.number
};

CustomPagination.defaultProps = {
  pageSize: 10,
  maxPages: 5
};

export default CustomPagination;

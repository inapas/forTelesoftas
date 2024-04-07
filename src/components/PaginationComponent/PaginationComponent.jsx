import React from 'react';

const PaginationComponent = ({totalPages, currentPage, isLastPage, onPageChange }) => {
  return (
    <div>
      <div>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage <= 1}>
        Previous
      </button>
      <button>{currentPage} out of {totalPages}</button>
      <button onClick={() => onPageChange(currentPage + 1)} disabled={isLastPage}>
        Next
      </button>
      </div>
    </div>
  );
};


export default PaginationComponent;

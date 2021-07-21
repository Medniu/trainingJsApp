import React from 'react';

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
    const pageCount = Math.ceil(itemsCount / pageSize);
    const pages = [...Array(pageCount).keys()].map(x => x+1);

    return (
        <div className="pagination">
            {pages.map(page => (
                <button
                    key = {page} 
                    onClick={() => onPageChange(page)}
                    className={page === currentPage ? 'active' : 'page-item'}>
                    {page}                    
                </button>
            ))}
        </div>
    )
}

export default Pagination;
import React from 'react';
import Item from './item';
import Pagination from './pagination';

const Home = ({ itemList, pageNumber, itemsPerPage, setPageNumber, itemsCount }) => {
    const items = itemList.map((item) => (
        <Item
            key = {item._id}
            price = {item.price}
            picture = {item.picture}
            name = {item.name}
        />
    ));

    return (
        <section id="home">
        <div className="content">
                <p>ELC Coding Test...</p>
        </div>
        <div>
            <div>
                {items}
            </div>
            <div>
                <Pagination itemsCount={itemsCount} pageSize={itemsPerPage} currentPage={pageNumber} onPageChange={setPageNumber}> </Pagination>
            </div>
        </div>
     </section>
    )
}; 
export default Home;


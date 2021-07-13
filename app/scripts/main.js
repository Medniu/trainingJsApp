import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

import Menu from './components/menu';
import Home from './components/home';

const App = () => {
    const [itemList, setItemList] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [itemsPerPage] = useState(4);

    return (
        <div className="App">
            <Menu pageNumber = {pageNumber} itemsPerPage = {itemsPerPage} setItemList = {setItemList} setPageNumber = {setPageNumber} />
            <Home itemList = {itemList} pageNumber = {pageNumber} itemsPerPage = {itemsPerPage} setPageNumber = {setPageNumber}/>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

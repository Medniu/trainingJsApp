import React, {useState, useEffect} from 'react';
import useDebounce from '../hooks/useDebounce';
import Item from './item';

const Menu = () => {
    const [showingSearch, setShowingSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [itemList, setItemList] = useState([]);
    const [amountOfRows, setAmountOfRows] = useState(1);
    const [itemsPerRow, setItemsPerRow] = useState(4);
    const debounceSearchTerm = useDebounce(searchTerm,300);
    
    const showSearchContainer = (e) => {
        e.preventDefault();
        setAmountOfRows(1);
        setShowingSearch(!showingSearch)

    }
    const onLoadMore = () =>{
        setAmountOfRows(prev => prev + 1);
    }

    const onSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    async function fetchDataFromServe(){
        const response = await fetch(`http://localhost:3035/?searchTerm=${debounceSearchTerm}&amountOfRows=${amountOfRows}&itemsPerRow=${itemsPerRow}`,
        {
            method:"GET",
        });
        const result = await response.json();
        console.log(result);
        setItemList(result);
    }
    
    useEffect(()=>{

        fetchDataFromServe();

    },[debounceSearchTerm,amountOfRows])


    const items = itemList.map((item) => (
        <Item
            key = {item._id}
            price = {item.price}
            picture = {item.picture}
            name = {item.name}
        />
    ));

    return (
        <header className="menu">
            <div className="menu-container">
                <div className="menu-holder">
                    <h1>ELC</h1>
                    <nav>
                        <a href="#" className="nav-item">HOLIDAY</a>
                        <a href="#" className="nav-item">WHAT'S NEW</a>
                        <a href="#" className="nav-item">PRODUCTS</a>
                        <a href="#" className="nav-item">BESTSELLERS</a>
                        <a href="#" className="nav-item">GOODBYES</a>
                        <a href="#" className="nav-item">STORES</a>
                        <a href="#" className="nav-item">INSPIRATION</a>
                        <button onClick={()=> onLoadMore()}> LoadMore </button>

                        <a href="#" onClick={(e) => showSearchContainer(e)}>
                            <i className="material-icons search">search</i>
                        </a>
                    </nav>
                </div>
            </div>
            <div className={(showingSearch ? "showing " : "") + "search-container"}>
                <input type="text" onChange={(e) => onSearch(e)} />
                <a href="#" onClick={(e) => showSearchContainer(e)}>
                    <i className="material-icons close">close</i>
                </a>
            </div>
            <div>
                {items}
            </div>
        </header>
    )
}

export default Menu;
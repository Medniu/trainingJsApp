import React, { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';
import { serverRequest } from '../utils';
import { URL, DEBOUNCE_TIME } from '../constants/index';

const subMenu = ["HOLIDAY", "WHAT'S NEW", "PRODUCTS", "BESTSELLERS", "GOODBYES", "STORES", "INSPIRATION"];

const Menu = ({ setItemList, pageNumber, itemsPerPage, setPageNumber, setItemsCount }) => {
    const [showingSearch, setShowingSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const debounceSearchTerm = useDebounce(searchTerm, DEBOUNCE_TIME);
    
    const showSearchContainer = (e) => {
        e.preventDefault();
        setShowingSearch(!showingSearch)
    }

    const onSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    async function fetchDataFromServe(){
        const response = await serverRequest(URL, `?searchTerm=${debounceSearchTerm}&itemsPerPage=${itemsPerPage}&pageNumber=${pageNumber}`, "GET")
        const result = await response.json();
        setItemList(result.items);
        setItemsCount(result.amountOfItems);
    }

    useEffect(()=>{
        fetchDataFromServe();
        setPageNumber(1);
    },[debounceSearchTerm])

    useEffect(()=>{
        fetchDataFromServe();
    },[pageNumber])

    return (
        <header className="menu">
            <div className="menu-container">
                <div className="menu-holder">
                    <h1>ELC</h1>
                    <nav>
                        {subMenu.map(names => <a href="#" className="nav-item" key={names}> {names} </a>)}
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
        </header>
    )
}

export default Menu;
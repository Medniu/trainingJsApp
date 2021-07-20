const data      = require('./data');
const http      = require('http');
const hostname  = 'localhost';
const port      = 3035;

const url = require('url');
const express   = require("express");
const cors = require("cors")

const app = express();
app.use(cors());
app.get("/", (req, res) => {
    const { searchTerm, itemsPerPage, pageNumber } = req.query;

    if (!searchTerm){
        res = addHeadersAndStatus(200)(res);
        const amountOfItems = data.length;
        const currentPageItems = data.slice((pageNumber-1)*itemsPerPage, itemsPerPage*pageNumber);
        
        const response = {items:currentPageItems, amountOfItems:amountOfItems}
        res.json(response);
    }
    else{     
        const result = data.filter((item) => {
            return item.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
                    || item.about.toLowerCase().includes(searchTerm.toLowerCase())
                    || item.tags.some(tag => tag.toLocaleLowerCase().includes(searchTerm.toLowerCase())); 
        });

        const amountOfItems = result.length
        const currentPageItems = result.slice((pageNumber-1)*itemsPerPage, itemsPerPage*pageNumber);
        res = addHeadersAndStatus(200)(res);

        const response = {items:currentPageItems, amountOfItems:amountOfItems}
        res.json(response);
    }
})
app.listen(port, () => console.log("serv is running"));

addHeadersAndStatus = (statusNumber) => (res) => {
    res.statusCode = statusNumber;
    res.setHeader('Access-Controll-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Credentials', true )
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Accept', 'application/json');
    return res;
}
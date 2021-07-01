const data      = require('./data');
const http      = require('http');
const hostname  = 'localhost';
const port      = 3035;

const url = require('url');
const express   = require("express");
const cors = require("cors")

const app = express();
app.use(cors());

app.get("/", (req, res)=> {

    const { searchTerm, amountOfRows, itemsPerRow  } = req.query;

    if (searchTerm){
            const result = data.filter((item) => {
                return item.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
                        || item.about.toLowerCase().includes(searchTerm.toLowerCase())
                        || item.tags.some(tag => tag.toLocaleLowerCase().includes(searchTerm.toLowerCase())); 
            }).slice(0, itemsPerRow*amountOfRows);

            res = addHeadersAndStatus(200)(res);
            res.json(result);
    }
    else{     
        res = addHeadersAndStatus(200)(res);
        const result = data.slice(0, itemsPerRow*amountOfRows);
        res.json(result);
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
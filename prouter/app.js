
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

const productRoutes = require("./api/product/product-routes");

//Common setup
//Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Cors Setting
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization");

    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "POST,GET");
        return res.status(200).json({});
    }
    next();
});

//Business api
app.use("/products", productRoutes);

//Dev enhancement
app.use(morgan("dev"));

//Error Handling
//Request Error Handling
app.use((req, res, next) => {
    const error = new Error("Page you are looking for is not found");
    error.status = 404;
    next(error);
});

//Common Error Handling
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message
    })
});

















module.exports = app;

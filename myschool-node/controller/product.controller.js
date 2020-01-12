const productService = require("../service/products.service");
const {BadRequestError} = require('../util/api-error.util')
const addProduct = async (req, res, next) => {
    console.log("add product called " + JSON.stringify(req.body));
    const data = req.body;
    try {
        if(!(data.name || data.category || data.description || data.version))
            throw new BadRequestError("Expected data not found in request body");
        let savedProduct = await productService.addProduct(data);
        res.status(201).send({id: savedProduct._id});
    } catch (error) {
        next(error);
    }

};

const getAllProducts = async (req, res, next)=> {
        try{
            console.log("product-controller: Get all products");
            res.status(200).send( await productService.getAllProducts());
        }catch(error){
            next(error)
        }
    }

module.exports = {
    addProduct,
    getAllProducts
}
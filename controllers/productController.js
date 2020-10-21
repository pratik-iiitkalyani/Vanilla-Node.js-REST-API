const Product = require('../models/productModel')

// @desc   Gets All products
// @route  GET /api/products
async function getProducts(req, res) {
    try {
        const products = await Product.getAllProducts()
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(products))
    } catch(err) {
        console.log(err)
    }
}

// @desc   Gets Single products
// @route  GET /api/products/:id
async function getProduct (req, res, id) {
    try {
        const product = await Product.getProductById(id)
        // console.log("product", product)
        if (!product) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({ message: "product not found"}))
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(product))
        }
    } catch(err) {
        console.log(err)
    }
}


module.exports = {
    getProducts,
    getProduct
}
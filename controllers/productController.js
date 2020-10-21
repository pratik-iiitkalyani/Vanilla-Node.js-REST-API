const Product = require('../models/productModel')
const { getPostData } = require('../utlis')

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

// @desc   create products
// @route  POST /api/products
async function createProduct(req, res, id) {
    try {
        const body = await getPostData(req)

        const { title, description, price } = JSON.parse(body)

        const product = {
            title,
            description,
            price
        }

        const newProduct = await Product.createProduct(product)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newProduct)) 

    } catch (error) {
        console.log(error)
    }
}

// @desc   update a products
// @route  PUT /api/products/:id
async function updateProduct(req, res, id) {
    try {

        const product = await Product.findById(id)

        if(!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Product Not Found' }))
        } else {
            const body = await getPostData(req)

            const { title, description, price } = JSON.parse(body)

            const productData = {
                title: title || product.title,
                description: description || product.description,
                price: price || product.price
            }

            const updProduct = await Product.updateProduct(id, productData)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(updProduct)) 
        }

    } catch (error) {
        console.log(error)
    }
}

// @desc    Delete Product
// @route   DELETE /api/product/:id
async function deleteProduct(req, res, id) {
    try {
        const product = await Product.getProductById(id)

        if(!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Product Not Found' }))
        } else {
            await Product.deleteProduct(id)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: `Product ${id} removed` }))
        }
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}
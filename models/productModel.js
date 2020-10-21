const products = require('../data/products.json')

function getAllProducts() {
    return new Promise((resolve, reject) => {
        resolve(products)
    })
}

function getProductById(id) {
    return new Promise((resolve, reject) => {
        const product = products.find((p) => p.id === id)
        resolve(product)
    })
}

module.exports = {
    getAllProducts,
    getProductById
}

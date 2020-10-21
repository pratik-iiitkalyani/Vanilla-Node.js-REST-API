const products = require('../data/products.json')

const { v4: uuidv4 } = require('uuid')

const { writeDataToFile } = require('../utlis')

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

function createProduct(product) {
    return new Promise((resolve, reject) => {
        const newProduct = {id: uuidv4(), ...product}
        products.push(newProduct)
        writeDataToFile('./data/products.json', products)
        resolve(newProduct)
    })
}

function updateProduct(id, product) {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((p) => p.id === id)
        products[index] = {id, ...product}
        writeDataToFile('./data/products.json', products)
        resolve(products[index])
    })
}

function deleteProduct(id) {
    return new Promise((resolve, reject) => {
        products = products.filter((p) => p.id !== id)
        writeDataToFile('./data/products.json', products)
        resolve()
    })
}


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}

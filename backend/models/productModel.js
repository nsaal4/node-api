let products = require('../data/products.json')
const { v4: uuidv4 } = require('uuid');
const {writeDataToFile} = require('../utils')

// returns all products
function findAll() {
    return new Promise((resolve, reject) => {
        resolve(products)
    })
}

// returns single product
function findById(id) {
    return new Promise((resolve, reject) => {
        const product = products.find((prod) => prod.id === id)
        resolve(product)
    })
}

// create a product
function create(product) {
    return new Promise((resolve, reject) => {
        const newProduct = {id: uuidv4(), ...product}
        products.push(newProduct)
        writeDataToFile('./data/products.json', products)
        resolve(newProduct)
    })
}

// update a product
function update(id, product) {
    return new Promise((resolve, reject) => {
        // find the index of a product
        const index = products.findIndex((prod) => prod.id === id)

        products[index] = {id, ...product}

        writeDataToFile('./data/products.json', products)
        resolve(products[index])
    })
}

// delete a product
function remove(id) {
    return new Promise((resolve, reject) => {
        // return products not equals to specified id
        products = products.filter((prod) => prod.id !== id)

        writeDataToFile('./data/products.json', products)
        resolve()
    })
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}
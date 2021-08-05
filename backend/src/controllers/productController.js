const Product = require('../models/productModel.js')
const { getPostData } = require('../../utils/utils.js')

// @desc gets all products
// @route GET /api/products
async function getProducts(req, res) {
    try {
        const products = await Product.findAll()
        if(!products) {
            res.writeHead(400, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Product Not Found'}))
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(products))
        }
    } catch (error) {
        console.log(error)
    }
}

// @desc gets single product
// @route GET /api/products/:id
async function getProduct(req, res, id) {
    try {
        const product = await Product.findById(id)
        if(!product) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Product Not Found'}))
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(product))
        }
    } catch (error) {
        console.log(error)
    }
}

// @desc create a product
// @route POST /api/products
async function createProduct(req, res) {
    try {
        // gets body data
        const body = await getPostData(req)
        const { name, price, category} = JSON.parse(body)

        const product = {
            name,
            price,
            category
        }

        // creates new product
        const newProduct = await Product.create(product)

        res.writeHead(201, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(newProduct))

    } catch (error) {
        console.log(error)
    }
}

// @desc update a product
// @route PUT /api/products/:id
async function updateProduct(req, res, id) {
    try {
        // check if a product exists
        const product = Product.findById(id)

        if (!product) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Product Not Found'}))
        } else {
            const body = await getPostData(req)
            const { name, price, category} = JSON.parse(body)

            const productData = {
                name: name || product.name,
                price: price || product.price,
                category: category || product.category
            }

            // update a product
            const updatedProduct = await Product.update(id, productData)

            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(updatedProduct))
            }
    } catch (error) {
        console.log(error)
    }
}

// @desc delete a product
// @route DELETE /api/products/:id
async function deleteProduct(req, res, id) {
    try {
        // check if a product exists
        const product = await Product.findById(id)

        if(!product) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Product Not Found'}))
        } else {
            await Product.remove(id)
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(`Product ${id} deleted`))
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
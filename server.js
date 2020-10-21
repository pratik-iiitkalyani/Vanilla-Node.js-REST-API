const http = require('http')
const { getProducts, getProduct } = require('./controllers/productController')

// create server
const server = http.createServer((req, res) => {
    // res.statusCode = 200
    // res.setHeader('Content-Type', 'text/html')
    // res.write('<h1>Hello World!</h1>')
    // res.end()

    if (req.url === '/api/products' && req.method === 'GET') {
        getProducts(req, res)
    } else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[3]
        // console.log("id", id)
        getProduct(req, res, id)
    }   
    else {
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({ message : "Route not found"}))
    }
    // res.write(JSON.stringify(products))
    // res.end()
})


// in express
// '/api/products/:id'
// req.params.id -access the product

const PORT = process.env.PORT || 5000

server.listen(PORT, ()=> console.log(`server running on port ${PORT}`))
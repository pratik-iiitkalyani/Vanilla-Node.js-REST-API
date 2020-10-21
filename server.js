const http = require('http')
const products = require('./data/products.json')

// create server
const server = http.createServer((req, res) => {
    // res.statusCode = 200
    // res.setHeader('Content-Type', 'text/html')
    // res.write('<h1>Hello World!</h1>')
    // res.end()

    if (req.url === '/api/products' && req.method === 'GET') {
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(products))
    } else {
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({ message : "Route not found"}))
    }
    // res.write(JSON.stringify(products))
    // res.end()
})

const PORT = process.env.PORT || 5000

server.listen(PORT, ()=> console.log(`server running on port ${PORT}`))
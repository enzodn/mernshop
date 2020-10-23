import express from 'express'
import dotenv from 'dotenv'
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import {errorHandler, notFound} from "./middleware/errorMiddleware.js";

dotenv.config()

connectDB()

const app = express()

app.get('/', (req, res) => {
    res.send('API is running')
})

app.use('/api/products', productRoutes)
app.use(notFound)
app.use(errorHandler)

/*
app.get('/api/products', (req, res) => {
    res.send(products)
})

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p._id === req.params.id)
    res.send(product)
})
 */

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
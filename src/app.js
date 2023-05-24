import express from 'express';
import { ProductManager } from "./managers/productManager.js";

const app = express();
const productManager = new ProductManager('./src/data/products.json');

app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.get('/products', async (req, res) => {
    try {
        const {limit} = req.query;
        const products = await productManager.getProducts();
        const limitValue = parseInt(limit) >= 0 ? parseInt(limit) : products.length;
        res.send({products: products.slice(0, limitValue)});
    } catch (error) {
        res.status(500).send({status: 0, msg: error.message});
    }
});

app.get('/products/:productId', async (req, res) => {
    try {
        const productId = parseInt(req.params.productId);
        const product = await productManager.getProductById(productId)
        res.send({product});
    } catch (error) {
        res.status(404).send({status: 0, msg: error.message});
    }
});

const port = 8080;
app.listen(port, () => console.log(`Server On ${port}`));
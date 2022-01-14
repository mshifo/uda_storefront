import { Router, Request, Response } from 'express'
import AuthenticateMiddleware from '../middlewares/AuthenticateMiddleware'
import ProductCreateSchema from '../middlewares/schemas/ProductsSchema'
import ValidateMiddleware from '../middlewares/ValidateMiddleware'
import ProductModel from '../models/Product.model'
// import ProductInterface from '../interfaces/Product'
import Product from '../models/Product.model'

const productsApi = Router()

productsApi.get('/', async (req: Request, res: Response) => {
  try {
    const products = await Product.all()
    res.send(products)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!' })
  }
})

productsApi.get('/:id', async (req: Request, res: Response) => {
  try {
    const product = await Product.find(req.params.id)
    res.status(product ? 200 : 404).send(product ?? { message: 'Product Not found' }) // ternary operator
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!' })
  }
})

/**
 * create
 */
productsApi.post(
  '/',
  [AuthenticateMiddleware, ValidateMiddleware(ProductCreateSchema)],
  async (req: Request, res: Response) => {
    try {
      const newProduct = await ProductModel.add(req.body)
      res.json(newProduct)
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Something went wrong!' })
    }
  }
)

export default productsApi

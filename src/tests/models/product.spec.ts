import Product from '../../interfaces/Product'
import ProductModel from '../../models/Product.model'

let product: Product
const productToAdd: Product = {
  name: 'Apple',
  price: 1.5
}
describe('Testing Product Model', () => {
  it('Test add method', async () => {
    expect(ProductModel.add).toBeDefined()
    product = await ProductModel.add(productToAdd)
    expect({
      name: product.name,
      price: product.price
    }).toEqual({
      name: product.name,
      price: product.price
    })
  })
  it('Test all method', async () => {
    expect(ProductModel.all).toBeDefined()
    const result = await ProductModel.all()
    expect(result).toContain(product)
  })

  it('Test find method', async () => {
    expect(ProductModel.find).toBeDefined()
    const result = await ProductModel.find(product.id as number)
    expect(result).toEqual(product)
  })

  it('Test find method | null', async () => {
    const result = await ProductModel.find(99999)
    expect(result).toBeNull()
  })
})

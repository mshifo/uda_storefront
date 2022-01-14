import express, { Application } from 'express'
import morgan from 'morgan'
import routes from './handlers'
import config from './helpers/config'

const PORT = config.port || 3000
// create an instance server
const app: Application = express()
// HTTP request logger middleware
app.use(morgan('short'))

app.use(express.json())

app.get('/', async (req, res) => {
  res.send('Hello Storefront!')
})

app.use(routes)

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`)
})

export default app

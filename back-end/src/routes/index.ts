import { Router } from 'express'
import Product from './Product'
import User from './User'
import cors from 'cors'
import env from '../envalid'
const router = Router()

const corsOptions = {
  origin: env.FRONT_URL,
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Access-Control-Allow-Headers', 'Access-Control-Allow-Origin', 'Authorization'],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200
}

router.use(cors(corsOptions))
router.use('/products', Product)
router.use('/users',User)

export default router
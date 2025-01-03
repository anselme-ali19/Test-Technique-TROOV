import { type Request, type Response, Router } from 'express'
import { BAD_REQUEST, OK } from 'http-status-codes'
import { ProductDao } from 'src/daos/Product/ProductDao'

const router = Router()

/******************************************************************************
 *              Get list products - "GET /api/products/"
 ******************************************************************************/
router.get('/', async (req: Request, res : Response) => {
    try {
        const limit = Number(req.query.limit)
        const result = await ProductDao.getProducts({limit:limit})
        return   res.status(OK).json(result) 
    } catch(err : any) {
        return res.status(BAD_REQUEST).json({error :err.message}) as any
    }
})

/******************************************************************************
 *              POST create product - "POST /api/products/"
 ******************************************************************************/
router.post('/', async (req: Request, res : Response) => {
    try {
        const result = await ProductDao.create(req.body)
        return   res.status(OK).json(result) as any
    } catch(err :any) {
        return res.status(BAD_REQUEST).json({error :err.message}) 
    }
})

/******************************************************************************
 *              PUT update product - "PUT /api/products/:id"
 ******************************************************************************/
router.put('/:id', async (req: Request, res : Response) => {
    try {
        const {id} = req.params
        if(!id) {
            return res.status(BAD_REQUEST).json({
                error: 'IdRequired'
            })
        }
        const result = await ProductDao.update(Number(id),req.body)
        return   res.status(OK).json(result) as any
    } catch(err : any) {
        return res.status(BAD_REQUEST).json({error :err.message}) 
    }
})

/******************************************************************************
 *              PUT restore or withdraw product - "PUT /api/products/:id/restore"
 ******************************************************************************/
router.put('/:id/restore', async (req: Request, res : Response) => {
    try {
        const {id} = req.params
        if(!id) {
            return res.status(BAD_REQUEST).json({
                error: 'IdRequired'
            })
        }
        const result = await ProductDao.restoreOrWithDraw(Number(id))
        return   res.status(OK).json(result) as any
    } catch(err :any) {
        return res.status(BAD_REQUEST).json({error :err.message}) 
    }
})
/******************************************************************************
 *              DELETE delete product - "DELETE /api/products/:id"
 ******************************************************************************/
router.delete('/:id', async (req: Request, res : Response) => {
    try {
        const {id} = req.params
        if(!id) {
            return res.status(BAD_REQUEST).json({
                error: 'IdRequired'
            })
        }
        const result = await ProductDao.delete(Number(id))
        return   res.status(OK).json(result) as any
    } catch(err :any) {
        return res.status(BAD_REQUEST).json({error :err.message}) 
    }
})
export default router
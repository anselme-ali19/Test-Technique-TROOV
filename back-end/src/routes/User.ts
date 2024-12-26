import { type Request, type Response, Router } from 'express'
import { BAD_REQUEST, OK } from 'http-status-codes'
import { UserDao } from '../daos/User/UserDao'

const router = Router()

/******************************************************************************
 *              POST create  - "POST /api/users/"
 ******************************************************************************/
router.post('/', async (req: Request, res : Response) => {
    try {
        const result = await UserDao.create(req.body)
        return   res.status(OK).json(result) as any
    } catch(err :any) {
        return res.status(BAD_REQUEST).json({error :err.message}) 
    }
})

/******************************************************************************
 *              GET user - "GET /api/users/"
 ******************************************************************************/
router.get('/', async (req: Request, res : Response) => {
    try {
        const result = await UserDao.login(req.body)
        return   res.status(OK).json(result) as any
    } catch(err :any) {
        return res.status(BAD_REQUEST).json({error :err.message}) 
    }
})

export default router
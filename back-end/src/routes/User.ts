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
        const user =  {email: req.query.email as string, password: req.query.password as string}
        const result = await UserDao.login(user)
        return   res.status(OK).json(result) as any
    } catch(err :any) {
        return res.status(BAD_REQUEST).json({error :err.message}) 
    }
})

/******************************************************************************
 *              PUT reset user password - "PUT /api/users/:email"
 ******************************************************************************/

router.put('/:email', async (req: Request, res : Response) => {
    try {
        const {email} = req.params
        const {password} = req.body
        if(!email) {
            return res.status(BAD_REQUEST).json({
                error: 'EmailRequired'
            })
        }
        const result = await UserDao.resetPassword(email,password)
        return   res.status(OK).json(result) as any
    } catch(err : any) {
        return res.status(BAD_REQUEST).json({error :err.message}) 
    }
})
export default router
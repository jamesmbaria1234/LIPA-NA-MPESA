import { Router} from 'express'
import { CreateToken } from '../Middlewares/token.js'
import { sendStkPush } from '../Controllers/stkPush.contoller.js'
const router  = Router()

router.post("/stkPush",CreateToken,sendStkPush)
export default router;
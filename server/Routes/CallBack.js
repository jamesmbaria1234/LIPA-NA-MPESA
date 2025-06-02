import { Router} from 'express'
import { callback } from '../Controllers/Callback.controllers.js';
const router = Router()
router.post("/callback",callback)
export default router;
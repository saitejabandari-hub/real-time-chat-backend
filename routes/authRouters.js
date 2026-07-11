import {register,login} from "../controllers/authoController.js"
import { getprofile } from "../controllers/userController.js"
import authMiddleware from "../middleware/authoMiddlerware.js"
import express from "express"

const router = express.Router()

router.post("/register",register)

router.get("/profile",authMiddleware,getprofile)

router.post("/login",login)

export default router
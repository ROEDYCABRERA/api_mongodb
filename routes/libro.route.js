import {Router} from "express";
import {
    register,
    getDatos,
    getID,
    update,
    remove

} from "../controllers/libro.controller.js";
import { bodyLibroValidator,paramLibroValidator } from "../middlewares/validatorManager.js";
import { requireToken } from "../middlewares/requireToken.js";
const router = Router();

router.post("/register", bodyLibroValidator,register);
router.put("/update", bodyLibroValidator,update);

router.delete("/:id" ,paramLibroValidator,remove);
router.get("/listar",getDatos);
router.get("/:id",paramLibroValidator,getID);

export default router;

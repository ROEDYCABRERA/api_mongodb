import {Router} from "express";
import {
    register,
    getDatos,
    update,
    remove

} from "../controllers/marca.controller.js";
import { bodyMarcaValidator,paramMarcaValidator } from "../middlewares/validatorManager.js";
import { requireToken } from "../middlewares/requireToken.js";
const router = Router();

router.post("/register", bodyMarcaValidator,register);
router.put("/:id",paramMarcaValidator,bodyMarcaValidator,update);
router.delete("/:id" ,paramMarcaValidator,remove);
router.get("/listar",requireToken,getDatos);

export default router;
import {Router} from "express";
import {
    register,
    getDatos,
    update,
    remove

} from "../controllers/autor.controller.js";
import { bodyAutorValidator,paramAutorValidator } from "../middlewares/validatorManager.js";
import { requireToken } from "../middlewares/requireToken.js";
const router = Router();

router.post("/register", bodyAutorValidator,register);
router.put("/update", bodyAutorValidator,update);
//router.put("/:id",paramTipoLibroValidator,bodyTipoLibroValidator,update);
router.delete("/:id" ,paramAutorValidator,remove);
router.get("/listar",getDatos);

export default router;

import {Router} from "express";
import {
    register,
    getDatos,
    update,
    remove

} from "../controllers/tipoLibro.controller.js";
import { bodyTipoLibroValidator,paramTipoLibroValidator } from "../middlewares/validatorManager.js";
import { requireToken } from "../middlewares/requireToken.js";
const router = Router();

router.post("/register", bodyTipoLibroValidator,register);
router.put("/:id",paramTipoLibroValidator,bodyTipoLibroValidator,update);
router.delete("/:id" ,paramTipoLibroValidator,remove);
router.get("/listar",getDatos);

export default router;
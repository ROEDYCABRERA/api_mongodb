import {Router} from "express";
import {
    register,
    getDatos,
    update,
    remove

} from "../controllers/tipoUsuario.controller.js";
import { bodyTipoUsuarioValidator,paramTipoUsuarioValidator } from "../middlewares/validatorManager.js";
import { requireToken } from "../middlewares/requireToken.js";
const router = Router();

router.post("/register", bodyTipoUsuarioValidator,register);
router.put("/:id",paramTipoUsuarioValidator,bodyTipoUsuarioValidator,update);
router.delete("/:id" ,paramTipoUsuarioValidator,remove);
router.get("/listar",getDatos);

export default router;
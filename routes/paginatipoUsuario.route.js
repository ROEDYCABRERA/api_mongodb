import {Router} from "express";
import {
    register,
    getDatos,
    getID,
    update,
    remove

} from "../controllers/paginaUsuario.controller.js";
import { bodyPaginaTipoUsuarioValidator,paramTipoUsuarioValidator } from "../middlewares/validatorManager.js";
import { requireToken } from "../middlewares/requireToken.js";
const router = Router();

router.post("/register", bodyPaginaTipoUsuarioValidator,register);
router.get("/listar",getDatos);
router.put("/:id",paramTipoUsuarioValidator,bodyPaginaTipoUsuarioValidator,update);
router.delete("/:id" ,paramTipoUsuarioValidator,remove);
router.get("/:id",paramTipoUsuarioValidator,getID);

export default router;
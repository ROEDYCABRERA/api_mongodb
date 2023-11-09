import {Router} from "express";
import {
    register,
    getDatos,
    getID,
    update,
    remove

} from "../controllers/paginaUsuario.controller.js";
import { bodyPaginaTipoUsuarioValidator,paramPaginaTipoUsuarioValidator } from "../middlewares/validatorManager.js";
import { requireToken } from "../middlewares/requireToken.js";
const router = Router();

router.post("/register", bodyPaginaTipoUsuarioValidator,register);
router.get("/listar",getDatos);
router.put("/:id",paramPaginaTipoUsuarioValidator,bodyPaginaTipoUsuarioValidator,update);
router.delete("/:id" ,paramPaginaTipoUsuarioValidator,remove);
router.get("/:id",paramPaginaTipoUsuarioValidator,getID);

export default router;
import {Router} from "express";
import {
    register,
    getDatos,
    getID,
    update,
    remove

} from "../controllers/tipoUsuario.controller.js";
import { bodyTipoUsuarioValidator,paramTipoUsuarioValidator } from "../middlewares/validatorManager.js";
import { requireToken } from "../middlewares/requireToken.js";
const router = Router();

router.post("/register", bodyTipoUsuarioValidator,register);
router.get("/listar",getDatos);
router.put("/update",bodyTipoUsuarioValidator,update);
router.delete("/:id" ,paramTipoUsuarioValidator,remove);
router.get("/:id",paramTipoUsuarioValidator,getID);

export default router;
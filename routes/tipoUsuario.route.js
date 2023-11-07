import {Router} from "express";
import {
    register,
    getDatos,
    update,
    remove

} from "../controllers/tipoUsuario.controller.js";
import { bodyTipoDocumentoValidator,paramTipoDocumentoValidator } from "../middlewares/validatorManager.js";
import { requireToken } from "../middlewares/requireToken.js";
const router = Router();

router.post("/register", bodyTipoDocumentoValidator,register);
router.put("/:id",paramTipoDocumentoValidator,bodyTipoDocumentoValidator,update);
router.delete("/:id" ,paramTipoDocumentoValidator,remove);
router.get("/listar",getDatos);

export default router;
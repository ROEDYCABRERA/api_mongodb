import {Router} from "express";
import {
    register,
    getDatos,
    update,
    remove

} from "../controllers/sexo.controller.js";
import { bodySexoValidator,paramSexoValidator } from "../middlewares/validatorManager.js";
import { requireToken } from "../middlewares/requireToken.js";
const router = Router();

router.post("/register", bodySexoValidator,register);
router.put("/update", bodySexoValidator,update);
//router.put("/:id",paramTipoLibroValidator,bodyTipoLibroValidator,update);
router.delete("/:id" ,paramSexoValidator,remove);
router.get("/listar",getDatos);

export default router;

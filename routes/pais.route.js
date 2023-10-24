import {Router} from "express";
import {
    register,
    getDatos,
    update,
    remove

} from "../controllers/pais.controller.js";
import { bodyPaisValidator,paramPaisValidator } from "../middlewares/validatorManager.js";
import { requireToken } from "../middlewares/requireToken.js";
const router = Router();

router.post("/register", bodyPaisValidator,register);
router.put("/update", bodyPaisValidator,update);
//router.put("/:id",paramTipoLibroValidator,bodyTipoLibroValidator,update);
router.delete("/:id" ,paramPaisValidator,remove);
router.get("/listar",getDatos);

export default router;

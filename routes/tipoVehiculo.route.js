import {Router} from "express";
import {
    register,
    getDatos,
    update,
    remove

} from "../controllers/tipoVehiculo.controller.js";
import { bodyTipoVehiculoValidator,paramTipoVehiculoValidator } from "../middlewares/validatorManager.js";
import { requireToken } from "../middlewares/requireToken.js";
const router = Router();

router.post("/register", bodyTipoVehiculoValidator,register);
router.put("/:id",paramTipoVehiculoValidator,bodyTipoVehiculoValidator,update);
router.delete("/:id" ,paramTipoVehiculoValidator,remove);
router.get("/listar",requireToken,getDatos);

export default router;
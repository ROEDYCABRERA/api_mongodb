import {Router} from "express";
import {
    register,
    getDatos,
    update,
    removeProcedure

} from "../controllers/procedure.contreller.js";
import { bodyProcedureValidator,paramProcedureValidator } from "../middlewares/validatorManager.js";
import { requireToken } from "../middlewares/requireToken.js";
const router = Router();

router.post("/register", bodyProcedureValidator,register);
//router.put("/:id",paramProcedureValidator,bodyProcedureValidator,update);
router.put("/update",bodyProcedureValidator,update);
router.delete("/:id" ,paramProcedureValidator,removeProcedure);
router.get("/listar",requireToken,getDatos);

export default router;
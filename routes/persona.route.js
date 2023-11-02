import {Router} from "express";
import {
    register,
    getDatos,
    update,
    getID,
    remove

} from "../controllers/persona.controller.js";
import { bodyPersonaValidator,paramPersonaValidator } from "../middlewares/validatorManager.js";
import { requireToken } from "../middlewares/requireToken.js";
const router = Router();

router.post("/register", bodyPersonaValidator,register);
router.get("/listar",getDatos);
router.get("/:id",paramPersonaValidator,getID);
router.put("/:id",paramPersonaValidator,bodyPersonaValidator,update);
router.delete("/:id" ,paramPersonaValidator,remove);


export default router;
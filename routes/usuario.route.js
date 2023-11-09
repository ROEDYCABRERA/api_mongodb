import {Router} from "express";
import {
    login,
    register,
    infoUser,
    getID,
    getDatos,
    refreshToken,
    logout,
} from "../controllers/Usuario.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
import { bodyUsuarioValidator,bodyLoginUsuarioValidator,paramUsuarioValidator } from "../middlewares/validatorManager.js";

const router = Router();

router.post("/register", bodyUsuarioValidator,register);
router.post("/login", bodyLoginUsuarioValidator,login);

router.get("/logout", logout);
router.get("/listar", getDatos);
router.get("/:id" ,paramUsuarioValidator,getID);
router.get("/refresh", requireRefreshToken, refreshToken);
export default router;
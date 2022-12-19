
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import {
    generateToken,
    generateRefreshToken,
} from "../utils/tokenManager.js";
export const register =async(req,res) =>{
   
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) throw new Error("Email ya registrado 😒");

        user = new User({ email, password });
        await user.save();

        // Generar token
        const { token, expiresIn } = generateToken(user.id);
        generateRefreshToken(user.id, res);

        return res.json({ token, expiresIn });
    } catch (error) {
        console.log(error);
        return res.status(403).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        //console.log(req.body);
      
        let user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password)))
            //throw new Error("Email or password is incorrect");
            return res.status(403).json({ error: "No existe este usuario" });

          const repuestaPasword= await user.comparePassword(password)  
          if(!repuestaPasword)
          return res.status(403).json({ error: " Contraseña incorrecta" });
          const { token, expiresIn } = generateToken(user.id);
          generateRefreshToken(user.id, res);
         
          return res.json({ token, expiresIn });
    } catch (error) {
        console.log(error);
        return res.status(403).json({ error: error.message });
    }
};



export const infoUser = async (req, res) => {
    try {
        const user = await User.findById(req.uid).lean();
        delete user.password;
        return res.json({ user });
    } catch (error) {
        console.log(error);
        return res.status(403).json({ error: error.message });
    }
};

export const logout = (req, res) => {
    // https://stackoverflow.com/questions/27978868/destroy-cookie-nodejs
    res.clearCookie("refreshToken");
    return res.json({ ok: true });
};

export const refreshToken = (req, res) => {
    try {
        const { token, expiresIn } = generateToken(req.uid);
        return res.json({ token, expiresIn });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "error de server" });
    }
};


import { User } from "../models/User.js";
import {
    generateToken,
    generateRefreshToken,
} from "../utils/tokenManager.js";
export const register =async(req,res) =>{
   
    try {
        if (!req.files)
        return res.status(400).send('No files were uploaded.');

        let imagen = req.files.imagen;

        imagen.mv(`uploads/${imagen.name}`, (err) => {
            if (err)
            return res.status(500).send(err);

        });
       
        const {nombre,apellido,direccion,telefono, email, password ,tipo_usuario,tipo_login} = req.body;

        let user = await User.findOne({ email });
        if (user) throw new Error("Email ya registrado 😒");

        user = new User({nombre,apellido,direccion,telefono,email, password ,tipo_usuario,tipo_login, imagen : imagen.name });
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
          const success  =true;
          return res.json({success, token, expiresIn,user});
    } catch (error) {
        console.log(error);
        return res.status(403).json({ error: error.message });
    }
};
export const getID = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id)
        .populate({ path: 'tipodocumento', model: 'TipoDocumento'})
        .populate({ path: 'procedimiento', model: 'Procedure'})
        .populate({ path: 'vehiculo', populate: { path: 'tipovehiculo marca foto'}})
 
        .populate(
            [{
            path: 'vehiculo', 
            populate: { path: 'historia', populate: [{ path: 'detalles'}] }
            }])
        .exec();
        if (!user) return res.status(404).json({ error: "No existe el usuario" })
    
        return res.json(user);

   
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId") {
            return res.status(403).json({ error: "Formato id incorrecto" });
        }
        return res.status(500).json({ error: "error de servidor" });
    }
};

export const getDatos = async (req, res) => {
    try {

        const user = await User.find()
        .populate({ path: 'tipodocumento', model: 'TipoDocumento'})
        
        .exec();
       
    
        return res.json(user);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error de servidor" });
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

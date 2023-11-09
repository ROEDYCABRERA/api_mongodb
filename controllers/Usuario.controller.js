
import { Usuario } from "../models/Usuario.js";
import {
    generateToken,
    generateRefreshToken,
} from "../utils/tokenManager.js";
export const register =async(req,res) =>{
   
    try {
        // if (!req.files)
        // return res.status(400).send('No files were uploaded.');

        // let imagen = req.files.imagen;

        // imagen.mv(`uploads/${imagen.name}`, (err) => {
        //     if (err)
        //     return res.status(500).send(err);

        // });
       
        const {NombreUsuario,Persona,TipoUsuario,password} = req.body;

        let user = await Usuario.findOne({ NombreUsuario });
        if (user) throw new Error("Usuario ya registrado 😒");

        user = new Usuario({ NombreUsuario,Persona,TipoUsuario,password});
        await user.save();

        // Generar token
        const { token, expiresIn } = generateToken(user.id);
        generateRefreshToken(user.id, res);

        return res.json({ token, expiresIn,ok: true});
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

        const usuario = await Usuario.aggregate(
            [
                

                {$lookup:{from:'personas',localField:'Persona',foreignField:'_id', as:'Persona'}},
              
                {$unwind: '$Persona'},
                {
                    $addFields: {
                        NombrePersona: '$Persona.Nombre'
                    }
                 },
                {$project:
                { 
                    NombreUsuario:1,
                    NombrePersona:1
                   
                   
                   

                }
                }
                
              
            ]

        )
    
        return res.json(usuario);

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

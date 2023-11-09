import { TipoUsuario } from "../models/TipoUsuario.js";
import { PaginaTipoUsuario } from "../models/PaginaUsuario.js";
import { MongoClient, ObjectId } from 'mongodb';

export const getDatos = async (req, res) => {
    try {
        
        const tipoUsuario = await TipoUsuario.find().sort( { NombreTipoUsuario: 1 } )


        return res.json(tipoUsuario);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error de servidor" });
    }
};
export const register =async(req,res) =>{
   
    try {
      const {
        NombreTipoUsuario,
        DescripcionTipoUsuario,
        Habilitado
      } = req.body;

      let tipoUsuario = await TipoUsuario.findOne({ NombreTipoUsuario });
      if (tipoUsuario) throw new Error("Tipo Usuario ya registrado 😒");

      tipoUsuario = new TipoUsuario({
        NombreTipoUsuario,
        DescripcionTipoUsuario,
        Habilitado,
      });
      tipoUsuario.save((err, usuarioNew) => {
        if (err) {
          return res.status(401).json({
            ok: false,
            err,
          });
        }

        return res.status(201).json({ ok: true, tipoUsuario: usuarioNew._id });
      });

     
    
    } catch (error) {
        console.log(error);
        return res.status(403).json({ error: error.message });
    }
};
export const remove = async (req, res) => {
    try {
        const {id} = req.params;
        const tipoUsuario = await TipoUsuario.findById(id);
       // console.log(link);
        if (!tipoUsuario) return res.status(404).json({ error: "no existe el Tipo de Usuario" });
      
       
        await tipoUsuario.remove();
        return res.json({ ok: true });
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId")
            return res.status(403).json({ error: "Formato id incorrecto" });
        return res.status(500).json({ error: "Error de servidor" });
    }
};
export const getID = async (req, res) => {
    try {
        const {id} = req.params;

        const tipoUsuario = await TipoUsuario.aggregate(
            [
                
                {$match: { _id: ObjectId(req.params.id) }},
            
                {$project:
                { 
                    
                    NombreTipoUsuario:1,
                    DescripcionTipoUsuario:1,
                   

                }
                }
                
              
            ]

        )
        if (tipoUsuario=="") return res.status(404).json({ error: "No existe el tipo Usuario" })
        return res.json(tipoUsuario);

   
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId") {
            return res.status(403).json({ error: "Formato id incorrecto" });
        }
        return res.status(500).json({ error: "error de servidor" });
    }
};

export const update =async(req,res) =>{
   
    try {

        //const {id} = req.params;
        let {id,NombreTipoUsuario,DescripcionTipoUsuario,Habilitado} = req.body;

     
        const tipoUsuario = await TipoUsuario.findById(id);

        if (!tipoUsuario) return res.status(404).json({ error: "No existe el Tipo de Usuario" });


      
        tipoUsuario.NombreTipoUsuario = NombreTipoUsuario;
        tipoUsuario.DescripcionTipoUsuario = DescripcionTipoUsuario;
        tipoUsuario.Habilitado = Habilitado;
        tipoUsuario.save((err, usuarioNew) => {
            if (err) {
              return res.status(401).json({
                ok: false,
                err,
              });
            }
    
            return res.status(201).json({ ok: true, tipoUsuario: usuarioNew._id });
          });
    

       
      
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId") {
            return res.status(403).json({ error: "Formato id incorrecto" });
        }
        return res.status(500).json({ error: "error de servidor" });
    }
};
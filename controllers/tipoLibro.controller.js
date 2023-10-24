import { TipoLibro } from "../models/TipoLibro.js";


export const getDatos = async (req, res) => {
    try {
        
        const tipoLibro = await TipoLibro.find().sort( { Descripcion: 1 } )


        return res.json(tipoLibro);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error de servidor" });
    }
};
export const register =async(req,res) =>{
   
    try {
        
        const {Nombre,Descripcion} = req.body;
        let tipoLibro = await TipoLibro.findOne({ Nombre});
        if (tipoLibro) throw new Error("Nombre ya registrado 😒");

        tipoLibro = new TipoLibro({Nombre,Descripcion });
        await tipoLibro.save();

          return res.json({ ok: true });
        //return res.json({ tipoDocumento });
    } catch (error) {
        console.log(error);
        return res.status(403).json({ error: error.message });
    }
};
export const remove = async (req, res) => {
    try {
        const {id} = req.params;
        const tipoLibro = await TipoLibro.findById(id);
       // console.log(link);
        if (!tipoLibro) return res.status(404).json({ error: "no existe el Tipo de Libro" });
      
       
        await tipoLibro.remove();
       
           return res.json({ ok: true });
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId")
            return res.status(403).json({ error: "Formato id incorrecto" });
        return res.status(500).json({ error: "Error de servidor" });
    }
};
export const update =async(req,res) =>{
   
    try {

        const {id} = req.params;
    
     
         let { Nombre,Descripcion } = req.body;
     
        const tipoLibro = await TipoLibro.findById(id);

        if (!tipoLibro) return res.status(404).json({ error: "No existe el Tipo de Libro" });


        tipoLibro.Nombre = Nombre;
        tipoLibro.Descripcion = Descripcion;
        await tipoLibro.save();

          return res.json({ ok: true });
        //return res.json({tipoLibro}.tipoLibro);
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId") {
            return res.status(403).json({ error: "Formato id incorrecto" });
        }
        return res.status(500).json({ error: "error de servidor" });
    }
};

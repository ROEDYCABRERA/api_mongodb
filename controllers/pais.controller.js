import { Pais } from "../models/Pais.js";


export const getDatos = async (req, res) => {
    try {
        
        const pais = await Pais.find().sort( { Nombre: 1 } )


        return res.json(pais);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error de servidor" });
    }
};
export const register =async(req,res) =>{
   
    try {
        
        const {Nombre} = req.body;
        let pais = await Pais.findOne({Nombre});
        if (pais) throw new Error("Pais ya esta registrado 😒");

        pais = new Pais({Nombre});
        await pais.save();

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
        const pais = await Pais.findById(id);
       // console.log(link);
        if (!pais) return res.status(404).json({ error: "no existe el Pais" });
      
       
        await pais.remove();
       
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

        //const {id} = req.params;
    
     
         let {Id, Nombre } = req.body;
     
        const pais = await Pais.findById(Id);

        if (!pais) return res.status(404).json({ error: "No existe el Pais" });


        pais.Nombre = Nombre;
        await pais.save();

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

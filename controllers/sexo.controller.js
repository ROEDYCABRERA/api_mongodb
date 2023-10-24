import { Sexo } from "../models/Sexo.js";


export const getDatos = async (req, res) => {
    try {
        
        const sexo = await Sexo.find().sort( { Nombre: 1 } )


        return res.json(sexo);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error de servidor" });
    }
};
export const register =async(req,res) =>{
   
    try {
        
        const {Nombre} = req.body;
        let sexo = await Sexo.findOne({Nombre});
        if (sexo) throw new Error("Nombre ya registrado 😒");

        sexo = new Sexo({Nombre});
        await sexo.save();

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
        const sexo = await Sexo.findById(id);
       // console.log(link);
        if (!sexo) return res.status(404).json({ error: "no existe el Sexo" });
      
       
        await sexo.remove();
       
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
     
        const sexo = await Sexo.findById(Id);

        if (!sexo) return res.status(404).json({ error: "No existe el Sexo" });


        sexo.Nombre = Nombre;
        await sexo.save();

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

import { Procedure } from "../models/Procedure.js";


export const getDatos = async (req, res) => {
    try {
        
        const procedure = await Procedure.find().sort( { descripcion: 1 } )


        return res.json(procedure);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error de servidor" });
    }
};
export const register =async(req,res) =>{
   
    try {
        const {descripcion,precio} = req.body;

        let procedure = await Procedure.findOne({ descripcion });
        if (procedure) throw new Error("Descripcion ya registrado 😒");

        procedure = new Procedure({descripcion,precio });
        await procedure.save();

       
        return res.json({ procedure });
    } catch (error) {
        console.log(error);
        return res.status(403).json({ error: error.message });
    }
};
export const removeProcedure = async (req, res) => {
    try {
        const {id} = req.params;
        const procedure = await Procedure.findById(id);
       // console.log(link);
        if (!procedure) return res.status(404).json({ error: "no existe procedure" });
      
       
        await procedure.remove();
        return res.json({ procedure });
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
        let { descripcion,precio } = req.body;

     
        const procedure = await Procedure.findById(id);

        if (!procedure) return res.status(404).json({ error: "No existe el procedure" });


      
        procedure.descripcion = descripcion;
        procedure.precio = precio;
        await procedure.save();

       
        return res.json({procedure}.procedure);
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId") {
            return res.status(403).json({ error: "Formato id incorrecto" });
        }
        return res.status(500).json({ error: "error de servidor" });
    }
};
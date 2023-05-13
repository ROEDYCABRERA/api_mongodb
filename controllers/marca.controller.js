import { Marca } from "../models/Marca.js";


export const getDatos = async (req, res) => {
    try {
        
        const marca = await Marca.find().sort( { Descripcion: 1 } )


        return res.json(marca);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error de servidor" });
    }
};
export const register =async(req,res) =>{
   
    try {
        const {Descripcion} = req.body;

        let marca = await Marca.findOne({ Descripcion });
        if (marca) throw new Error("Descripcion ya registrado 😒");

        marca = new Marca({Descripcion });
        await marca.save();

       
        return res.json({ marca });
    } catch (error) {
        console.log(error);
        return res.status(403).json({ error: error.message });
    }
};
export const removeProcedure = async (req, res) => {
    try {
        const {id} = req.params;
        const marca = await Marca.findById(id);
       // console.log(link);
        if (!marca) return res.status(404).json({ error: "no existe la marca" });
      
       
        await marca.remove();
        return res.json({ marca });
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
        let {Descripcion} = req.body;

     
        const marca = await Marca.findById(id);

        if (!marca) return res.status(404).json({ error: "No existe la marca" });


      
        marca.Descripcion = Descripcion;
        await marca.save();

       
        return res.json({marca}.marca);
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId") {
            return res.status(403).json({ error: "Formato id incorrecto" });
        }
        return res.status(500).json({ error: "error de servidor" });
    }
};
import { Pagina } from "../models/Pagina.js";


export const getDatos = async (req, res) => {
    try {
        
        const pagina = await Pagina.find().sort( { Mensaje: 1 } )


        return res.json(pagina);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error de servidor" });
    }
};
export const register =async(req,res) =>{
   
    try {
        const {Descripcion} = req.body;

        let tipoDocumento = await TipoDocumento.findOne({ Descripcion });
        if (tipoDocumento) throw new Error("Descripcion ya registrado 😒");

        tipoDocumento = new TipoDocumento({Descripcion });
        await tipoDocumento.save();

       
        return res.json({ tipoDocumento });
    } catch (error) {
        console.log(error);
        return res.status(403).json({ error: error.message });
    }
};
export const remove = async (req, res) => {
    try {
        const {id} = req.params;
        const tipoDocumento = await TipoDocumento.findById(id);
       // console.log(link);
        if (!tipoDocumento) return res.status(404).json({ error: "no existe el Tipo de Documento" });
      
       
        await tipoDocumento.remove();
        return res.json({ tipoDocumento });
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

     
        const tipoDocumento = await TipoDocumento.findById(id);

        if (!tipoDocumento) return res.status(404).json({ error: "No existe el Tipo de Documento" });


      
        tipoDocumento.Descripcion = Descripcion;
        await tipoDocumento.save();

       
        return res.json({tipoDocumento}.tipoDocumento);
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId") {
            return res.status(403).json({ error: "Formato id incorrecto" });
        }
        return res.status(500).json({ error: "error de servidor" });
    }
};
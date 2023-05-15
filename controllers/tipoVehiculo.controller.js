import { TipoVehiculo } from "../models/TipoVehiculo.js";


export const getDatos = async (req, res) => {
    try {
        
        const tipoVehiculo = await TipoVehiculo.find().sort( { Descripcion: 1 } )


        return res.json(tipoVehiculo);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error de servidor" });
    }
};
export const register =async(req,res) =>{
   
    try {
        const {Descripcion} = req.body;

        let tipoVehiculo = await TipoVehiculo.findOne({ Descripcion });
        if (tipoVehiculo) throw new Error("Descripcion ya registrado 😒");

        tipoVehiculo = new TipoVehiculo({Descripcion });
        await tipoVehiculo.save();

       
        return res.json({ tipoVehiculo });
    } catch (error) {
        console.log(error);
        return res.status(403).json({ error: error.message });
    }
};
export const remove = async (req, res) => {
    try {
        const {id} = req.params;
        const tipoVehiculo = await TipoVehiculo.findById(id);
       // console.log(link);
        if (!tipoVehiculo) return res.status(404).json({ error: "no existe Tipo Vehiculo" });
      
       
        await tipoVehiculo.remove();
        return res.json({ tipoVehiculo });
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

     
        const tipoVehiculo = await TipoVehiculo.findById(id);

        if (!tipoVehiculo) return res.status(404).json({ error: "No existe Tipo Vehiculo" });


      
        tipoVehiculo.Descripcion = Descripcion;
        await tipoVehiculo.save();

       
        return res.json({tipoVehiculo}.tipoVehiculo);
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId") {
            return res.status(403).json({ error: "Formato id incorrecto" });
        }
        return res.status(500).json({ error: "error de servidor" });
    }
};
import { PaginaTipoUsuario } from "../models/PaginaUsuario.js";
import { MongoClient, ObjectId } from 'mongodb';

export const getDatos = async (req, res) => {
    try {
        
        const paginaTipoUsuario = await PaginaTipoUsuario.find().sort( { Pagina: 1 } )


        return res.json(paginaTipoUsuario);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error de servidor" });
    }
};
export const register =async(req,res) =>{
   
    try {
        const {NombreTipoUsuario,DescripcionTipoUsuario,IDPAGINA,Habilitado} = req.body;

        let paginaTipoUsuario = await PaginaTipoUsuario.findOne({ NombreTipoUsuario });
        if (paginaTipoUsuario) throw new Error("Tipo Usuario ya registrado 😒");

        paginaTipoUsuario = new TipoUsuario({NombreTipoUsuario,DescripcionTipoUsuario,IDPAGINA,Habilitado });
        await paginaTipoUsuario.save();
       
       
        return res.json({ ok: true });

    } catch (error) {
        console.log(error);
        return res.status(403).json({ error: error.message });
    }
};
export const remove = async (req, res) => {
    try {
        const {id} = req.params;
        const paginaTipoUsuario = await PaginaTipoUsuario.findById(id);
       // console.log(link);
        if (!paginaTipoUsuario) return res.status(404).json({ error: "no existe el Tipo de Documento" });
      
       
        await paginaTipoUsuario.remove();
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

        const paginaTipoUsuario = await PaginaTipoUsuario.aggregate(
            [
                
                {$match: { TipoUsuario: ObjectId(req.params.id) }},
            
                {$project:
                { 
                    _id:1,
                    Pagina:1,
                    TipoUsuario:1,
                    Habilitado:1
                   

                }
                }
                
              
            ]

        )
        if (paginaTipoUsuario=="") return res.status(404).json({ error: "No existe Pagina tipo Usuario" })
        return res.json(paginaTipoUsuario);

   
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

        const {id} = req.params;
        let {Descripcion} = req.body;

     
        const tipoDocumento = await TipoDocumento.findById(id);

        if (!tipoDocumento) return res.status(404).json({ error: "No existe el Tipo de Documento" });


      
        tipoDocumento.Descripcion = Descripcion;
        await tipoDocumento.save();

       
        return res.json({ ok: true });
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId") {
            return res.status(403).json({ error: "Formato id incorrecto" });
        }
        return res.status(500).json({ error: "error de servidor" });
    }
};
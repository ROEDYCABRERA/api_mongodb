import { Autor } from "../models/Autor.js";
import { MongoClient, ObjectId } from 'mongodb';

export const getDatos = async (req, res) => {
    try {
     
        const autor = await Autor.aggregate(
            [
                

                {$lookup:{from:'pais',localField:'Pais',foreignField:'_id', as:'Pais'}},
                {$lookup:{from:'sexos',localField:'Sexo',foreignField:'_id', as:'Sexo'}},
                {$unwind: '$Sexo'},
                {
                    $addFields: {
                        Sexo: '$Sexo.Sexo'
                    }
                 },
                {$unwind: '$Pais'},
                {
                    $addFields: {
                        Pais: '$Pais.Pais'
                    }
                 },
              
                {$project:
                { 
                    
                    Nombre:1,
                    ApPaterno:1,
                    ApMaterno:1,
                    Sexo:1,
                    Pais: 1
                   

                }
                }
                
              
            ]

        )
    
        console.log(autor);
        return res.json(autor);
       
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error de servidor" });
    }
};
export const getID = async (req, res) => {
    try {
        const {id} = req.params;
       
      
        const autor = await Autor.aggregate(
            [
                
                {$match: { _id: ObjectId(req.params.id) }},
                {$lookup:{from:'pais',localField:'Pais',foreignField:'_id', as:'Pais'}},
                {$lookup:{from:'sexos',localField:'Sexo',foreignField:'_id', as:'Sexo'}},
                {$unwind: '$Sexo'},
                {
                    $addFields: {
                        Sexo: '$Sexo._id'
                    }
                 },
                {$unwind: '$Pais'},
                {
                    $addFields: {
                        Pais: '$Pais._id'
                    }
                 },
              
                {$project:
                { 
                    
                    Nombre:1,
                    ApPaterno:1,
                    ApMaterno:1,
                    Sexo:1,
                    Pais: 1
                   

                }
                }
                
              
            ]

        )
        if (autor=="") return res.status(404).json({ error: "No existe el autor" })
        return res.json(autor);

   
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId") {
            return res.status(403).json({ error: "Formato id incorrecto" });
        }
        return res.status(500).json({ error: "error de servidor" });
    }
};

export const register =async(req,res) =>{
   
    try {
        const {Nombre,ApPaterno,ApMaterno,Sexo,Pais} = req.body;
      
        let autor = await Autor.findOne({Nombre});
        if (autor) throw new Error("autor ya esta registrado 😒");

        autor = new Autor({Nombre,ApPaterno,ApMaterno,Sexo,Pais});
        await autor.save();

        return res.json({ ok: true });
      
    } catch (error) {
        console.log(error);
        return res.status(403).json({ error: error.message });
    }
};
export const remove = async (req, res) => {
    try {
        const {id} = req.params;
        const autor = await Autor.findById(id);
      
        if (!autor) return res.status(404).json({ error: "no existe el autor" });
      
       
        await autor.remove();
       
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
    
     
       
        let {id,Nombre,ApPaterno,ApMaterno,Sexo,Pais} = req.body;
        const autor = await Autor.findById(id);

        if (!autor) return res.status(404).json({ error: "No existe el autor" });


        autor.Nombre = Nombre;
        autor.ApPaterno = ApPaterno;
        autor.ApMaterno = ApMaterno;
        autor.Sexo = Sexo;
        autor.Pais = Pais;
        await autor.save();

        return res.json({ ok: true });
       
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId") {
            return res.status(403).json({ error: "Formato id incorrecto" });
        }
        return res.status(500).json({ error: "error de servidor" });
    }
};

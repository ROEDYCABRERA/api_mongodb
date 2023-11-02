import { Persona } from "../models/Persona.js";
import { MongoClient, ObjectId } from 'mongodb';

export const getDatos = async (req, res) => {
    try {
        try {
        
            const persona = await Persona.find().sort( { Nombre: 1 } )
    
    
            return res.json(persona);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Error de servidor" });
        }
    
       
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error de servidor" });
    }
};
export const getID = async (req, res) => {
    try {
        const {id} = req.params;

        const persona = await Persona.aggregate(
            [
                
                {$match: { _id: ObjectId(req.params.id) }},
            
                {$project:
                { 
                    
                    Nombre:1,
                    ApPaterno:1,
                    ApMaterno:1,
                    FechaNacimiento:1,
                    Correo:1,
                    Telefono:1
                  

                }
                }
                
              
            ]

        )
        if (persona=="") return res.status(404).json({ error: "No existe la persona" })
        return res.json(persona);

   
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
        const {Nombre,ApPaterno,ApMaterno,FechaNacimiento,Correo,telefono} = req.body;
      
        let persona = await Persona.findOne({Nombre});
        if (persona) throw new Error("La Nombre de la Persona ya esta registrado 😒");

        persona = new Persona({Nombre,ApPaterno,ApMaterno,FechaNacimiento,Correo,telefono});
        await persona.save();

        return res.json({ ok: true });
      
    } catch (error) {
        console.log(error);
        return res.status(403).json({ error: error.message });
    }
};
export const remove = async (req, res) => {
    try {
        const {id} = req.params;
        const persona = await Persona.findById(id);
      
        if (!persona) return res.status(404).json({ error: "no existe el ID persona" });
      
       
        await persona.remove();
       
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
    
     
       
        let {id,Nombre,ApPaterno,ApMaterno,FechaNacimiento,Correo,telefono} = req.body;
        const persona = await Persona.findById(id);

        if (!persona) return res.status(404).json({ error: "No existe la persona" });


        persona.Nombre = Nombre;
        persona.ApPaterno = ApPaterno;
        persona.ApMaterno = ApMaterno;
        persona.FechaNacimiento = FechaNacimiento;
        persona.Correo = Correo;
        persona.telefono = telefono;
        await persona.save();

        return res.json({ ok: true });
       
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId") {
            return res.status(403).json({ error: "Formato id incorrecto" });
        }
        return res.status(500).json({ error: "error de servidor" });
    }
};

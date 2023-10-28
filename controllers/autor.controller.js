import { Autor } from "../models/Autor.js";


export const getDatos = async (req, res) => {
    try {
        
        const autor = await Autor.aggregate(
            [
                

                {$lookup:{from:'pais',localField:'Pais',foreignField:'_id', as:'Pais'}},
                {$unwind: '$Pais'},
                {
                    $addFields: {
                        Pais: '$Pais.Pais'
                    }
                 },
              
                {$project:
                { 
                    
                    Nombre:1,
                    Pais: 1
                   

                }
                }
                
              
            ]

        )
    
        console.log(autor);
        return res.json({autor});
       
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error de servidor" });
    }
};
export const register =async(req,res) =>{
   
    try {
        
        const {Nombre} = req.body;
        let autor = await Autor.findOne({Nombre});
        if (autor) throw new Error("autor ya esta registrado 😒");

        autor = new Autor({Nombre});
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
    
     
         let {Id,Nombre } = req.body;
     
        const autor = await Autor.findById(Id);

        if (!autor) return res.status(404).json({ error: "No existe el autor" });


        autor.Nombre = Nombre;
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
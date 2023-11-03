import { Libro } from "../models/Libro.js";
import { MongoClient, ObjectId } from 'mongodb';

export const getDatos = async (req, res) => {
    try {
     
        const libro = await Libro.aggregate(
            [
                

                {$lookup:{from:'autors',localField:'Autor',foreignField:'_id', as:'Autor'}},
                {$unwind: '$Autor'},
                 {
                     $addFields: {
                         Autor: '$Autor.Nombre'
                     }
                  },
              
                  
                
                {$project:
                { 
                    
                    Titulo:1,
                    FotoCaratula:1,
                    Autor:1
                
                }
                }
                
              
            ]

        )
    
       // console.log(libro);
        return res.json(libro);
       
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error de servidor" });
    }
};
export const getID = async (req, res) => {
    try {
        const {id} = req.params;
       
      
        const libro = await Libro.aggregate([
          { $match: { _id: ObjectId(req.params.id) } },

          {
            $lookup: {
              from: "autors",
              localField: "Autor",
              foreignField: "_id",
              as: "Autor",
            },
          },
          { $unwind: "$Autor" },
          {
            $addFields: {
              Autor: "$Autor._id",
            },
          },
          {
            $lookup: {
              from: "tipolibros",
              localField: "TipoLibro",
              foreignField: "_id",
              as: "Tipolibro",
            },
          },
          { $unwind: "$Tipolibro" },
          {
            $addFields: {
              Tipolibro: "$Tipolibro._id",
            },
          },
          {
            $project: {
              Titulo: 1,
              Resumen: 1,
              NumeroPagina: 1,
              Stock: 1,
              FotoCaratula: 1,
              Autor: 1,
              Tipolibro: 1,
            },
          },
        ]);
        if (libro=="") return res.status(404).json({ error: "No existe el libro" })
        return res.json(libro);

   
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
        const {Titulo,Resumen,NumeroPagina,Stock,FotoCaratula,Autor,TipoLibro} = req.body;
      
        let libro = await Libro.findOne({Titulo});
        if (libro) throw new Error("libro ya esta registrado 😒");

        libro = new Libro({Titulo,Resumen,NumeroPagina,Stock,FotoCaratula,Autor,TipoLibro});
        await libro.save();

        return res.json({ ok: true });
      
    } catch (error) {
        console.log(error);
        return res.status(403).json({ error: error.message });
    }
};
export const remove = async (req, res) => {
    try {
        const {id} = req.params;
        const libro = await Libro.findById(id);
      
        if (!libro) return res.status(404).json({ error: "no existe el libro" });
      
       
        await libro.remove();
       
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
    
        let {Titulo,Resumen,NumeroPagina,Stock,FotoCaratula,Autor,TipoLibro} = req.body;
        const libro = await Libro.findById(id);

        if (!libro) return res.status(404).json({ error: "No existe el libro" });


        libro.Titulo = Titulo;
        libro.Resumen = Resumen;
        libro.NumeroPagina = NumeroPagina;
        libro.Stock = Stock;
        libro.FotoCaratula = FotoCaratula;
        libro.Autor = Autor;
        libro.TipoLibro=TipoLibro;
        await libro.save();

        return res.json({ ok: true });
       
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId") {
            return res.status(403).json({ error: "Formato id incorrecto" });
        }
        return res.status(500).json({ error: "error de servidor" });
    }
};

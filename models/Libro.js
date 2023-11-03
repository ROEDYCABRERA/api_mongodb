import mongoose from "mongoose";
const { Schema, model } = mongoose;

const LibroSchema = new Schema({
    
        Titulo: {
            type: String,
            required: [true, "El Titulo es requerido"],
            trim: true,
        },
        FotoCaratula: {
            type: String
            
        },
        Autor:{
            type: mongoose.Schema.Types.ObjectId,ref:'Autor'
        }
        
       
    }
    
);

export const Libro = model("Libro", LibroSchema);
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const LibroSchema = new Schema({
    
        Titulo: {
            type: String,
            required: [true, "El Titulo es requerido"],
            trim: true,
        },
        
        Resumen: {
            type: String,
            required: [true, "El Resumen es requerido"],
            trim: true,
        },
        NumeroPagina: {
            type: Number,
            required: [true, "El Numero Pagina es requerido"],
        },
        Stock: {
            type: Number,
            required: [true, "El Stock es requerido"],
        },
        FotoCaratula: {
            type: String
            
        },
        Autor:{
            type: mongoose.Schema.Types.ObjectId,ref:'Autor'
        },
        TipoLibro:{
            type: mongoose.Schema.Types.ObjectId,ref:'TipoLibro'
        }
        
       
    }
    
);

export const Libro = model("Libro", LibroSchema);
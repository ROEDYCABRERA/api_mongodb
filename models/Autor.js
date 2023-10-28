import mongoose from "mongoose";
const { Schema, model } = mongoose;

const AutorSchema = new Schema({
    
        Nombre: {
            type: String,
            required: [true, "El nombre es requerido"],
            trim: true,
        },
        Pais:{
            type: mongoose.Schema.Types.ObjectId,ref:'Pais'
        }
       
    }
    
);

export const Autor = model("Autor", AutorSchema);
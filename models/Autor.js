import mongoose from "mongoose";
const { Schema, model } = mongoose;

const AutorSchema = new Schema({
    
        Nombre: {
            type: String,
            required: [true, "El nombre es requerido"],
            trim: true,
        },
        ApPaterno: {
            type: String,
            required: [true, "El apellido paterno es requerido"],
            trim: true,
        },
        ApMaterno: {
            type: String,
            required: [true, "El apellido materno es requerido"],
            trim: true,
        },
        Sexo:{
            type: mongoose.Schema.Types.ObjectId,ref:'Sexo'
        },
        Pais:{
            type: mongoose.Schema.Types.ObjectId,ref:'Pais'
        }
       
    }
    
);

export const Autor = model("Autor", AutorSchema);
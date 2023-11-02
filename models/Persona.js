import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PersonaSchema = new Schema({
    
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
        FechaNacimiento :{
            type: Date,
            default :  Date.now
        },
        Correo: {
            type: String,
            trim: true,
            unique: true,
            lowercase: true,
            index: { unique: true },
            required: [true, "El correo es requerido"],
        },
       
    }
    
);

export const Persona = model("Persona", PersonaSchema);
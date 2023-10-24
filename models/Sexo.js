import mongoose from "mongoose";
const { Schema, model } = mongoose;

const sexoSchema = new Schema({
   
    Nombre: {
        type: String,
        required: [true, "El nombre es requerido"],
    }
});

export const Sexo = model("Sexo", sexoSchema);
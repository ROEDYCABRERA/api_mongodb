import mongoose from "mongoose";
const { Schema, model } = mongoose;

const paisSchema = new Schema({
   
    Nombre: {
        type: String,
        required: [true, "El nombre es requerido"],
    }
});

export const Pais = model("Pais", paisSchema);
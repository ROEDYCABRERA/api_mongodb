import mongoose from "mongoose";
const { Schema, model } = mongoose;

const paisSchema = new Schema({
   
    Pais: {
        type: String,
        required: [true, "El nombre pais es requerido"],
    }
});

export const Pais = model("Pais", paisSchema);
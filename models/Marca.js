import mongoose from "mongoose";
const { Schema, model } = mongoose;

const marcaSchema = new Schema({
   
    Descripcion: {
        type: String,
        required: [true, "El nombre es requerido"],
    }
});

export const Marca = model("Marca", marcaSchema);
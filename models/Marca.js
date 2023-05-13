import mongoose from "mongoose";
const { Schema, model } = mongoose;

const marcaSchema = new Schema({
    Nombre: {
        type: String,
        required: [true, "El nombre es requerido"],
        trim: true,
    },
    Descripcion: {
        type: String,
        required: true
    }
});

export const Marca = model("Marca", marcaSchema);
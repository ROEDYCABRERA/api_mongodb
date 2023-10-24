import mongoose from "mongoose";
const { Schema, model } = mongoose;

const tipoLibroSchema = new Schema({
   
    Nombre: {
        type: String,
        required: [true, "El nombre es requerido"],
    },
    Descripcion: {
        type: String,
        required: [true, "La descripcion es requerido"],
    }
});

export const TipoLibro = model("TipoLibro", tipoLibroSchema);
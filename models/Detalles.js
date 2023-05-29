import mongoose from "mongoose";
const { Schema, model } = mongoose;

const DetallesSchema = new Schema({
   
    Procedimiento: {
        type: String,
        required: [true, "El Procedimiento es requerido"],
    },
    ManoObra: {
        type: Number,
        required: [true, "El Precio Mano de Obra es requerido"],
    },
    PrecioRepuesto: {
        type: Number,
        required: [true, "El Precio Repuestos es requerido"],
    },
    Observacion: {
        type: String,
        required: [true, "La Observación es requerido"],
    },
});

export const Detalles = model("Detalles", DetallesSchema);
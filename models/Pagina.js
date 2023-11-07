import mongoose from "mongoose";
const { Schema, model } = mongoose;

const mensajeSchema = new Schema({
   
    Mensaje: {
        type: String,
        required: [true, "EL Mensaje es requerido"],
    },
});

export const Mensaje = model("Mensaje", mensajeSchema);